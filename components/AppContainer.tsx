import * as React from 'react';

import {
  Body,
  Container,
  Content,
  Footer,
  FooterTab,
  Header,
  Left,
  Right,
  Title,
} from 'native-base';

type AppPageContainerProps = {
  children: React.ReactNode;
  footer?: React.ReactNode;
  heading: String;
  headingLeft?: React.ReactNode;
  headingRight?: React.ReactNode;
};

export const AppPageContainer = ({
  children,
  heading,
  footer,
  headingLeft,
  headingRight,
}: AppPageContainerProps) => {
  return (
    <Container>
      {heading && (
        <Header>
          {headingLeft ? <Left>{headingLeft}</Left> : <Left />}
          {heading && (
            <Body>
              <Title>{heading}</Title>
            </Body>
          )}
          {headingRight ? <Right>{headingRight}</Right> : <Right />}
        </Header>
      )}
      <Content padder>{children}</Content>
      {footer && (
        <Footer>
          <FooterTab>{footer}</FooterTab>
        </Footer>
      )}
    </Container>
  );
};

export default AppPageContainer;
