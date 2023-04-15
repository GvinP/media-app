import {LinkingOptions, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen';
import {RootNavigatorParamList} from '../types/navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthStackNavigator from './AuthStackNavigator';
import {useAuthContext} from '../contexts/AuthContext';
import {ActivityIndicator, View} from 'react-native';
import {useQuery} from '@apollo/client';
import {getUser} from './queries';
import {GetUserQuery, GetUserQueryVariables} from '../API';
import EditProfileScreen from '../screens/EditProfileScreen/EditProfileScreen';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

const linking: LinkingOptions<RootNavigatorParamList> = {
  prefixes: ['memberberries://'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Comments: 'comments',
      Home: {
        screens: {
          HomeStack: {
            initialRouteName: 'Feed',
            screens: {
              UserProfile: 'user/:userId',
            },
          },
        },
      },
    },
  },
};

const Navigation = () => {
  const {user, userId} = useAuthContext();
  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {id: userId},
    },
  );

  if (user === undefined || loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  let stackScreen = null;
  if (!user) {
    stackScreen = (
      <Stack.Screen
        name="Auth"
        component={AuthStackNavigator}
        options={{headerShown: false}}
      />
    );
  } else if (!data?.getUser?.username) {
    stackScreen = (
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{title: 'Edit Profile'}}
      />
    );
  } else {
    stackScreen = (
      <>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Comments" component={CommentsScreen} />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer {...{linking}}>
        <Stack.Navigator>{stackScreen}</Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
