import * as React from 'react';

import Colors from '../constants/Colors';
import { Icon } from 'native-base';
import styled from 'styled-components/native';

const StyledIcon = styled(Icon)`
  margin-bottom: -3;
  font-size: 20;
  color: ${props => props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
`;

export default function TabBarIcon(props) {
  return (
    <StyledIcon
      type="Ionicons"
      name={props.name}
      focused={props.focused}
    />
  );
}
