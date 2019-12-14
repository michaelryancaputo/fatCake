import { ActivityIndicator } from 'react-native'
import React from 'react'
import styled from 'styled-components/native';

const ActivityContainer = styled.View`
  flex: 1;
  justify-content: center;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
`

export default () => <ActivityContainer>
  <ActivityIndicator size="large" color="#0000ff" />
</ActivityContainer>
