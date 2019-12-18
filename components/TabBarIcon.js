import * as React from 'react';

import Colors from '../constants/Colors';
import { Icon } from 'native-base';

export default function TabBarIcon(props) {
  return (
    <Icon
      type="Ionicons"
      name={props.name}
      style={{
        marginBottom: -3,
        fontSize: 20,
        color: props.focused ? Colors.tabIconSelected : Colors.tabIconDefault
      }}
    />
  );
}
