import React, { Component } from 'react'

import { Button } from 'react-native-elements'
import { withFirebaseHOC } from '../config/Firebase'

class Home extends Component {
  handleSignout = async () => {
    try {
      await this.props.firebase.signOut()
      this.props.navigation.navigate('Auth')
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <Button
        title='Signout'
        onPress={this.handleSignout}
        titleStyle={{
          color: '#F57C00'
        }}
        type='clear'
      />
    )
  }
}

export default withFirebaseHOC(Home)
