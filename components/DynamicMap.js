import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import * as React from 'react';

import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

import AddPhotoModal from './AddPhotoModal';
import ClusteredMapView from 'react-native-maps-super-cluster'
import Constants from 'expo-constants'
import Croissant from '../assets/images/croissant.png';
import Locations from '../locations'
import MapButton from './MapButton';
import _ from 'lodash';
import { getPermission } from "../utils";
import mapStyle from '../mapStyle.json';
import openMap from 'react-native-open-maps';
import styled from 'styled-components/native';

const StyledMapView = styled(ClusteredMapView)`
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
    this.addPhoto = this.addPhoto.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
    this.renderMarker = this.renderMarker.bind(this);
    this.renderCluster = this.renderCluster.bind(this);
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
        image={Croissant}
        width={10}
        height={10}
        anchor={{ x: -.0025, y: -.0025 }}
        coordinate={coordinate} onPress={onPress}
      >
        <View style={styles.myClusterStyle}>
          <Text style={styles.myClusterTextStyle}>
            {pointCount}
          </Text>
        </View>
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
        <View style={{ width: 100, height: 'auto' }}>
          <Text>
            {data.name}
          </Text>
          <Button title={data.address} onPress={link} />
        </View>
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
            data={Locations}
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  clusterContainer: {
    width: 30,
    height: 30,
    padding: 6,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  clusterText: {
    fontSize: 13,
    color: '#65bc46',
    fontWeight: '500',
    textAlign: 'center',
  },
  controlBar: {
    top: 48,
    left: 25,
    right: 25,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  novaLabLogo: {
    right: 8,
    bottom: 8,
    width: 64,
    height: 64,
    position: 'absolute',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  clusterContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#65bc46',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  counterText: {
    fontSize: 14,
    color: '#65bc46',
    fontWeight: '400'
  },
  calloutStyle: {
    width: 64,
    height: 64,
    padding: 8,
    borderRadius: 8,
    borderColor: '#65bc46',
    backgroundColor: 'white',
  },
})
