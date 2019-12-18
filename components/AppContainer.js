import * as React from 'react';

import { Body, Container, Content, Footer, FooterTab, Header, Left, Right, Title } from 'native-base';

export const AppPageContainer = ({ children, heading, footer, headingLeft, headingRight }) => {
    return <Container>
        {heading && <Header>
            {headingLeft ? <Left>{headingLeft}</Left> : <Left />}
            {heading && <Body>
                <Title>
                    {heading}
                </Title>
            </Body>
            }
            {headingRight ? <Right>{headingRight}</Right> : <Right />}
        </Header>}
        <Content padder>
            <Body>
                {children}
            </Body>
        </Content>
        {footer &&
            <Footer>
                <FooterTab>
                    {footer}
                </FooterTab>
            </Footer>
        }
    </Container>;
};


export default AppPageContainer;;