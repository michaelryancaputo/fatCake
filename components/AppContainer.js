import * as React from 'react';

import { Body, Container, Content, Header, Left, Right, Title } from 'native-base';

export const AppPageContainer = ({ children, heading }) => {
    return <Container>
        {heading && <Header>
            <Left />
            <Body>
                {heading && <Title>
                    {heading}
                </Title>}
            </Body>
            <Right />
        </Header>}
        <Content padder>
            {children}
        </Content>
    </Container>;
};


export default AppPageContainer;