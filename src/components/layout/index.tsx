import { useQuery } from '@tanstack/react-query';
import { PropsWithChildren, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

import { IcAlarm } from '@/components/icons/ic-alarm';
import { IcLogo } from '@/components/icons/ic-logo';
import { useTokenContext } from '@/contexts/tokenContext';
import { BREAKPOINT } from '@/styles/constants';
import { notificationService } from '@/usecases/notificationService';
import { userService } from '@/usecases/userService';
import { queryKey } from '@/utils/query-key-factory';

type Props = { headerChildren?: ReactNode };

export const Layout = ({ children, headerChildren }: PropsWithChildren<Props>) => {
  const { data: myInfo } = useMyInfo();
  useNotificationCount();
  useNotificationList();

  const isLogged = !!useTokenContext().token;

  return (
    <div>
      <Header>
        <HeaderInner>
          <HeaderLeft>
            <HomeLink to="/">
              <LogoIcon tabIndex={0} />
              <Title>SNUTT</Title>
            </HomeLink>
          </HeaderLeft>
          <HeaderMiddle>{headerChildren}</HeaderMiddle>
          <HeaderRight>
            <NotificationIcon />
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

const useNotificationCount = () => {
  const { token } = useTokenContext();

  return useQuery(
    queryKey('notifications/count', { token }),
    () => {
      if (!token) throw new Error('no token');
      return notificationService.getCount(token);
    },
    { enabled: !!token },
  );
};

const useNotificationList = () => {
  const { token } = useTokenContext();

  return useQuery(
    queryKey('notifications', { token }),
    () => {
      if (!token) throw new Error('no token');
      return notificationService.getList(token);
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

const crazyRotate = keyframes`
  0% {
    transform: rotate3d(1, 1, 1, 0deg);
  }
  50% {
    transform: rotate3d(1, 1, 1, 360deg);
  }
  100% {
    transform: rotate3d(1, 1, 1, 0deg);
  }
`;

const LogoIcon = styled(IcLogo)`
  &:focus {
    animation: ${crazyRotate} 1s linear infinite;
  }
`;

const HeaderInner = styled.div`
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 100px 1fr 140px;
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
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
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
  width: 80px;
  text-align: right;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    opacity: 1;
  }
`;

const shake = keyframes`
  0% {
    transform: rotate(0deg);
  }
  10% {
    transform: rotate(-30deg);
    opacity: 0.6;
  }
  30% {
    transform: rotate(30deg);
    opacity: 0.9;
  }
  50% {
    transform: rotate(-30deg);
  }
  70% {
    transform: rotate(30deg);
    opacity: 0.5;
  }
  100% {
    transform: rotate3d(1, 1, 1, 360deg);
  }
`;

const NotificationIcon = styled(IcAlarm)`
  opacity: 0.6;
  cursor: pointer;
  border-radius: 50%;

  &:hover {
    opacity: 1;
    animation: ${shake} 1s infinite linear;
  }
`;
