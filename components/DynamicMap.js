import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as React from 'react';

import {
  Button,
  Text,
} from 'react-native';
import { ClusterContainer, ClusterCounterText, MapContainer, MapViewPopout, StyledMapView } from './index'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import AddPhotoModal from './AddPhotoModal';
import Constants from 'expo-constants'
import Croissant from '../assets/images/croissant.png';
import Firebase from '../config/Firebase'
import MapButton from './MapButton';
import _ from 'lodash';
import { getPermission } from "../utils";
import mapStyle from '../mapStyle.json';
import openMap from 'react-native-open-maps';

const options = {
  allowsEditing: true
};

const convertToReadableLocations = queryLocations => _.reduce(queryLocations, (acc, { d }) => [...acc, {
  location: {
    latitude: d.coordinates._lat,
    longitude: d.coordinates._long
  },
  address: d.address,
  name: d.name
}], [])

class DynamicMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
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
    this.addPhoto = this.addPhoto.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.renderCluster = this.renderCluster.bind(this);
    this.getLocations = this.getLocations.bind(this);
  }

  componentWillMount() {
    this.getLocations();
  }

  getLocations = async () => {
    const queryResult = await Firebase.shared.getAllDocuments('locations');
    const locations = convertToReadableLocations(queryResult);
    console.log('fired')
    this.setState({ locations });
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
    const permissionType = Constants.isDevice ? Permissions.CAMERA : Permissions.CAMERA_ROLL;
    const status = await getPermission(permissionType);

    if (status) {
      const result = Constants.isDevice ?
        await ImagePicker.launchCameraAsync(options) :
        await ImagePicker.launchImageLibraryAsync(options);

      if (!result.cancelled) {
        this.setModalVisible(true, { newImageUri: result.uri })
      }
    }
  }


  setModalVisible = (visible, options = {}) => {
    if (!visible) {
      options['newImageUri'] = undefined;
    }
    this.setState({ addPhotoModalVisible: visible, ...options });
  }

  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount;
    const coordinate = cluster.coordinate;

    return (
      <MapView.Marker
        anchor={{ x: -.0025, y: -.0025 }}
        coordinate={coordinate}
        onPress={onPress}
      >
        <ClusterContainer>
          <ClusterCounterText>
            {pointCount}
          </ClusterCounterText>
        </ClusterContainer>
      </MapView.Marker>
    )
  }

  renderMarker = (data) => {
    const link = () => openMap.createOpenLink(data.location);
    return <MapView.Marker key={data.name}
      image={Croissant}
      width={10}
      height={10}
      anchor={{ x: -.0025, y: -.0025 }}
      coordinate={data.location}>
      <MapView.Callout>
        <MapViewPopout>
          <Text>
            {data.name}
          </Text>
          <Button title={data.address} onPress={link} />
        </MapViewPopout>
      </MapView.Callout>
    </MapView.Marker>
  }

  render() {
    return (
      <>
        <AddPhotoModal
          addPhotoModalVisible={this.state.addPhotoModalVisible}
          newImageUri={this.state.newImageUri}
          setModalVisible={this.setModalVisible}
          location={this.props.location}
        />
        <MapContainer>
          <StyledMapView
            ref={(r) => { this.map = r }}
            provider={undefined}
            data={this.state.locations}
            initialRegion={this.state.region}
            onRegionChange={this.onRegionChangeDelayed}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapStyle}
            renderMarker={this.renderMarker}
            renderCluster={this.renderCluster}
          >
            {this.props.children}
          </StyledMapView>
        </MapContainer>
        {
          this.props.location && <>
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