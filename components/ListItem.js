import { Image, View } from "react-native";

import Photo from './Photo';
import React from "react";
import styled from 'styled-components';

class ListItem extends React.Component {
  state = {
    width: undefined,
    height: undefined,
  };

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.image, (width, height) => {
        this.setState({ width, height });
      });
    }
  }

  render() {
    const { text, name, imageWidth, imageHeight, image, user } = this.props;

    // Reduce the name to something
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;

    return (
      <View>
        <Photo uri={image} />
        <View style={{ padding: 12 }}>
          <Text>{user.displayName || name}</Text>
          <Subtitle>{text}</Subtitle>
        </View>
      </View>
    );
  }
}

const Text = styled.Text`
  font-weight: 600;
`;

const Subtitle = styled.Text`
  opacity: 0.8;
`;

export default ListItem;