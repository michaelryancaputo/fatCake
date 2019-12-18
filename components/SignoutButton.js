import * as React from 'react';

import Button from './Button';
import Firebase from '../firebase';

class SignoutButton extends React.Component {
  handleSignout = async () => {
    try {
      await Firebase.shared.signOut();
      this.props.navigation.navigate('Auth');
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return <Button
      title='Signout'
      buttonType='outline'
      buttonColor='#F57C00'
      onPress={this.handleSignout}
      type='clear'
    />;
  }
}

export default SignoutButton;

