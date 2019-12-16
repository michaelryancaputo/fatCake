import * as React from 'react'

import Firebase from '../firebase'
import FormButton from './FormButton'

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
    return <FormButton
      title='Signout'
      buttonType='outline'
      buttonColor='#F57C00'
      onPress={this.handleSignout}
      type='clear'
    />
  }
}

export default SignoutButton;

