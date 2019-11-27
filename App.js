import MapboxGL from '@react-native-mapbox-gl/maps'
import { Platform } from 'react-native'
import React from 'react'
import firebase from '@react-native-firebase/app'
import styled from 'styled-components/native'

MapboxGL.setAccessToken(
    'pk.eyJ1IjoibWljaGFlbHJ5YW5jYXB1dG8iLCJhIjoiY2szaGdpdTVuMGNmODNianEzbnJwem9rdiJ9.OWG-UtJHosonBwI8NOstgg'
)

const MapContainer = styled.View`
    height: 500;
    width: 100%;
    background-color: tomato;
`

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #f5fcff;
`

const Welcome = styled.Text`
    font-size: 30;
    text-align: center;
    margin-top: 10;
    margin-right: 10;
    margin-bottom: 10;
    margin-left: 10;
`

export function onSortOptions(a, b) {
    if (a.label < b.label) {
        return -1
    }

    if (a.label > b.label) {
        return 1
    }

    return 0
}

export default class App extends React.Component {
    componentDidMount() {
        MapboxGL.locationManager.start()
        MapboxGL.setTelemetryEnabled(false)
    }

    componentWillUnmount() {
        MapboxGL.locationManager.dispose()
    }

    render() {
        console.log(MapboxGL.UserTrackingModes)
        return (
            <Container>
                <Welcome>Hello Fatcake!</Welcome>
                <MapContainer>
                    <MapboxGL.MapView
                        styleURL={MapboxGL.StyleURL.Dark}
                        style={{ flex: 1 }}
                        ref={c => (this._map = c)}
                        zoomEnabled={false}
                        logoEnabled={false}
                        userTrackingMode={true}
                    >
                        <MapboxGL.Camera followUserLocation />

                        <MapboxGL.UserLocation locationManager />
                    </MapboxGL.MapView>
                </MapContainer>
            </Container>
        )
    }
}
