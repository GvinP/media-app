import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
