import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import AuthNavigation from './AuthNavigation';
import Initial from '../screens/Initial';
import MainTabNavigator from './MainTabNavigator';

const SwitchNavigator = createSwitchNavigator(
  {
    Initial: Initial,
    Auth: AuthNavigation,
    App: MainTabNavigator
  },
  {
    initialRouteName: 'Initial'
  }
);

const AppContainer = createAppContainer(SwitchNavigator);

export default AppContainer;
