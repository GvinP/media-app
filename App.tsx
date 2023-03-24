import {View, StyleSheet} from 'react-native';
import FeedPost from './src/components/FeedPost/FeedPost';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <FeedPost />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
