import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import UserSearchScreen from '../screens/UserSearchScreen/UserSearchScreen';

const Tab = createMaterialTopTabNavigator();

const SearchTabNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator screenOptions={{tabBarStyle: {paddingTop: insets.top}}}>
      <Tab.Screen name="UserSearch" component={UserSearchScreen} />
    </Tab.Navigator>
  );
};

export default SearchTabNavigator;
