import * as React from 'react'

import { Button } from 'react-native-elements'

const FormButton = ({ title = 'Click', buttonType = 'outline', buttonColor = '#039BE5', ...rest }) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{ borderColor: buttonColor, borderRadius: 20 }}
    titleStyle={{ color: buttonColor }}
  />
)

export default FormButton
