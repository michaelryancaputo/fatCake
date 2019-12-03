import * as React from 'react'
import * as Yup from 'yup'

import { StyleSheet, View } from 'react-native'

import { AppPageContainer } from '../components';
import ErrorMessage from '../components/ErrorMessage'
import Firebase from '../config/Firebase'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import { Formik } from 'formik'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email')
})

class ForgotPassword extends React.Component {
  handlePasswordReset = async (values, actions) => {
    const { email } = values;

    try {
      await Firebase.shared.passwordReset(email)
      console.log('Password reset email sent successfully')
      this.props.navigation.navigate('Login')
    } catch (error) {
      actions.setFieldError('general', error.message)
    }
  }

  render() {
    return (
      <AppPageContainer heading="Forgot Password?">
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, actions) => {
            this.handlePasswordReset(values, actions)
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
                <View style={styles.buttonContainer}>
                  <FormButton
                    buttonType='outline'
                    onPress={handleSubmit}
                    title='Send Email'
                    buttonColor='#039BE5'
                    disabled={!isValid || isSubmitting}
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />
              </>
            )}
        </Formik>
      </AppPageContainer>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    margin: 25
  }
})

export default ForgotPassword;