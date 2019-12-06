import * as React from 'react'

import { Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native';

const InputContainer = styled.View`
  margin-top: 25;
  margin-bottom: 25;
`;

const IconStyle = styled(Input)`
  margin-right: 10;
`;

const FormInput = ({
  iconName,
  iconColor,
  returnKeyType,
  keyboardType,
  name,
  placeholder,
  ...rest
}) => (
    <InputContainer>
      <IconStyle
        {...rest}
        leftIcon={<Ionicons name={iconName} size={28} color={iconColor} />}
        leftIconContainerStyle={{ marginRight: 10 }}
        placeholderTextColor='grey'
        name={name}
        placeholder={placeholder}
      />
    </InputContainer>
  )

export default FormInput
