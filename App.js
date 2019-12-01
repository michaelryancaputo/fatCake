import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import React from 'react'
// import firebase from '@react-native-firebase/app'
import styled from 'styled-components/native'

const MapContainer = styled.View`
    height: 500;
    width: 100%;
    background-color: tomato;
`

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const Welcome = styled.Text`
    font-size: 30;
    text-align: center;
    margin-top: 10;
    margin-right: 10;
    margin-bottom: 10;
    margin-left: 10;
`

const StyledMapView = styled(MapView)`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};

`

export default class App extends React.Component {
    render() {
        return (
            <Container>
                <Welcome>Hello Fatcake!</Welcome>
                <MapContainer>
                    <StyledMapView />
                </MapContainer>
            </Container>
        )
    }
}
