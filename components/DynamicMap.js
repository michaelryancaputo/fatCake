import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as React from 'react';

import { Alert, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import AddPhotoModal from './AddPhotoModal';
import Constants from 'expo-constants'
import MapButton from './MapButton';
import _ from 'lodash';
import { getPermission } from "../utils";
import mapStyle from '../mapStyle.json';
import styled from 'styled-components/native';

const StyledMapView = styled(MapView)`
    width: ${Dimensions.get('window').width};
    height: ${Dimensions.get('window').height};
`;

const MapContainer = styled.View`
    height: 200;
    width: 100%;
    background-color: tomato;
`;

const options = {
  allowsEditing: true
};

class DynamicMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addPhotoModalVisible: false,
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
    this.addPhoto = this.addPhoto.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
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

  addPhoto = async () => {
    const permissionType = Constants.isDevice ? Permissions.CAMERA_ROLL : Permissions.CAMERA;
    const imageMethod = Constants.isDevice ? 'launchCameraAsync' : 'launchImageLibraryAsync';
    const status = await getPermission(permissionType);

    if (status) {
      const result = await ImagePicker[imageMethod](options);

      if (!result.cancelled) {
        this.setModalVisible(true, { newImageUri: result.uri })
        // this.props.navigation.navigate("NewPost", { image: result.uri });
      }
    }
  }


  setModalVisible = (visible, options = {}) => {
    this.setState({ addPhotoModalVisible: visible, ...options });
  }

  render() {
    return (
      <>
        <AddPhotoModal addPhotoModalVisible={this.state.addPhotoModalVisible} newImageUri={this.state.newImageUri} setModalVisible={this.setModalVisible} />
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
          <MapButton background="pink" left onPress={this.addPhoto}>Photo</MapButton>
          <MapButton background="lightblue" onPress={this.onCenterLocation}>Center</MapButton>
        </>
        }
      </>
    )
  }
}

DynamicMap.defaultProps = {
  location: undefined
}

export default DynamicMap;