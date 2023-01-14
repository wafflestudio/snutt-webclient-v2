import styled from 'styled-components';

import { Dialog } from '../dialog';

type Props = { isOpen: boolean; onClose: () => void; message: string | null };

export const ErrorDialog = ({ isOpen, onClose, message }: Props) => {
  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <Dialog.Title>!</Dialog.Title>
      {message && <StyledContent data-testid="error-dialog-message">{message}</StyledContent>}
      <Dialog.Actions>
        <button onClick={onClose}>확인</button>
      </Dialog.Actions>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  width: 300px;
  height: 150px;
`;

const StyledContent = styled(Dialog.Content)`
  flex: 1;
`;