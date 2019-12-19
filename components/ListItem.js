import { Body, Button, Card, CardItem, Icon, Left, Right, Text, Thumbnail } from 'native-base';

import { Image } from "react-native";
import React from "react";
import { formatDistanceToNow } from 'date-fns';

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
    const { timestamp, text, name, imageWidth, imageHeight, image: uri, user } = this.props;

    console.log(this.props);
    // Reduce the name to something
    const imgW = imageWidth || this.state.width;
    const imgH = imageHeight || this.state.height;
    const aspect = imgW / imgH || 1;

    return <Card>
      <CardItem>
        <Left>
          {user.photoUrl ? <Thumbnail source={{ uri: user.photoUrl }} /> : null}
          <Body>
            <Text>{user.displayName || name}</Text>
          </Body>
          <Right>
            <Text>{formatDistanceToNow(new Date(timestamp), { addSuffix: true })}</Text>
          </Right>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Body>
          <Image source={{ uri }} style={{ height: imageHeight, width: '100%', flex: 1 }} />
          <Text>
            {text}
          </Text>
        </Body>
      </CardItem>
      <CardItem>
        <Left>
          <Button transparent>
            <Icon active name="thumbs-up" />
            <Text>12</Text>
          </Button>
          <Button transparent>
            <Icon active name="chatbubbles" />
            <Text>4</Text>
          </Button>
        </Left>
      </CardItem>
    </Card>;
  }
}

export default ListItem;