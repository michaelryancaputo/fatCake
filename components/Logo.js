import * as React from 'react';

import styled from 'styled-components/native';

const Image = styled.Image`
  height: 100;
  flex: 1;
  resize-mode: contain;
  margin-top: 20;
  margin-left: 20;
  margin-bottom: 20;
  margin-right: 20;
`;

const Logo = (props) => {
  return <Image source={require('../assets/images/logo.png')} {...props} style={{ width: null }} />;
};

export default Logo;