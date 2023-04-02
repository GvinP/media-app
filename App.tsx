import {View, StyleSheet} from 'react-native';
import CommentsScreen from './src/screens/CommentsScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import HomeScreen from './src/screens/HomeScreen';
import PostUploadScreen from './src/screens/PostUploadScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <PostUploadScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
