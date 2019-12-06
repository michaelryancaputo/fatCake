import * as React from 'react'

import styled from 'styled-components/native';

const ErrorContainer = styled.View`
  margin-left: 25;
`;

const ErrorLabel = styled.Text`
  color: red;
  font-weight: bold;
`;

const ErrorMessage = ({ errorValue }) => errorValue ? (
  <ErrorContainer>
    <ErrorLabel>{errorValue}</ErrorLabel>
  </ErrorContainer>
) : null;

export default ErrorMessage
