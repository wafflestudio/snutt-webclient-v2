import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Layout } from '@/components/layout';
import { useTokenContext } from '@/contexts/tokenContext';
import { authService } from '@/usecases/authService';
import { getErrorMessage } from '@/utils/errorTable';

export const Login = () => {
  const navigate = useNavigate();
  const { saveToken } = useTokenContext();

  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [keepSignIn, setKeepSignIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSignIn = async () => {
    setErrorMessage('');

    try {
      const res = await authService.signIn({ type: 'LOCAL', id, password });

      saveToken(res.token, keepSignIn);
      navigate('/');
    } catch (error: any) {
      console.log(error);

      const errorCode = error?.errcode;

      setErrorMessage(getErrorMessage(errorCode));
    }
  };

  return (
    <Layout>
      <LoginWrapper>
        <Header>시작하기</Header>
        <Input placeholder="아이디" value={id} onChange={(e) => setId(e.target.value)} data-testid="id-input" />
        <Input
          placeholder="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSignIn()}
          data-testid="password-input"
        />
        <CheckboxWrapper>
          <Checkbox id="keepSignIn" checked={keepSignIn} onChange={(e) => setKeepSignIn(e.target.checked)} />
          <Label htmlFor="keepSignIn">로그인 유지</Label>
        </CheckboxWrapper>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <SignInButton disabled={!(id && password)} onClick={handleSignIn} data-testid="local-signin-button">
          로그인
        </SignInButton>
      </LoginWrapper>
    </Layout>
  );
};

const LoginWrapper = styled.section`
  width: 300px;
  margin: 120px auto;

  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  margin: 20px 0 10px;

  font-size: 26px;
  font-weight: 700;
`;

const Input = styled.input`
  height: 40px;
  margin: 10px 0 10px;

  border: 0;
  border-bottom: 1px solid #ebeef2;

  background-color: transparent;
  font-size: 14px;

  &:focus {
    outline: none;
    box-shadow: none;
    border-color: #b7c3ce;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.2);
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  margin-top: 20px;
`;

// 정확한 색상  파악 필요
const Label = styled.label`
  font-size: 14px;
  font-weight: 400;
  color: #333;
  opacity: 0.7;
  cursor: pointer;

  &:hover {
    color: #1bd0c9;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-top: 0;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  color: #d13d37;
  text-align: center;
  margin: 20px 0;
`;

const Button = styled.button`
  border-radius: 21px;
  border: none;
  width: 100%;
  margin-top: 10px;
  height: 34px;
  font-size: 13px;
  background-color: transparent;
  opacity: 1;
  cursor: pointer;
`;

const SignInButton = styled(Button)`
  color: #fff;
  background-color: #1bd0c9;
`;
