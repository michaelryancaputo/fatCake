import * as React from 'react';

import BottomSheet from 'reanimated-bottom-sheet';
import Button from './Button';
import Heading from './Heading';
import PanelHandleHeader from './PanelHandleHeader';
import openMap from 'react-native-open-maps';
import styled from 'styled-components/native';

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
        <Panel>
          <PanelHeading>
            {name}
          </PanelHeading>
          <PanelText>
            {content}
          </PanelText>
          <Button title="Visit Site" onPres={openLink} />
        </Panel>
      )}
    />
  );
};

const Panel = styled.View`
  height: 600;
  padding-top: 20;
  padding-left: 20;
  padding-bottom: 20;
  padding-right: 20;
  background-color: #f7f5eee8;
`;

const PanelHeading = styled(Heading)`
  margin-left:0;
  margin-bottom: 10;
`;

const PanelText = styled.Text`
  margin-bottom: 10;
`;

export default ActionsPanel;;