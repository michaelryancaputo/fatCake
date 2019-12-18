import * as React from 'react';
import * as Yup from 'yup';

import { AppPageContainer, FormButtonContainer } from '../components';

import { Button } from 'react-native-elements';
import ErrorMessage from '../components/ErrorMessage';
import Firebase from '../firebase';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password must have at least 6 characters ')
});

class Login extends React.Component {
  state = {
    passwordVisibility: true,
    rightIcon: 'ios-eye'
  };

  goToSignup = () => this.props.navigation.navigate('Signup');
  goToForgotPassword = () => this.props.navigation.navigate('ForgotPassword');

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      rightIcon: prevState.rightIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }));
  };

  handleOnLogin = async (values, actions) => {
    const { email, password } = values;
    try {
      const response = await Firebase.shared.loginWithEmail(email, password);

      if (response.user) {
        this.props.navigation.navigate('App');
      }
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  render() {
    const { passwordVisibility, rightIcon } = this.state;
    return (
      <AppPageContainer heading="Login">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, actions) => {
            this.handleOnLogin(values, actions);
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
                  name='email'
                  value={values.email}
                  onChangeText={handleChange('email')}
                  placeholder='Enter email'
                  autoCapitalize='none'
                  iconName='ios-mail'
                  iconColor='#2C384A'
                  onBlur={handleBlur('email')}
                />
                <ErrorMessage errorValue={touched.email && errors.email} />
                <FormInput
                  name='password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder='Enter password'
                  secureTextEntry={passwordVisibility}
                  iconName='ios-lock'
                  iconColor='#2C384A'
                  onBlur={handleBlur('password')}
                  rightIcon={
                    <TouchableOpacity onPress={this.handlePasswordVisibility}>
                      <Ionicons name={rightIcon} size={28} color='grey' />
                    </TouchableOpacity>
                  }
                />
                <ErrorMessage errorValue={touched.password && errors.password} />
                <FormButtonContainer>
                  <FormButton
                    buttonType='outline'
                    onPress={handleSubmit}
                    title='LOGIN'
                    buttonColor='#039BE5'
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </FormButtonContainer>
                <ErrorMessage errorValue={errors.general} />
              </>
            )}
        </Formik>
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        />
        <Button
          title='Forgot Password?'
          onPress={this.goToForgotPassword}
          titleStyle={{
            color: '#039BE5'
          }}
          type='clear'
        />
      </AppPageContainer>
    );
  }
}

export default Login;