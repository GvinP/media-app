import React from 'react';
import ProfileHeader from './ProfileHeader';
import FeedGridView from '../../components/FeedGridView';
import {useQuery} from '@apollo/client';
import {getUser} from './queries';
import {useRoute} from '@react-navigation/native';
import {MyProfileRouteProp, UserProfileRouteProp} from '../../types/navigation';
import {ActivityIndicator, Text, View} from 'react-native';
import {GetUserQuery, GetUserQueryVariables} from '../../API';
import {useAuthContext} from '../../contexts/AuthContext';

const ProfileScreen = () => {
  const route = useRoute<UserProfileRouteProp | MyProfileRouteProp>();
  const {userId} = useAuthContext();
  const {data, loading, error} = useQuery<GetUserQuery, GetUserQueryVariables>(
    getUser,
    {
      variables: {id: route.params?.userId || userId},
    },
  );
  const user = data?.getUser;

  if (loading) {
    return <ActivityIndicator />;
  }
  if (error || !user) {
    return (
      <View>
        <Text>{error?.message || 'User not found'}</Text>
      </View>
    );
  }

  return (
    <FeedGridView
      data={user?.Posts?.items || []}
      ListHeaderComponent={() => <ProfileHeader user={user} />}
    />
  );
};

export default ProfileScreen;
