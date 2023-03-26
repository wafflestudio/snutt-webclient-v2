import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { useTokenContext } from '@/contexts/tokenContext';
import type { BaseLecture } from '@/entities/lecture';
import { timetableService } from '@/services';
import { queryKey } from '@/utils/query-key-factory';

type Props = {
  isOpen: boolean;
  close: () => void;
  timetableId?: string;
  lecture: BaseLecture;
};

export const MainCurrentLectureDeleteDialog = ({ isOpen, close, timetableId, lecture }: Props) => {
  const { mutate } = useDeleteLecture(timetableId, lecture._id);

  return (
    <StyledDialog open={isOpen} onClose={() => close()}>
      <Dialog.Title>{lecture.course_title} 강의를 삭제하시겠습니까?</Dialog.Title>

      <Dialog.Actions>
        {isOpen && (
          <Button
            color="red"
            size="small"
            disabled={!isOpen}
            aria-disabled={!isOpen}
            data-testid="ml-lecture-delete-submit"
            onClick={() => mutate(undefined, { onSuccess: close })}
          >
            확인
          </Button>
        )}
      </Dialog.Actions>
    </StyledDialog>
  );
};

const useDeleteLecture = (id?: string, lecture_id?: string) => {
  const { token } = useTokenContext();
  const queryClient = useQueryClient();

  return useMutation(
    () => {
      if (!token) throw new Error('no token');
      if (!id) throw new Error('no tt id');
      if (!lecture_id) throw new Error('no lecture_id');

      return timetableService.deleteLecture(token, { id, lecture_id });
    },
    { onSuccess: () => queryClient.invalidateQueries(queryKey(`tables/${id}`, { token })) },
  );
};

const StyledDialog = styled(Dialog)`
  height: 100px;
`;
