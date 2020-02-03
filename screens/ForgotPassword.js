import * as React from 'react';
import * as Yup from 'yup';

import { AppPageContainer, Button, ErrorMessage, FormInput, Logo } from '../components';

import Firebase from '../api/firebase';
import { Formik } from 'formik';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
});

class ForgotPassword extends React.Component {
  goToLogin = () => this.props.navigation.navigate('Login');

  handlePasswordReset = async (values, actions) => {
    const { email } = values;

    try {
      await Firebase.shared.passwordReset(email);
      console.log('Password reset email sent successfully');
      this.props.navigation.navigate('Login');
    } catch (error) {
      actions.setFieldError('general', error.message);
    }
  };

  render() {
    return (
      <AppPageContainer heading="Forgot Password?">
        <Logo />
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions);
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting
          }) => (
              <>
                <FormInput
                  error={touched.email && errors.email}
                  name='email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder='Enter email'
                  autoCapitalize='none'
                  iconName='ios-mail'
                  iconColor='#2C384A'
                  onBlur={handleBlur('email')}
                />
                <Button
                  buttonType='outline'
                  onPress={handleSubmit}
                  title='Send Email'
                  buttonColor='#039BE5'
                  disabled={!isValid || isSubmitting}
                />
                <ErrorMessage errorValue={errors.general} />
              </>
            )}
        </Formik>
        <Button
          title='Have an account? Login'
          onPress={this.goToLogin}
          titleStyle={{
            color: '#039BE5'
          }}
          type='clear'
        />
      </AppPageContainer>
    );
  }
}

export default ForgotPassword;