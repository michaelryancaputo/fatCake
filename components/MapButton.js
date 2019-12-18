import styled, { css } from 'styled-components/native';

import TouchableButton from './TouchableButton';

const MapButton = styled(TouchableButton)`
  width: 100;
  position: absolute;
  bottom: 20;
  ${props => props.left ? css`left: 10` : css`right: 10`}
`;

export default MapButton;