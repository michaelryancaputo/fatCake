import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { DynamicMap } from '../components';
import MapView from 'react-native-maps'
import React from 'react';

class Map extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };


  render() {
    const { location } = this.state;

    return (
      <DynamicMap location={location}>
        {location && location.coords && location.coords.longitude && <MapView.Marker coordinate={{
          longitude: location.coords.longitude,
          latitude: location.coords.latitude
        }} />}
      </DynamicMap>
    )
  }
}

export default Map;