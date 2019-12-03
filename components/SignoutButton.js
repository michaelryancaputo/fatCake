import * as React from 'react'

import { Button } from 'react-native-elements'
import Firebase from '../config/Firebase'

class SignoutButton extends React.Component {
  handleSignout = async () => {
    try {
      await Firebase.shared.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return <Button
      title='Signout'
      onPress={this.handleSignout}
      titleStyle={{
        color: '#F57C00'
      }}
      type='clear'
      {...this.props}
    />
  }
}

export default SignoutButton;

