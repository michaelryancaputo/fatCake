import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import * as Yup from 'yup'

import { AppPageContainer, Photo, SignoutButton } from '../components';
import { Image, Text, View } from 'react-native'

import Constants from 'expo-constants';
import ErrorMessage from '../components/ErrorMessage'
import Firebase from '../config/Firebase'
import FormButton from '../components/FormButton'
import FormInput from '../components/FormInput'
import { Formik } from 'formik'
import { getPermission } from "../utils";

const options = {
  allowsEditing: true
};

const validationSchema = Yup.object().shape({
  displayName: Yup.string()
    .label('Name')
    .required()
    .min(2, 'Must have at least 2 characters'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
})

class Profile extends React.Component {
  state = {
    uid: undefined,
    loading: false,
    userData: {
      displayName: undefined,
      email: undefined,
      phoneNumber: undefined,
      photoURL: undefined,
    }
  }

  pickImage = async (handleChange) => {
    const permissionType = Constants.isDevice ? Permissions.CAMERA : Permissions.CAMERA_ROLL;
    const status = await getPermission(permissionType);

    if (status) {
      const result = Constants.isDevice ?
        await ImagePicker.launchCameraAsync(options) :
        await ImagePicker.launchImageLibraryAsync(options);

      if (!result.cancelled && result.uri) {
        const photoURL = await Firebase.shared.postUserPhoto(`${result.uri}`);
        handleChange(photoURL);
        this.setState({
          userData: {
            photoURL
          }
        })
      }
    }
  }

  handleDelete = async () => {
    Firebase.shared.deleteUser(this.state.uid).then(() => {
      this.props.navigation.navigate('App')
    }).catch(() => {
      actions.setFieldError('general', 'There was a problem deleting your account.')
    })
  }

  getUserData() {
    const userData = Firebase.shared.getCurrentUser();
    this.setState({
      uid: userData.uid,
      userData: userData.providerData[0]
    })
  }

  componentDidMount() {
    this.getUserData();
  }

  handleOnModifyUser = async (values, actions) => {
    const { displayName, email, phoneNumber, photoURL } = values;
    try {
      const options = { displayName, email, phoneNumber, photoURL }
      await Firebase.shared.updateUser(options)
    } catch (error) {
      actions.setFieldError('general', error.message)
    } finally {
      actions.setSubmitting(false)
      this.getUserData();
    }
  }

  render() {
    if (this.state.uid === undefined) {
      return <Text>Loading...</Text>
    }

    return (
      <AppPageContainer heading="Profile">
        {this.state.userData.photoURL && <Photo uri={this.state.userData.photoURL}
        />
        }
        <Formik
          initialValues={this.state.userData}
          onSubmit={this.handleOnModifyUser}
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
            dirty,
          }) => {
            return (
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

                <FormButton
                  onPress={() => this.pickImage(handleChange('photoURL'))}
                  title="Choose a profile photo"
                />

                <View>
                  <FormButton
                    onPress={handleSubmit}
                    title='Save'
                    buttonColor='#F57C00'
                    disabled={!isValid || isSubmitting || !dirty}
                    loading={isSubmitting}
                  />
                </View>
                <ErrorMessage errorValue={errors.general} />

              </>
            )
          }}
        </Formik>
        <SignoutButton {...this.props} />
        <FormButton
          buttonType='outline'
          buttonColor='#F57C00'
          onPress={this.handleDelete}
          title='DELETE'
        />

      </AppPageContainer>
    )
  }
}

export default Profile

