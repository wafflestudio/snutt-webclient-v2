import { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IcLogo } from '@/components/icons/ic-logo';
import { BREAKPOINT } from '@/styles/constants';

export const Layout = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <div>
      <Header>
        <HeaderInner>
          <HeaderLeft>
            <HomeLink to="/">
              <IcLogo />
              <Title>SNUTT</Title>
            </HomeLink>
          </HeaderLeft>
        </HeaderInner>
      </Header>
      <Main>{children}</Main>
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

const HeaderInner = styled.div`
  margin: 0 auto;
  width: 100%;

  max-width: ${BREAKPOINT}px;

  @media (max-width: ${BREAKPOINT}px) {
    max-width: 700px;
  }
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

const Main = styled.main`
  max-width: ${BREAKPOINT}px;
  margin: 0 auto;
`;
