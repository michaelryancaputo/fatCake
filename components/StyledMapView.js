import ClusteredMapView from 'react-native-maps-super-cluster';
import {
  Dimensions,
} from 'react-native';
import styled from 'styled-components/native';

const StyledMapView = styled(ClusteredMapView)`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
`;

export default StyledMapView;