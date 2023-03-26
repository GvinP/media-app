import {View, StyleSheet} from 'react-native';
import CommentsScreen from './src/screens/CommentsScreen';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <CommentsScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
