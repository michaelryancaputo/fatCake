import Constants from 'expo-constants';
import Heading from './Heading';
import React from 'react';
import styled from 'styled-components/native';

const AppContainer = styled.SafeAreaView`
    flex: 1;
    padding-top: ${Constants.statusBarHeight ? Constants.statusBarHeight : 20};
    padding-left: 20;
    padding-right: 20;
`;

export const AppPageContainer = props => {
    if (props.heading) {
        return <AppContainer>
            <Heading>{props.heading}</Heading>
            {props.children}
        </AppContainer>
    }

    return <AppContainer {...props} />
}

export default AppContainer;