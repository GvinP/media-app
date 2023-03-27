import {FlatList, Image} from 'react-native';
import React from 'react';
import user from '../../assets/data/user.json';
import ProfileHeader from './ProfileHeader';

const ProfileScreen = () => {
  return (
    <FlatList
      data={user.posts}
      ListHeaderComponent={<ProfileHeader user={user} />}
      renderItem={({item}) => (
        <Image
          source={{uri: item.image || item.images?.[0]}}
          style={{flex: 1, aspectRatio: 1, margin: 1, maxWidth: '33%'}}
        />
      )}
      keyExtractor={item => item.id}
      numColumns={3}
      style={{flex: 1}}
    />
  );
};

export default ProfileScreen;
