import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Logo } from './icons/logo';

export const Layout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div>
      <Header>
        <HeaderLeft>
          <HomeLink to="/">
            <Logo />
            <Title>SNUTT</Title>
          </HomeLink>
        </HeaderLeft>
      </Header>
      <main>{children}</main>
    </div>
  );
};

const Header = styled.header`
  height: 120px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const HeaderLeft = styled.div``;

const HomeLink = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-left: 8px;
  margin-right: 10px;
  color: black;
  text-size-adjust: 100%;
`;
