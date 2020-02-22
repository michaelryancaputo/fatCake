import * as React from 'react';

import { Image, KeyboardAvoidingView, Modal, TextInput } from 'react-native';

import { AppPageContainer } from './AppContainer';
import Button from './Button';
import Firebase from '../api/firebase';

type AddPhotoModalProps = {
  newImageUri: string;
  location: string;
  setModalVisible: Function;
  addPhotoModalVisible: boolean;
};

type AddPhoModalState = {
  text: string;
};

class AddPhotoModal extends React.Component<
  AddPhotoModalProps,
  AddPhoModalState
> {
  onSave = async () => {
    const text = this.state.text;
    const { newImageUri: localUri, location } = this.props;

    if (!location) {
      alert('Location was not found.');
    } else if (!text) {
      alert('Description is not valid.');
    } else if (!localUri) {
      alert('There was a problem with your image');
    } else {
      this.closeModal();
      const output = await Firebase.shared.postEvent({
        text: text.trim(),
        localUri,
        location,
      });

      if (output) {
        alert('Your photo counted towards the leaderboard! nice');
      } else {
        alert('You were not close to a bakery. Try again :(');
      }
    }
  };

  closeModal = () => this.props.setModalVisible(false);

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.addPhotoModalVisible}
      >
        <AppPageContainer heading="Post a Photo">
          <Image
            source={{ uri: this.props.newImageUri }}
            style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
          />
          <TextInput
            multiline
            style={{
              flex: 1,
              paddingTop: 30,
              paddingBottom: 60,
              paddingLeft: 10,
              paddingRight: 10,
            }}
            placeholder="Add a neat description..."
            onChangeText={text => this.setState({ text })}
          />
          <KeyboardAvoidingView behavior="padding" enabled>
            <Button onPress={this.onSave} title="Save" />
            <Button onPress={this.closeModal} title="Close" />
          </KeyboardAvoidingView>
        </AppPageContainer>
      </Modal>
    );
  }
}

export default AddPhotoModal;
