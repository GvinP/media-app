import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import {HomeStackNavigatorParamList} from '../types/navigation';
import UpdatePostScreen from '../screens/UpdatePostScreen/UpdatePostScreen';
import PostLikesScreen from '../screens/PostLikesScreen/PostLikesScreen';

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={HomeScreen}
        options={{title: 'Feed'}}
      />
      <Stack.Screen
        name="UserProfile"
        component={ProfileScreen}
        options={{title: 'Profile'}}
      />
      <Stack.Screen
        name="UpdatePost"
        component={UpdatePostScreen}
        options={{title: 'Update Post'}}
      />
      <Stack.Screen
        name="PostLikes"
        component={PostLikesScreen}
        options={{title: 'Post Likes'}}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
