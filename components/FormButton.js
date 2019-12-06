import * as React from 'react'

import { Button } from 'react-native-elements';
import styled from 'styled-components/native';

const StyledButton = styled(Button)`
  margin-bottom: 20;
`

const FormButton = ({ title = 'Click', buttonType = 'outline', buttonColor = '#039BE5', ...rest }) => (
  <StyledButton
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
    titleStyle={{ color: buttonColor }}
  />
)

export default FormButton
