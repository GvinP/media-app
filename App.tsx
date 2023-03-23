import {View, Text} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const App = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <AntDesign name='retweet'/>
      <Text>App</Text>
    </View>
  );
};

export default App;
