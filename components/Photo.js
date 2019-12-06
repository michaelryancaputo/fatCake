import { Image } from "react-native";
import React from "react";

class Photo extends React.Component {
  state = {
    width: undefined,
    height: undefined,
  };

  componentDidMount() {
    if (!this.props.imageWidth) {
      // Get the size of the web image
      Image.getSize(this.props.uri, (width, height) => {
        this.setState({ width, height });
      });
    }
  }

  render() {
    const { uri, imageWidth, imageHeight } = this.props;

    // Reduce the name to something
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;

    return (
      <Image
        resizeMode="contain"
        style={{
          backgroundColor: "#D8D8D8",
          width: "100%",
          aspectRatio: aspect
        }}
        source={{ uri }}
      />
    );
  }
}

export default Photo;