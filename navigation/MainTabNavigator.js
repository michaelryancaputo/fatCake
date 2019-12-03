import * as React from 'react';

import { Leaderboard, Map, Profile } from '../screens';

import { Platform } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack'

const config = Platform.select({
  default: {
    headerMode: 'none'
  },
});

const MapStack = createStackNavigator(
  {
    screen: Map,
  },
  config
);

MapStack.navigationOptions = {
  tabBarLabel: 'Map',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

MapStack.path = '';

const LeaderboardStack = createStackNavigator(
  {
    screen: Leaderboard,
  },
  config
);

LeaderboardStack.navigationOptions = {
  tabBarLabel: 'Leaderboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LeaderboardStack.path = '';

const ProfileStack = createStackNavigator(
  {
    screen: Profile,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MapStack,
  LeaderboardStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
