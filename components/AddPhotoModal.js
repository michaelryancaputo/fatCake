import * as React from 'react';

import { Image, KeyboardAvoidingView, Modal, TextInput } from 'react-native';

import { AppPageContainer } from './AppContainer';
import Firebase from '../config/Firebase';
import FormButton from './FormButton';

class AddPhotoModal extends React.Component {
  constructor(props) {
    super(props);

    state = {
      text: undefined
    }

    this.onSave = this.onSave.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  onSave = () => {
    const text = this.state.text;
    const { newImageUri: localUri, location } = this.props;

    if (!location) {
      alert('Location was not found.')
    } else if (!text) {
      alert('Description is not valid.')
    } else if (!localUri) {
      alert('There was a problem with your image')
    } else {
      this.closeModal();
      Firebase.shared.postEvent({ text: text.trim(), localUri, location });
    }

  }

  closeModal = () => this.props.setModalVisible(false)

  render() {
    return <Modal
      animationType="slide"
      transparent={false}
      visible={this.props.addPhotoModalVisible}
    >
      <AppPageContainer heading="Hello!">
        <Image
          source={{ uri: this.props.newImageUri }}
          style={{ resizeMode: 'contain', aspectRatio: 1, width: 72 }}
        />
        <TextInput
          multiline
          style={{ flex: 1, padding: 16 }}
          placeholder="Add a neat description..."
          onChangeText={text => this.setState({ text })}
        />
        <KeyboardAvoidingView behavior="padding" enabled>
          <FormButton onPress={this.onSave} title="Save" />
          <FormButton onPress={this.closeModal} title="Close" />
        </KeyboardAvoidingView>
      </AppPageContainer>
    </Modal>
  }
}

export default AddPhotoModal;