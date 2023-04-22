import {FC, ReactNode, useMemo} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  createHttpLink,
  TypePolicies,
} from '@apollo/client';
import {AUTH_TYPE, AuthOptions, createAuthLink} from 'aws-appsync-auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';
import config from '../aws-exports';
import {useAuthContext} from '../contexts/AuthContext';

interface IClient {
  children: ReactNode;
}

const url = config.aws_appsync_graphqlEndpoint;
const region = config.aws_appsync_region;

const httpLink = createHttpLink({uri: url});

const mergeList = (existing = {items: []}, incoming = {items: []}) => ({
  ...existing,
  ...incoming,
  items: [...(existing?.items || []), ...incoming.items],
});

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      commentsByPost: {
        keyArgs: ['postID', 'createdAt', 'sortDirection', 'filter'],
        merge: mergeList,
      },
      postsByDate: {
        keyArgs: ['type', 'createdAt', 'sortDirection', 'filter'],
        merge: mergeList,
      },
    },
  },
};

const Client: FC<IClient> = ({children}) => {
  const {user} = useAuthContext();

  const client = useMemo(() => {
    const jwtToken =
      user?.getSignInUserSession()?.getAccessToken().getJwtToken() || '';
    const auth: AuthOptions = {
      type: config.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken,
    };
    const link = ApolloLink.from([
      createAuthLink({url, region, auth}),
      createSubscriptionHandshakeLink({url, region, auth}, httpLink),
    ]);
    return new ApolloClient({
      link,
      cache: new InMemoryCache({typePolicies}),
    });
  }, [user]);

  return <ApolloProvider {...{client}}>{children}</ApolloProvider>;
};

export default Client;
