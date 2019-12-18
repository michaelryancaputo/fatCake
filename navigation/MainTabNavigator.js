import * as React from 'react';

import { Feed, Leaderboard, Map, Profile } from '../screens';

import { Platform } from 'react-native';
import TabBarIcon from '../components/TabBarIcon';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

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
      name="map"
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
    <TabBarIcon focused={focused} name={'md-list'} />
  ),
};

LeaderboardStack.path = '';


const FeedStack = createStackNavigator(
  {
    screen: Feed,
  },
  config
);

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name="ios-photos" />
  ),
};

FeedStack.path = '';

const ProfileStack = createStackNavigator(
  {
    screen: Profile,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'ios-body'} />
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MapStack,
  FeedStack,
  LeaderboardStack,
  ProfileStack,
});

tabNavigator.path = '';

export default tabNavigator;
