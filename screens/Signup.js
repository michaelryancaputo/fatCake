import * as React from 'react';
import * as Yup from 'yup';

import { AppPageContainer, Button, ErrorMessage, FormInput } from '../components';

import Firebase from '../api/firebase';
import { Formik } from 'formik';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const validationSchema = Yup.object().shape({
  displayName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(6, 'Password should be at least 6 characters '),
  confirmPassword: Yup.string()
    .oneOf([ Yup.ref('password') ], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
});

class Signup extends React.Component {
  state = {
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye'
  };

  goToLogin = () => this.props.navigation.navigate('Login');

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon:
        prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }));
  };

  handleConfirmPasswordVisibility = () => {
    this.setState(prevState => ({
      confirmPasswordIcon:
        prevState.confirmPasswordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      confirmPasswordVisibility: !prevState.confirmPasswordVisibility
    }));
  };

  handleOnSignup = async (values, actions) => {
    const { displayName, email, password } = values;

    try {
      const response = await Firebase.shared.signupWithEmail(
        email,
        password
      );

      if (response.user.uid) {
        const { uid } = response.user;
        await Firebase.shared.createNewUser({ email, displayName, uid });
        await Firebase.shared.updateUser({ displayName });
        this.props.navigation.navigate('App');
      }
    } catch (error) {
      // console.error(error)
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  render() {
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      passwordIcon,
      confirmPasswordIcon
    } = this.state;
    return (
      <AppPageContainer heading="Sign Up">
        <Formik
          initialValues={{
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={(values, actions) => this.handleOnSignup(values, actions)}
          validationSchema={validationSchema}>
          {({
            handleChange,
            values,
            handleSubmit,
            errors,
            isValid,
            touched,
            handleBlur,
            isSubmitting,
            setFieldValue
          }) => (
              <>
                <FormInput
                  error={touched.displayName && errors.displayName}
                  name='displayName'
                  value={values.displayName}
                  onChangeText={handleChange('displayName')}
                  placeholder='Enter your full name'
                  iconName='md-person'
                  iconColor='#2C384A'
                  onBlur={handleBlur('displayName')}
                />
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
                <FormInput
                  error={touched.password && errors.password}
                  name='password'
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder='Enter password'
                  iconName='ios-lock'
                  iconColor='#2C384A'
                  onBlur={handleBlur('password')}
                  secureTextEntry={passwordVisibility}
                  rightIcon={
                    <TouchableOpacity onPress={this.handlePasswordVisibility}>
                      <Ionicons name={passwordIcon} size={28} color='grey' />
                    </TouchableOpacity>
                  }
                />
                <FormInput
                  error={touched.confirmPassword && errors.confirmPassword}
                  name='password'
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  placeholder='Confirm password'
                  iconName='ios-lock'
                  iconColor='#2C384A'
                  onBlur={handleBlur('confirmPassword')}
                  secureTextEntry={confirmPasswordVisibility}
                  rightIcon={
                    <TouchableOpacity
                      onPress={this.handleConfirmPasswordVisibility}>
                      <Ionicons
                        name={confirmPasswordIcon}
                        size={28}
                        color='grey'
                      />
                    </TouchableOpacity>
                  }
                />
                <Button
                  buttonType='outline'
                  onPress={handleSubmit}
                  title='SIGNUP'
                  buttonColor='#F57C00'
                  disabled={!isValid || isSubmitting}
                  loading={isSubmitting}
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


export default Signup;