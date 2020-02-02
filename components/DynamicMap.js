import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as React from 'react';

import { Button, Fab, Icon, Text } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import AddPhotoModal from './AddPhotoModal';
import ClusterContainer from './ClusterContainer';
import ClusterCounterText from './ClusterCounterText';
import Constants from 'expo-constants';
import Croissant from '../assets/images/croissant.png';
import DetailsPanel from './DetailsPanel';
import Firebase from '../api/firebase';
import MapContainer from './MapContainer';
import MapViewPopout from './MapViewPopout';
import StyledMapView from './StyledMapView';
import _ from 'lodash';
import { getPermission } from "../utils";
import mapStyle from '../mapStyle.json';

const options = {
  allowsEditing: true
};

const convertToReadableLocations = queryLocations => _.reduce(queryLocations, (acc, { d }) => [ ...acc, {
  location: {
    latitude: d.coordinates._lat,
    longitude: d.coordinates._long
  },
  address: d.address,
  name: d.name
} ], []);

class DynamicMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeMarker: undefined,
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
    this.onRegionChangeDelayed = _.debounce(this.onRegionChange, 2000);
    this.onCenterLocation = this.onCenterLocation.bind(this);
    this.addPhoto = this.addPhoto.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.renderCluster = this.renderCluster.bind(this);
    this.getLocations = this.getLocations.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.getLocations();
  }

  getLocations = async () => {
    const queryResult = await Firebase.shared.getAllDocuments('locations');
    const locations = convertToReadableLocations(queryResult);
    this.setState({ locations });
  };

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
      };
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
        this.setModalVisible(true, { newImageUri: result.uri });
      }
    }
  };


  setModalVisible = (visible, options = {}) => {
    if (!visible) {
      options[ 'newImageUri' ] = undefined;
    }
    this.setState({ addPhotoModalVisible: visible, ...options });
  };

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
    );
  };

  renderMarker = (data) => {
    return <MapView.Marker key={data.name}
      coordinate={data.location}
      onPress={() => this.setState({ activeMarker: { lastClicked: new Date(), ...data } })}
    />;
  };

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
            ref={(r) => { this.map = r; }}
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
            <Fab
              position="topLeft"
              style={{ backgroundColor: '#5067FF' }}
              onPress={this.addPhoto}
            >
              <Icon name="camera" />
            </Fab>
          </>
        }
        <DetailsPanel {...this.state.activeMarker} />
      </>
    );
  }
}

DynamicMap.defaultProps = {
  location: undefined
};

export default DynamicMap;;