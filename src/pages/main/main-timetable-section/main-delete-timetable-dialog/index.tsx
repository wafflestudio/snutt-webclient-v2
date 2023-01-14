import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { Dialog } from '@/components/dialog';
import { useTokenContext } from '@/contexts/tokenContext';
import { FullTimetable } from '@/entities/timetable';
import { timetableService } from '@/usecases/timetableService';
import { queryKey } from '@/utils/query-key-factory';

type Props = {
  isOpen: boolean;
  close: () => void;
  onDelete: () => void;
  timetable?: FullTimetable;
};

export const MainDeleteTimetableDialog = ({ isOpen, close, onDelete, timetable }: Props) => {
  const [title, setTitle] = useState('');

  const { mutate } = useDeleteTimetable(timetable?._id);

  const isDeletable = title === timetable?.title;

  const onClose = () => {
    setTitle('');
    close();
  };

  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <Dialog.Title>시간표를 삭제하시겠습니까?</Dialog.Title>

      <Dialog.Content>
        <Text>삭제하시려면 시간표 이름을 아래에 입력해 주세요.</Text>
        <Input
          data-testid="mt-tt-delete-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={timetable?.title}
        />
      </Dialog.Content>

      <Dialog.Actions>
        <button
          data-testid="mt-tt-delete-submit"
          onClick={() => mutate(undefined, { onSuccess: onDelete })}
          disabled={!isDeletable}
        >
          확인
        </button>
      </Dialog.Actions>
    </StyledDialog>
  );
};

const useDeleteTimetable = (id?: string) => {
  const { token } = useTokenContext();
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      if (!token) throw new Error('no token');
      if (!id) throw new Error('no tt');
      return timetableService.deleteTimetable(token, id);
    },
    { onSuccess: () => queryClient.invalidateQueries(queryKey('tables', { token })) },
  );
};

const Input = styled.input`
  width: 100%;
  height: 40px;
  outline: none;
  padding-inline: 12px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 1px;
`;

const StyledDialog = styled(Dialog)`
  width: 300px;
`;

const Text = styled(Dialog.ContentText)`
  font-size: 12px;
`;
