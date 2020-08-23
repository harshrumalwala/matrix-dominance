import React, { ReactChild } from 'react';

import { Content, Card, Title } from './styles';

const Layout = ({ children }: { children: ReactChild }) => (
  <Content>
    <Title>Matrix Dominance</Title>
    <Card>{children}</Card>
  </Content>
);

export default Layout;
