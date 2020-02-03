import * as React from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import Button from './Button';
import Heading from './Heading';
import PanelHandleHeader from './PanelHandleHeader';
import openMap from 'react-native-open-maps';

const defaultContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque finibus venenatis velit, et laoreet dolor. Sed rutrum velit quis eleifend faucibus. Nunc pellentesque rutrum dignissim. Morbi non lectus varius, mollis massa quis, tristique orci. In blandit vel ipsum eu vestibulum. Donec et feugiat dui. Quisque sit amet mi nec nulla egestas eleifend et sed erat. Phasellus hendrerit urna dui, quis ultricies magna rutrum sed. Aenean sit amet lorem quam. Quisque id porttitor tortor. Donec posuere magna vitae elit feugiat, at pellentesque velit viverra.';

const ActionsPanel = (props) => {
  const { name, location, content = defaultContent, lastClicked } = props;
  const openLink = () => openMap.createOpenLink(location);

  const refSheet = React.useRef();
  const firstUpdate = React.useRef(true);

  React.useEffect(
    () => {
      // Don't display sheet on first render
      if (firstUpdate.current) {
        firstUpdate.current = false;
        return;
      }

      // displaying the sheet
      refSheet.current.snapTo(1);
    },
    [ name, lastClicked ]);


  return (
    <BottomSheet
      ref={refSheet}
      snapPoints={[ name ? 45 : 0, 350 ]}
      renderHeader={PanelHandleHeader}
      renderContent={() => (
        <View style={styles.panel}>
          <Heading style={{ marginLeft: 0, marginBottom: 10 }}>{name}</Heading>
          <Text style={{ marginBottom: 10 }}>
            {content}
          </Text>
          <Button title="Visit Site" onPres={openLink} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  panel: {
    height: 600,
    padding: 20,
    backgroundColor: '#f7f5eee8',
  },
  header: {
    backgroundColor: '#f7f5eee8',
    shadowColor: '#000000',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#318bfb',
    alignItems: 'center',
    marginVertical: 10,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ActionsPanel;;