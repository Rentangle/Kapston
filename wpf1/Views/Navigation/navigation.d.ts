import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type RootTabParamList = {
  Home: undefined;
  Profile: undefined;
  Schedules: undefined;
  Notification: undefined;
  Settings: undefined;
};

export type RootTabNavigationProp = BottomTabNavigationProp<RootTabParamList>;
export type HomeScreenRouteProp = RouteProp<RootTabParamList, 'Home'>;