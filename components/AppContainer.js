import * as React from 'react';

import Constants from 'expo-constants';
import Heading from './Heading';
import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

const AppContainer = styled.SafeAreaView`
    flex: 1;
    padding-top: ${Constants.statusBarHeight ? Constants.statusBarHeight : 20};
`;

export const AppPageContainer = props => {
    if (props.heading) {
        return <ScrollView contentInsetAdjustmentBehavior="automatic">
            <AppContainer>
                <Heading>{props.heading}</Heading>
                {props.children}
            </AppContainer>
        </ScrollView>
    }

    return <AppContainer {...props} />
}

export default AppContainer;