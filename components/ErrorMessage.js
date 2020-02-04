import * as React from 'react';

import styled from 'styled-components/native';

const ErrorLabel = styled.Text`
  color: red;
  font-weight: bold;
  margin-bottom: 20;
`;

const ErrorMessage = ({ errorValue }) => errorValue ? (
  <ErrorLabel>{errorValue}</ErrorLabel>
) : null;

export default ErrorMessage;
