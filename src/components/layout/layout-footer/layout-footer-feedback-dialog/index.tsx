import styled, { css } from 'styled-components';

import { Dialog } from '@/components/dialog';

type Props = { isOpen: boolean; onClose: () => void };

export const LayoutFooterFeedbackDialog = ({ onClose, isOpen }: Props) => {
  const close = () => {
    onClose();
  };
  return (
    <Dialog open={isOpen} onClose={close}>
      <Dialog.Title>피드백을 남겨주세요</Dialog.Title>
      <Content>
        <label>이메일</label>
        <Input type="email" placeholder="이메일" />
        <label>내용</label>
        <Textarea placeholder="버그, 개선사항 등등" />
      </Content>
      <Dialog.Actions>
        <button onClick={close}>취소</button>
        <button>제출</button>
      </Dialog.Actions>
    </Dialog>
  );
};

const Content = styled(Dialog.Content)`
  display: flex;
  flex-direction: column;
  width: 500px;
`;

const inputStyle = css`
  padding: 6px 12px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #babaca;
  margin-top: 10px;
  font-size: 14px;
`;

const Input = styled.input`
  margin-bottom: 30px;
  ${inputStyle}
`;

const Textarea = styled.textarea`
  height: 100px;
  ${inputStyle}
`;
