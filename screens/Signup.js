import * as Yup from 'yup'

import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { AppPageContainer } from '../components';
import { Button } from 'react-native-elements'
import ErrorMessage from '../components/ErrorMessage'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import { Formik } from 'formik'
import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { withFirebaseHOC } from '../config/Firebase'

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
    .oneOf([Yup.ref('password')], 'Confirm Password must matched Password')
    .required('Confirm Password is required'),
})

class Signup extends React.Component {
  state = {
    passwordVisibility: true,
    confirmPasswordVisibility: true,
    passwordIcon: 'ios-eye',
    confirmPasswordIcon: 'ios-eye'
  }

  goToLogin = () => this.props.navigation.navigate('Login')

  handlePasswordVisibility = () => {
    this.setState(prevState => ({
      passwordIcon:
        prevState.passwordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      passwordVisibility: !prevState.passwordVisibility
    }))
  }

  handleConfirmPasswordVisibility = () => {
    this.setState(prevState => ({
      confirmPasswordIcon:
        prevState.confirmPasswordIcon === 'ios-eye' ? 'ios-eye-off' : 'ios-eye',
      confirmPasswordVisibility: !prevState.confirmPasswordVisibility
    }))
  }

  handleOnSignup = async (values, actions) => {
    const { displayName, email, password } = values

    try {
      const response = await this.props.firebase.signupWithEmail(
        email,
        password
      )

      if (response.user.uid) {
        const { uid } = response.user
        await this.props.firebase.createNewUser({ email, displayName, uid })
        await this.props.firebase.updateUser({ displayName })
        this.props.navigation.navigate('App')
      }
    } catch (error) {
      // console.error(error)
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
    }
  }

  render() {
    const {
      passwordVisibility,
      confirmPasswordVisibility,
      passwordIcon,
      confirmPasswordIcon
    } = this.state
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
                  name='displayName'
                  value={values.displayName}
                  onChangeText={handleChange('displayName')}
                  placeholder='Enter your full name'
                  iconName='md-person'
                  iconColor='#2C384A'
                  onBlur={handleBlur('displayName')}
                />
                <ErrorMessage errorValue={touched.displayName && errors.displayName} />
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
                <ErrorMessage errorValue={touched.password && errors.password} />
                <FormInput
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
                <ErrorMessage
                  errorValue={touched.confirmPassword && errors.confirmPassword}
                />
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType='outline'
                    onPress={handleSubmit}
                    title='SIGNUP'
                    buttonColor='#F57C00'
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                  />
                </View>
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
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 25
  },
})

export default withFirebaseHOC(Signup)