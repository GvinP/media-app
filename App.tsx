import {View, StyleSheet} from 'react-native';
import CommentsScreen from './src/screens/CommentsScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <ProfileScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
