import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {IUser} from '../types/models';

export type RootNavigatorParamList = {
  Home: undefined;
  Comments: {postId: string};
};

export type BottomTabNavigatorParamList = {
  HomeStack: undefined;
  Search: undefined;
  Upload: undefined;
  Notifications: undefined;
  MyProfile: undefined;
};

export type HomeStackNavigatorParamList = {
  Feed: undefined;
  UserProfile: {user: IUser};
};

export type UserProfileRouteProp = RouteProp<
  HomeStackNavigatorParamList,
  'UserProfile'
>;

export type UserProfileNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'UserProfile'
>;
export type FeedNavigationProp = NativeStackNavigationProp<
  HomeStackNavigatorParamList,
  'Feed'
>;

export type ProfileStackNavigatorParamList = {
  Profile: undefined;
  EditProfile: undefined;
};

export type ProfileNavigationProp = NativeStackNavigationProp<
  ProfileStackNavigatorParamList,
  'Profile'
>;
