import { Leaderboard, Map, Profile } from '../screens';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import { Platform } from 'react-native';
import React from 'react';
import TabBarIcon from '../components/TabBarIcon';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const MapStack = createStackNavigator(
  {
    Map,
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
    Leaderboard,
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
    Profile,
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
