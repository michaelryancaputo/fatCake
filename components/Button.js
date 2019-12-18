import * as React from 'react';

import { Button as NativeBaseButton, Text } from 'native-base';

import styled from 'styled-components/native';

const StyledButton = styled(NativeBaseButton)`
  margin-bottom: 15;
`;

const Button = ({ title = 'Click', ...rest }) => (
  <StyledButton block {...rest}>
    <Text>
      {title}
    </Text>
  </StyledButton>
);

export default Button;
