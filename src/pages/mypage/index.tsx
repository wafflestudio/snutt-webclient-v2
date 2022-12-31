import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Layout } from '@/components/layout';
import { useTokenContext } from '@/contexts/tokenContext';
import { userService } from '@/usecases/userService';
import { queryKey } from '@/utils/query-key-factory';

export const MyPage = () => {
  const { token } = useTokenContext();
  const { data: myInfo } = useMyInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

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
          <PasswordWrapper>
            <PasswordInput placeholder="현재 비밀번호" />
            <PasswordInput placeholder="새 비밀번호" />
            <PasswordInput placeholder="새 비밀번호 확인" />
            <Button style={{ width: 100 }} $color="#1bd0c9">
              변경하기
            </Button>
          </PasswordWrapper>
        </Row>
        <br />
        <br />
        <Row>
          <RowLabel>페이스북</RowLabel>
          <Button $color="#0000ff">페이스북 연동 해지하기</Button>
        </Row>
        <Row>
          <RowLabel>로그아웃</RowLabel>
          <Button $color="#000000">로그아웃하기</Button>
        </Row>
        <Row>
          <RowLabel>회원 탈퇴</RowLabel>
          <Button $color="#ff0000">탈퇴하기</Button>
        </Row>
      </Wrapper>
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

const Button = styled.button<{ $color: `#${string}` }>`
  color: ${({ $color }) => $color};
  border-color: ${({ $color }) => $color};
  border-width: 1px;
  padding: 0 24px;

  height: 40px;
  border-radius: 20px;
  font-size: 14px;
  opacity: 0.6;
  transition: 0.2s all;
  cursor: pointer;

  &:hover {
    opacity: 1;
    background-color: ${({ $color }) => `${$color}10`};
  }
`;

const PasswordWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: end;
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

const PasswordInput = styled.input.attrs({ type: 'password' })`
  height: 40px;
  margin-bottom: 10px;
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid #ebeef2;
  font-size: 14px;
  width: 100%;
`;
