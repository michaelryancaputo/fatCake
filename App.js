import { Platform } from 'react-native'
import React from 'react'
import firebase from '@react-native-firebase/app'
import styled from 'styled-components/native'

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\nCmd+D or shake for dev menu',
    android:
        'Double tap R on your keyboard to reload,\nShake or press menu button for dev menu',
})

const firebaseCredentials = Platform.select({
    ios: 'https://invertase.link/firebase-ios',
    android: 'https://invertase.link/firebase-android',
})

export default class App extends React.Component {
    render() {
        return (
            <Container>
                <Welcome>HI to React Native + Firebase!</Welcome>
                <Instructions>To get started, edit App.js</Instructions>
                <Instructions>{instructions}</Instructions>
                {!firebase.apps.length && (
                    <Instructions>
                        {`\nYou currently have no Firebase apps registered, this most likely means you've not downloaded your project credentials. Visit the link below to learn more. \n\n ${firebaseCredentials}`}
                    </Instructions>
                )}
            </Container>
        )
    }
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: #f5fcff;
`

const Welcome = styled.Text`
    font-size: 20;
    text-align: center;
    margin-top: 10;
    margin-right: 10;
    margin-bottom: 10;
    margin-left: 10;
`

const Instructions = styled.Text`
    text-align: center;
    color: #333;
    margin-bottom: 5;
`
