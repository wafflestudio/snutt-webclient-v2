import styled from 'styled-components';

import { Dialog } from '@/components/dialog';

type Props = { open: boolean; onClose: () => void };

export const LayoutSearchbarFilterTimeSelectDialog = ({ open, onClose }: Props) => {
  return (
    <StyledDialog open={open} onClose={onClose}>
      <StyledDialog.Title>검색하고 싶은 시간들을 드래그하세요</StyledDialog.Title>
      <StyledDialog.Content></StyledDialog.Content>
      <StyledDialog.Actions>
        <button data-testid="layout-searchbar-filter-time-select-dialog-cancel" onClick={onClose}>
          취소
        </button>
        <button>확인</button>
      </StyledDialog.Actions>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  max-width: 600px;
`;
