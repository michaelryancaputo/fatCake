import * as React from 'react';
import * as Yup from 'yup';

import { AppPageContainer, Button } from '../components';

import ErrorMessage from '../components/ErrorMessage';
import Firebase from '../firebase';
import FormInput from '../components/FormInput';
import { Formik } from 'formik';

const initialState = { email: '', password: '' };

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

const Login = (props) => {
  const goToSignup = () => props.navigation.navigate('Signup');
  const goToForgotPassword = () => props.navigation.navigate('ForgotPassword');
  const navigateToApp = () => navigation.navigate('App');

  const handleOnLogin = async (values, actions) => {
    const { email, password } = values;
    try {
      const response = await Firebase.shared.loginWithEmail(email, password);

      if (response.user) {
        navigateToApp();
      }
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <AppPageContainer
      heading="Login"
      footer={<>
        <Button
          title="Sign Up"
          onPress={goToSignup}
        />
        <Button
          title='Forgot Password'
          onPress={goToForgotPassword}
        />
      </>}
    >
      <Formik
        initialValues={initialState}
        onSubmit={handleOnLogin}
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
                placeholder='Email'
                autoCapitalize='none'
                iconName='ios-mail'
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email} />
              <FormInput
                name='password'
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder='password'
                iconName='ios-lock'
                onBlur={handleBlur('password')}
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <Button
                buttonType='outline'
                onPress={handleSubmit}
                title='Login'
                buttonColor='#039BE5'
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
              />
              <ErrorMessage errorValue={errors.general} />
            </>
          )}
      </Formik>
    </AppPageContainer>
  );
};

export default Login;