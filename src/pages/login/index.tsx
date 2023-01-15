import { useState } from 'react';
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';
import FBLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { Button } from '@/components/button';
import { Layout } from '@/components/layout';
import { useTokenContext } from '@/contexts/tokenContext';
import { CoreServerError } from '@/entities/error';
import { authService } from '@/usecases/authService';
import { envService } from '@/usecases/envService';
import { errorService } from '@/usecases/errorService';

import { LoginFindIdDialog } from './login-find-id-dialog';
import { LoginResetPasswordDialog } from './login-reset-password-dialog';

export const Login = () => {
  const navigate = useNavigate();
  const { saveToken } = useTokenContext();

  const [findIdDialogOpen, setFindIdDialogOpen] = useState(false);
  const [resetPasswordDialogOpen, setResetPasswordDialogOpen] = useState(false);

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
    } catch (error) {
      const errorCode = (error as CoreServerError).errcode;

      setErrorMessage(errorService.getErrorMessage(errorCode));
    }
  };

  const handleFacebookSignIn = async (userInfo: ReactFacebookLoginInfo) => {
    setErrorMessage('');

    try {
      const res = await authService.signIn({ type: 'FACEBOOK', fb_id: userInfo.id, fb_token: userInfo.accessToken });

      saveToken(res.token, keepSignIn);
      navigate('/');
    } catch (error) {
      const errorCode = (error as CoreServerError).errcode;

      setErrorMessage(errorService.getErrorMessage(errorCode));
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
        <ErrorMessage data-testid="error-message">{errorMessage}</ErrorMessage>
        <LocalSignInButton disabled={!(id && password)} onClick={handleSignIn} data-testid="local-signin-button">
          로그인
        </LocalSignInButton>
        <FBLogin
          appId={envService.getFacebookAppId()}
          autoLoad
          callback={handleFacebookSignIn}
          onFailure={({ status }: ReactFacebookFailureResponse) => setErrorMessage(status || '')}
          render={({ onClick }) => <FBSignInButton onClick={onClick}>facebook으로 로그인</FBSignInButton>}
        />
        <EtcWrapper>
          <FindWrapper>
            <OtherButton data-testid="login-find-id" onClick={() => setFindIdDialogOpen(true)}>
              아이디 찾기
            </OtherButton>
            <Divider />
            <OtherButton data-testid="login-reset-password" onClick={() => setResetPasswordDialogOpen(true)}>
              비밀번호 재설정
            </OtherButton>
          </FindWrapper>
          <OtherLink data-testid="login-signup-link" to="/signup">
            회원가입
          </OtherLink>
        </EtcWrapper>
      </LoginWrapper>
      <LoginFindIdDialog open={findIdDialogOpen} onClose={() => setFindIdDialogOpen(false)} />
      <LoginResetPasswordDialog open={resetPasswordDialogOpen} onClose={() => setResetPasswordDialogOpen(false)} />
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

const otherStyle = css`
  font-size: 14px;
  text-decoration: none;
  color: #000;
  opacity: 0.6;
  transition: 0.1s opacity;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
  }
`;

const OtherLink = styled(Link)`
  ${otherStyle};
`;

const OtherButton = styled.button`
  padding: 0;
  ${otherStyle};
  background: transparent;
  border: none;
  cursor: pointer;
`;

const EtcWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
`;

const FindWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

const Divider = styled.div`
  width: 1px;
  height: 12px;
  background-color: #888888;
`;

const LocalSignInButton = styled(Button)`
  color: #fff;
  background-color: #1bd0c9;
`;

const FBSignInButton = styled(Button)`
  color: #3c5dd4;
  border: 1px solid #3c5dd4;

  &:hover {
    background-color: rgba(60, 93, 212, 0.1);
  }
`;
