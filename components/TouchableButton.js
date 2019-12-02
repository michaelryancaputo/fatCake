import * as React from 'react';

import styled from 'styled-components/native';

const TouchableButton = styled.TouchableOpacity`
  background: ${props => props.background ? props.background : 'pink'};
  padding-top: 15;
  padding-bottom: 15;
  padding-left: 15;
  padding-right: 15;
  border-radius: 20;
`;

const TouchableText = styled.Text`
  color: white;
  font-size: 12;
  font-weight: bold;
  text-align: center;
`

export default ({ children = 'Button', ...rest }) => <TouchableButton {...rest}>
  <TouchableText>
    {children}
  </TouchableText>
</TouchableButton>
