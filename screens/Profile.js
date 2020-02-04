import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import * as Yup from 'yup';

import { ActivityIndicator, AppPageContainer, Button, Photo, SignoutButton } from '../components';
import { Card, CardItem } from 'native-base';

import { Alert } from 'react-native';
import Constants from 'expo-constants';
import ErrorMessage from '../components/ErrorMessage';
import Firebase from '../api/firebase';
import FormInput from '../components/FormInput';
import { Formik } from 'formik';
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
});

class Profile extends React.Component {
  state = {
    uid: undefined,
    loading: false,
    userData: {
      displayName: undefined,
      email: undefined,
      phoneNumber: undefined,
      photoUrl: undefined,
    }
  };

  pickImage = async (handleChange) => {
    const permissionType = Constants.isDevice ? Permissions.CAMERA : Permissions.CAMERA_ROLL;
    const status = await getPermission(permissionType);

    if (status) {
      const result = Constants.isDevice ?
        await ImagePicker.launchCameraAsync(options) :
        await ImagePicker.launchImageLibraryAsync(options);

      if (!result.cancelled && result.uri) {
        const photoUrl = await Firebase.shared.postUserPhoto(`${result.uri}`);
        handleChange(photoUrl);
        this.setState(state => ({
          userData: {
            ...state.userData,
            photoUrl
          }
        }));
      }
    }
  };

  handleDelete = async () => {
    Alert.alert(
      'Delete Your Account',
      'All of your data will be lost',
      [
        { text: 'No', onPress: () => { return; } },
        {
          text: 'Yes', onPress: () => {
            Firebase.shared.deleteUser(this.state.uid).then(() => {
              this.props.navigation.navigate('App');
            }).catch(() => {
              actions.setFieldError('general', 'There was a problem deleting your account.');
            });

          }
        },
      ],
      { cancelable: false },
    );
  };

  getUserData = async () => {
    const userData = await Firebase.shared.getCurrentUser();
    this.setState({
      uid: userData.uid,
      userData
    });
  };

  componentDidMount() {
    this.getUserData();
  }

  handleOnModifyUser = async (values, actions) => {
    const { displayName, email, phoneNumber, photoUrl } = values;
    try {
      const options = { displayName, email, phoneNumber, photoUrl };
      await Firebase.shared.updateUser(options);
    } catch (error) {
      actions.setFieldError('general', error.message);
    } finally {
      actions.setSubmitting(false);
      this.getUserData();
    }
  };

  render() {
    if (this.state.uid === undefined) {
      return <ActivityIndicator />;
    }

    const { userData } = this.state;

    return (
      <AppPageContainer heading="Profile" headingRight={<SignoutButton transparent  {...this.props} />}>
        <Formik
          initialValues={userData}
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
                {userData.photoUrl ?
                  <Card style={{ marginBottom: 30 }}>
                    <CardItem cardBody>
                      <Photo uri={userData.photoUrl} />
                    </CardItem>
                    <CardItem footer>
                      <Button
                        transparent
                        small
                        onPress={() => this.pickImage(handleChange('photoUrl'))}
                        title="Change your profile photo"
                      />
                    </CardItem>
                  </Card>
                  :
                  <Button
                    onPress={() => this.pickImage(handleChange('photoUrl'))}
                    title="Choose a profile photo"
                  />
                }
                <FormInput
                  error={touched.displayName && errors.displayName}
                  name='displayName'
                  value={values.displayName}
                  onChangeText={handleChange('displayName')}
                  placeholder='Enter your full name'
                  iconName='md-person'
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
                  onBlur={handleBlur('email')}
                />
                <Button
                  title='Save'
                  onPress={handleSubmit}
                  disabled={!isValid || isSubmitting || !dirty}
                  loading={isSubmitting}
                />
                <ErrorMessage errorValue={errors.general} />
              </>
            );
          }}
        </Formik>

        <Button
          warning
          onPress={this.handleDelete}
          title='Delete Your Account'
        />

      </AppPageContainer >
    );
  }
}

export default Profile;

