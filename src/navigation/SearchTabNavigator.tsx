import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CommentsScreen from '../screens/CommentsScreen/CommentsScreen';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Tab = createMaterialTopTabNavigator();

const SearchTabNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {paddingTop: insets.top}}}>
      <Tab.Screen name="UserSearch" component={HomeScreen} />
      <Tab.Screen name="CommentSearch" component={CommentsScreen} />
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;
