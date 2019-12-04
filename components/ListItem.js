import { Image, StyleSheet, Text, View } from "react-native";

import React from "react";

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
    const { text, name, imageWidth, imageHeight, uid, image, user } = this.props;

    // Reduce the name to something
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;

    return (
      <View>
        <Image
          resizeMode="contain"
          style={{
            backgroundColor: "#D8D8D8",
            width: "100%",
            aspectRatio: aspect
          }}
          source={{ uri: image }}
        />
        <View style={{ padding: 12 }}>
          <Text style={styles.text}>{user.displayName || name}</Text>
          <Text style={styles.subtitle}>{text}</Text>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  text: { fontWeight: "600" },
  subtitle: {
    opacity: 0.8
  },
});


export default ListItem;