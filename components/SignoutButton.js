import * as React from 'react'

import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'

class SignoutButton extends React.Component {
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
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

export default withFirebaseHOC(SignoutButton)

