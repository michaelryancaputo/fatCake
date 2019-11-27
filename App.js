import MapboxGL from '@react-native-mapbox-gl/maps'
import { Platform } from 'react-native'
import React from 'react'
import firebase from '@react-native-firebase/app'
import styled from 'styled-components/native'

MapboxGL.setAccessToken(
    'pk.eyJ1IjoibWljaGFlbHJ5YW5jYXB1dG8iLCJhIjoiY2szaGdpdTVuMGNmODNianEzbnJwem9rdiJ9.OWG-UtJHosonBwI8NOstgg'
)

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
})

const firebaseCredentials = Platform.select({
    ios: 'https://invertase.link/firebase-ios',
    android: 'https://invertase.link/firebase-android',
})

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

export default class App extends React.Component {
    componentDidMount() {
        MapboxGL.setTelemetryEnabled(false)
    }

    render() {
        return (
            <Container>
                <Welcome>Hello Fatcake!</Welcome>
                <MapContainer>
                    <MapboxGL.MapView style={{ flex: 1 }} />
                </MapContainer>
            </Container>
        )
    }
}
