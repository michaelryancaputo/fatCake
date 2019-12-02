import * as React from 'react';

import { Alert, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import MapButton from './MapButton';
import _ from 'lodash'
import mapStyle from '../mapStyle.json';
// import firebase from '@react-native-firebase/app'
import styled from 'styled-components/native';

const StyledMapView = styled(MapView)`
    width: ${Dimensions.get('window').width};
    height: ${Dimensions.get('window').height};
`;

const MapContainer = styled.View`
    height: 200;
    width: 100%;
    background-color: tomato;
`

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
    };

    this.onRegionChange = this.onRegionChange.bind(this);
    this.onRegionChangeDelayed = _.debounce(this.onRegionChange, 2000)
    this.onCenterLocation = this.onCenterLocation.bind(this);
    this.onCheckIn = this.onCheckIn.bind(this);
  }

  onCheckIn() {
    const { latitude, longitude } = this.props.location.coords;

    Alert.alert(
      'Check In',
      `This will do something cool later.
Latitude: ${latitude}
Longitude: ${longitude}`,
      { cancelable: true }
    );

  }

  onRegionChange(region) {
    this.setState({ region });
  }

  onCenterLocation() {
    const { latitude, longitude } = this.props.location.coords;

    this.setState((state) => {
      const { latitudeDelta, longitudeDelta } = state.region;
      return {
        region: {
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }
      }
    });
  }

  render() {
    return (
      <>
        <MapContainer>
          <StyledMapView
            provider={undefined}
            region={this.state.region}
            initialRegion={this.state.region}
            onRegionChange={this.onRegionChangeDelayed}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
          >
            {this.props.children}
          </StyledMapView>
        </MapContainer>
        {this.props.location && <>
          <MapButton background="pink" left onPress={this.onCheckIn}>Check In</MapButton>
          <MapButton background="lightblue" onPress={this.onCenterLocation}>Center</MapButton>
        </>
        }
      </>
    )
  }
}

App.defaultProps = {
  location: undefined
}

export default App;