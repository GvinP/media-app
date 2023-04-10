import {CognitoUser} from '@aws-amplify/auth';
import {Auth, Hub} from 'aws-amplify';
import {HubCallback} from '@aws-amplify/core';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type UserType = CognitoUser | null | undefined;

type AuthContextType = {
  user: UserType;
};

const AuthContext = createContext<AuthContextType>({
  user: undefined,
});

const AuthContextProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserType>();

  const checkUser = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener: HubCallback = data => {
      if (data.payload.event === 'signOut') {
        setUser(null);
      }
      if (data.payload.event === 'signIn') {
        checkUser();
      }
    };
    const hubListener = Hub.listen('auth', listener);
    return () => hubListener();
  }, []);

  return <AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
