import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/button';
import { ErrorDialog } from '@/components/error-dialog';
import { useTokenContext } from '@/contexts/tokenContext';
import { useErrorDialog } from '@/hooks/useErrorDialog';
import { authService, errorService, userService } from '@/services';
import { get } from '@/utils/object/get';
import { queryKey } from '@/utils/query-key-factory';

export const MypageRegisterId = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const { isOpen, message, onClose, open } = useErrorDialog();

  const { mutate } = useAddIdPassword();

  const onSubmit = async () => {
    if (password !== passwordConfirm) {
      open('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!authService.isValidPassword(password)) {
      open('비밀번호는 영문자, 숫자가 조합된 6자리 이상 20자리 이하여야 합니다.');
      return;
    }

    mutate({ id, password }, { onError: (err) => open(errorService.getErrorMessage(get(err, ['errcode']) as number)) });
  };

  return (
    <PasswordWrapper>
      <PasswordInput
        data-testid="mypage-add-id-password-id"
        placeholder="아이디"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <PasswordInput
        data-testid="mypage-add-id-password-password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordInput
        data-testid="mypage-add-id-password-password-confirm"
        placeholder="비밀번호 확인"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      />
      <Button
        data-testid="mypage-add-id-password-submit"
        onClick={onSubmit}
        disabled={!id || !password || !passwordConfirm}
      >
        만들기
      </Button>
      <ErrorDialog isOpen={isOpen} onClose={onClose} message={message} />
    </PasswordWrapper>
  );
};

const useAddIdPassword = () => {
  const { token, saveToken } = useTokenContext();
  const queryClient = useQueryClient();

  return useMutation(
    (body: { id: string; password: string }) => {
      if (!token) throw new Error('no token');
      return userService.addIdPassword(token, body);
    },
    {
      onSuccess: ({ token }) => {
        saveToken(token, false);
        return queryClient.invalidateQueries(queryKey('user/info'));
      },
    },
  );
};

const PasswordInput = styled.input.attrs({ type: 'password' })`
  height: 40px;
  margin-bottom: 10px;
  background-color: transparent;
  border: none;
  outline: none;
  border-bottom: 1px solid #ebeef2;
  font-size: 14px;
  width: 100%;
  transition: 0.2s border-bottom;

  &:focus {
    border-bottom: 1px solid #bfc1c5;
  }
`;

const PasswordWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: end;
`;
