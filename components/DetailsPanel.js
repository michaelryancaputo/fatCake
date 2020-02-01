import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import openMap from 'react-native-open-maps';

const Inner = () => (
  <View style={styles.panel}>
    <Text style={styles.panelTitle}>Actions Menu</Text>
    <View style={styles.panelButton}>
      <Text style={styles.panelButtonTitle}>Take Photo</Text>
    </View>
  </View>
);

const Header = () => (
  <View style={styles.header}>
    <View style={styles.panelHeader}>
      <View style={styles.panelHandle} />
    </View>
  </View>
);

const ActionsPanel = (props) => {
  const refSheet = useRef();

  // need to detect if new props are passed, and trigger the sheet to appear again
  //  onPress={() => refSheet.current.snapTo(1)}

  const { name, location, content } = props;
  const link = () => openMap.createOpenLink(location);

  return (
    <BottomSheet
      ref={refSheet}
      snapPoints={[ 350, 45 ]}
      renderHeader={Header}
      renderContent={() => (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>{name}</Text>
          {content && <View>
            {content}
          </View>}
          <View style={styles.panelButton}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </View>
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