import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import * as React from 'react';

import { DynamicMap } from '../components';
import MapView from 'react-native-maps'
import Pedestrian from '../assets/images/pedestrian.png';
import _ from 'lodash';

class Map extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    this.getUserLocationAsync();
  }

  getUserLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  renderSelf() {
    const { location } = this.state;
    return location &&
      location.coords &&
      location.coords.longitude &&
      <MapView.Marker coordinate={{
        longitude: location.coords.longitude,
        latitude: location.coords.latitude
      }}
        image={Pedestrian}
        width={10}
        height={10}
      />
  }

  render() {
    return (
      <DynamicMap location={this.state.location}>
        {this.renderSelf()}
      </DynamicMap>
    )
  }
}

export default Map;