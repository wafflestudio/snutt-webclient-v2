import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { Dialog } from '@/components/dialog';
import { useTokenContext } from '@/contexts/tokenContext';
import { useYearSemester } from '@/hooks/useYearSemester';
import { timetableService } from '@/usecases/timetableService';
import { get } from '@/utils/object/get';
import { queryKey } from '@/utils/query-key-factory';

type Props = {
  isOpen: boolean;
  close: () => void;
  setCurrentTimetable: (id: string) => void;
};

export const MainCreateTimetableDialog = ({ isOpen, close, setCurrentTimetable }: Props) => {
  const [title, setTitle] = useState('');

  const {
    mutate: create,
    error,
    reset,
  } = useCreateTimetable((createdId?: string) => {
    if (createdId) setCurrentTimetable(createdId);
    onClose();
  });

  const errorMessage = error
    ? get(error, ['errcode']) === 12291
      ? '동일한 이름의 시간표가 존재합니다'
      : '오류가 발생했습니다'
    : null;

  const onClose = () => {
    setTitle('');
    close();
    reset();
  };

  return (
    <StyledDialog open={isOpen} onClose={onClose}>
      <Dialog.Title>시간표 제목을 입력하세요</Dialog.Title>
      <Dialog.Content>
        <Input data-testid="mt-create-timetable-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <ErrorMessage data-testid="mt-create-timetable-error">{errorMessage}</ErrorMessage>
      </Dialog.Content>
      <Dialog.Actions>
        <button data-testid="mt-create-timetable-cancel" onClick={onClose}>
          취소
        </button>
        <button data-testid="mt-create-timetable-confirm" disabled={!title} onClick={() => create(title)}>
          확인
        </button>
      </Dialog.Actions>
    </StyledDialog>
  );
};

const useCreateTimetable = (onSuccess: (createdId?: string) => void) => {
  const { token } = useTokenContext();
  const { year, semester } = useYearSemester();
  const queryClient = useQueryClient();

  return useMutation(
    (title: string) => {
      if (!token || !year || !semester) throw new Error();
      return timetableService.createTimetable(token, { year, semester, title });
    },
    {
      onSuccess: (data, title) => {
        queryClient.setQueryData(queryKey('tables', { token }), data);
        onSuccess(data.find((item) => item.year === year && item.semester === semester && item.title === title)?._id);
      },
    },
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

const ErrorMessage = styled.p`
  height: 20px;
  color: #ff0000;
  opacity: 0.8;
`;

const StyledDialog = styled(Dialog)`
  width: 300px;
`;
