import React from 'react';
import styled from 'styled-components/native';

const TouchableButton = styled.TouchableOpacity`
  background: blue;
  padding-top: 20;
  padding-bottom: 20;
  padding-left: 30;
  padding-right: 30;
`;

const TouchableText = styled.Text`
  color: white;
`

export default ({ children = 'Button', ...rest }) => <TouchableButton {...rest}>
  <TouchableText>
    {children}
  </TouchableText>
</TouchableButton>
