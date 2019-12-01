import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import { Dimensions } from 'react-native';
import MapButton from './MapButton';
import React from 'react';
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
    this.centerLocation = this.centerLocation.bind(this);
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  centerLocation() {
    const { latitude, longitude } = this.props.location.coords;
    const { latitudeDelta, longitudeDelta } = this.state.region;

    this.setState({
      region: {
        latitude,
        longitude,
        latitudeDelta,
        longitudeDelta,
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
        <MapButton background="pink" left onPress={this.centerLocation}>Check In</MapButton>
        <MapButton background="orange" onPress={this.centerLocation}>Center</MapButton>
      </>
    )
  }
}

export default App;