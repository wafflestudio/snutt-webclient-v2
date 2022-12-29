import { PropsWithChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IcLogo } from '@/components/icons/ic-logo';
import { BREAKPOINT } from '@/styles/constants';

type Props = { headerChildren?: ReactNode };

export const Layout = ({ children, headerChildren }: PropsWithChildren<Props>) => {
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
          <HeaderMiddle>{headerChildren}</HeaderMiddle>
          <HeaderRight>woohm402 님</HeaderRight>
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
  display: grid;
  grid-template-columns: 100px 1fr 100px;
  gap: 30px;
  align-items: center;

  max-width: ${BREAKPOINT}px;

  @media (max-width: ${BREAKPOINT}px) {
    max-width: 700px;
    grid-template-rows: 30px 1fr;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
`;

const HeaderRight = styled.div`
  grid-column: 3 / 4;
`;

const HeaderMiddle = styled.div`
  @media (max-width: ${BREAKPOINT}px) {
    max-width: 700px;
    grid-row: 2 / 3;
    grid-column: 1 / 4;
  }
`;

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
