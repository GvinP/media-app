import React from 'react';
import user from '../../assets/data/user.json';
import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView';

const ProfileScreen = () => {
  return (
    <FeedGridView
      data={user.posts}
      ListHeaderComponent={<ProfileHeader user={user} />}
    />
  );
};

export default ProfileScreen;
