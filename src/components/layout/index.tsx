import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { IcLogo } from '@/components/icons/ic-logo';
import { useTokenContext } from '@/contexts/tokenContext';
import { BREAKPOINT } from '@/styles/constants';
import { userService } from '@/usecases/userService';
import { queryKey } from '@/utils/query-key-factory';

type Props = { headerChildren?: ReactNode };

export const Layout = ({ children, headerChildren }: PropsWithChildren<Props>) => {
  const { data: myInfo } = useMyInfo();

  const isLogged = !!useTokenContext().token;

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
          <HeaderRight>
            {isLogged ? (
              <ProfileText to="/mypage" data-testid="layout-my-info">
                {myInfo?.local_id}님
              </ProfileText>
            ) : (
              <ProfileText to="/login" data-testid="layout-my-info">
                로그인
              </ProfileText>
            )}
          </HeaderRight>
        </HeaderInner>
      </Header>
      <Main>{children}</Main>
    </div>
  );
};

const useMyInfo = () => {
  const { token } = useTokenContext();

  return useQuery(
    queryKey('user/info', { token }),
    () => {
      if (!token) throw new Error('no token');
      return userService.getUserInfo(token);
    },
    { enabled: !!token },
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

const ProfileText = styled(Link)`
  text-decoration: none;
  color: black;
  opacity: 0.8;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;
