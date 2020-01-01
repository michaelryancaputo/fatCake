import * as Font from 'expo-font';

import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import { Container } from 'native-base';
import Firebase from '../api/firebase';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

class Initial extends React.Component {
  state = {
    isAssetsLoadingComplete: false
  };

  componentDidMount = async () => {
    try {
      this.loadLocalAsync();

      console.log(Firebase);

      await Firebase.shared.checkUserAuth(user => {
        if (user) {
          this.props.navigation.navigate('App');
        } else {
          this.props.navigation.navigate('Auth');
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  loadLocalAsync = async () => {
    return await Promise.all([
      Asset.loadAsync([
        require('../assets/images/icon.png')
      ]),
      Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      })
    ]);
  };

  handleLoadingError = error => {
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({ isAssetsLoadingComplete: true });
  };

  render() {
    return (
      <Container>
        <AppLoading
          startAsync={this.loadLocalAsync}
          onFinish={this.handleFinishLoading}
          onError={this.handleLoadingError}
        />
      </Container>
    );
  }
}

export default Initial;
