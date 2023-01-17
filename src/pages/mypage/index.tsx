import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@/components/button';
import { Layout } from '@/components/layout';
import { useTokenContext } from '@/contexts/tokenContext';
import { userService } from '@/usecases/userService';
import { queryKey } from '@/utils/query-key-factory';

import { MypageChangePassword } from './mypage-change-password';
import { MypageCloseAccountDialog } from './mypage-close-account-dialog';

export const MyPage = () => {
  const [isCloseOpen, setCloseOpen] = useState(false);
  const { token, clearToken } = useTokenContext();
  const { data: myInfo } = useMyInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const logout = () => {
    clearToken();
    navigate('/');
  };

  return (
    <Layout>
      <Wrapper>
        <h1>내 정보</h1>
        <br />
        <p data-testid="mypage-my-id">
          SNUTT 아이디는{' '}
          {myInfo && (
            <>
              <strong>{myInfo.local_id}</strong>입니다.
            </>
          )}
        </p>
        <br />
        <Row>
          <RowLabel>비밀번호 관리</RowLabel>
          <MypageChangePassword />
        </Row>
        <br />
        <br />
        <Row>
          <RowLabel>페이스북</RowLabel>
          <Button variant="outlined" color="blue">
            페이스북 연동 해지하기
          </Button>
        </Row>
        <Row>
          <RowLabel>로그아웃</RowLabel>
          <Button variant="outlined" onClick={logout} color="black">
            로그아웃하기
          </Button>
        </Row>
        <Row>
          <RowLabel>회원 탈퇴</RowLabel>
          <Button variant="outlined" data-testid="mypage-close-account" color="red" onClick={() => setCloseOpen(true)}>
            탈퇴하기
          </Button>
        </Row>
      </Wrapper>
      <MypageCloseAccountDialog isOpen={isCloseOpen} onClose={() => setCloseOpen(false)} />
    </Layout>
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

const Wrapper = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 30px 20px 0;
`;

const Row = styled.div`
  min-height: 40px;
  display: flex;
  margin-bottom: 15px;
`;

const RowLabel = styled.div`
  width: 120px;
  min-width: 120px;
  opacity: 0.2;
  font-weight: 700;
  line-height: 40px;
`;
