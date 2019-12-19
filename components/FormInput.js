import * as React from 'react';

import { Icon, Input, Item, Label } from 'native-base';

import styled from 'styled-components/native';

const StyledItem = styled(Item)`
  margin-bottom: 15;
`;


const FormInput = ({
  iconName,
  iconColor = '#000',
  placeholder,
  error = false,
  ...rest
}) => (
    <StyledItem floatingLabel error={!!error}>
      <Label>{placeholder}</Label>
      {iconName && <Icon name={iconName} style={{ marginRight: 10, fontSize: 20, color: iconColor }} />}
      <Input
        {...rest}
      />
    </StyledItem>
  );

export default FormInput;
