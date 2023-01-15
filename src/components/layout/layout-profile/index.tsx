import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useTokenContext } from '@/contexts/tokenContext';
import { userService } from '@/usecases/userService';
import { queryKey } from '@/utils/query-key-factory';

export const LayoutProfile = () => {
  const { data: myInfo } = useMyInfo();

  const isLogged = !!useTokenContext().token;

  return isLogged ? (
    <ProfileText to="/mypage" data-testid="layout-my-info">
      {myInfo?.local_id}님
    </ProfileText>
  ) : (
    <ProfileText to="/login" data-testid="layout-my-info">
      로그인
    </ProfileText>
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
