import * as React from 'react';

import styled from 'styled-components/native';

const HeaderOuter = styled.View`
  background-color: #f7f5eee8;
  shadow-color: #000000;
  padding-top: 20;
  border-top-left-radius: 20;
  border-top-right-radius: 20;
`;

const PanelContainer = styled.View`
  align-items: center;
`;

const PanelHandle = styled.View`
  width: 40;
  height: 8;
  border-radius: 4;
  background-color: #ccc;
  margin-bottom: 10;
`;


const PanelHandleHeader = () => (
  <HeaderOuter>
    <PanelContainer>
      <PanelHandle />
    </PanelContainer>
  </HeaderOuter>
);

export default PanelHandleHeader;