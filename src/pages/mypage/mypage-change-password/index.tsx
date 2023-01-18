import { useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/button';
import { useTokenContext } from '@/contexts/tokenContext';
import { authService } from '@/usecases/authService';
import { get } from '@/utils/object/get';

export const MypageChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const { saveToken } = useTokenContext();

  const onSubmit = async () => {
    if (newPassword !== newPasswordConfirm) {
      // TODO: ErrorDialog 로 마이그레이션
      alert('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    if (!authService.isValidPassword(newPassword)) {
      // TODO: ErrorDialog 로 마이그레이션
      alert('비밀번호는 영문자, 숫자가 조합된 6자리 이상 20자리 이하여야 합니다.');
      return;
    }

    try {
      const { token } = await authService.changePassword(currentPassword, newPassword);
      saveToken(token, false);
    } catch (err) {
      const errcode = get(err, ['errcode']);
      console.log(errcode);
    }
  };

  return (
    <PasswordWrapper>
      <PasswordInput
        data-testid="mypage-change-password-old"
        placeholder="현재 비밀번호"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <PasswordInput
        data-testid="mypage-change-password-new"
        placeholder="새 비밀번호"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <PasswordInput
        data-testid="mypage-change-password-confirm"
        placeholder="새 비밀번호 확인"
        value={newPasswordConfirm}
        onChange={(e) => setNewPasswordConfirm(e.target.value)}
      />
      <Button
        data-testid="mypage-change-password-submit"
        onClick={onSubmit}
        disabled={!newPassword || !newPasswordConfirm || !currentPassword}
      >
        변경하기
      </Button>
    </PasswordWrapper>
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
