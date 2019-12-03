import * as React from 'react';

import { Image, Modal, TextInput } from 'react-native';

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
    const image = this.props.newImageUri;

    if (text && image) {
      this.closeModal();
      Firebase.shared.post({ text: text.trim(), image });
    } else {
      alert('Need valid description');
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
          style={{ flex: 1, paddingHorizontal: 16 }}
          placeholder="Add a neat description..."
          onChangeText={text => this.setState({ text })}
        />
        <FormButton onPress={this.onSave} title="Save" />
        <FormButton onPress={this.closeModal} title="Close" />
      </AppPageContainer>
    </Modal>
  }
}

export default AddPhotoModal;