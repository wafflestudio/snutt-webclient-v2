import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { authService } from '@/usecases/authService';

type Props = { open: boolean; onClose: () => void };

export const LoginResetPasswordDialog = ({ open, onClose }: Props) => {
  const [id, setId] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const checkEmailMutation = useCheckEmail();
  const sendCodeMutation = useSendCode();
  const resetPasswordMutation = useResetPassword();

  const close = () => {
    onClose();
    setId('');
    setCode('');
    setPassword('');
    checkEmailMutation.reset();
    sendCodeMutation.reset();
    resetPasswordMutation.reset();
  };

  return (
    <Dialog open={open} onClose={close}>
      <Dialog.Title>아이디 찾기</Dialog.Title>
      <Content>
        <Info>아래에 이메일을 입력해 주세요.</Info>
        <EmailInput data-testid="login-find-id-email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </Content>
      <Dialog.Actions>
        <Button data-testid="login-find-id-cancel" size="small" color="gray" onClick={close}>
          닫기
        </Button>
        <Button data-testid="login-find-id-submit" size="small">
          다음
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};

const useCheckEmail = () => {
  return useMutation((body: { user_id: string }) => authService.findIdByEmail(body));
};

const useSendCode = () => {
  return useMutation((body: { user_id: string }) => authService.findIdByEmail(body));
};

const useResetPassword = () => {
  return useMutation((body: { user_id: string }) => authService.findIdByEmail(body));
};

const Content = styled(Dialog.Content)`
  width: 300px;
`;

const Info = styled.p`
  margin: 0 0 8px;
  font-size: 14px;
`;

const EmailInput = styled.input`
  width: 100%;
  padding: 8px 12px;
`;

const Result = styled.p<{ $status: 'success' | 'error' | 'idle' | 'loading' }>`
  margin: 8px 0 0;
  height: 20px;
  font-size: 14px;
  color: ${({ $status }) => ({ success: '#160bdf', error: '#600303', idle: '#000', loading: '#000' }[$status])};
`;
