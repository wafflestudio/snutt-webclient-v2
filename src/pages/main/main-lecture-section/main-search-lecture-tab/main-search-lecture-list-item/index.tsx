import { useMutation, useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';

import { useTokenContext } from '@/contexts/tokenContext';
import { BaseLecture } from '@/entities/lecture';
import { timetableService } from '@/usecases/timetableService';
import { get } from '@/utils/object/get';
import { queryKey } from '@/utils/query-key-factory';

import { MainLectureListItem } from '../../main-lecture-listitem';

type Props = {
  timetableId?: string;
  lecture: BaseLecture;
  setPreviewLectureId: (id: string | null) => void;
};

export const MainSearchLectureListItem = ({ lecture, timetableId, setPreviewLectureId }: Props) => {
  const { mutate } = useAddLecture(timetableId, lecture._id);

  return (
    <LectureListItem
      data-testid="main-lecture-listitem"
      onMouseEnter={() => setPreviewLectureId(lecture._id)}
      onMouseLeave={() => setPreviewLectureId(null)}
    >
      <MainLectureListItem
        lecture={lecture}
        cta={
          <LectureButton disabled={!timetableId} $color="#0000ff" onClick={() => mutate()}>
            추가
          </LectureButton>
        }
      />
    </LectureListItem>
  );
};

const useAddLecture = (id?: string, lectureId?: string) => {
  const { token } = useTokenContext();
  const queryClient = useQueryClient();
  return useMutation(
    () => {
      if (!token) throw new Error('no token');
      if (!id) throw new Error('no id');
      if (!lectureId) throw new Error('no lectureId');

      return timetableService.addLecture(token, { id, lecture_id: lectureId });
    },
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey(`tables/${id}`, { token })),
      onError: (err) => {
        const errcode = get(err, ['errcode']);
        const message = (() => {
          if (errcode === 12292) return '이미 해당 강의가 존재합니다.';
          if (errcode === 12300) return '강의 시간이 서로 겹칩니다.';
          // TODO: sentry
          return '오류가 발생했습니다.';
        })();

        alert(message);
      },
    },
  );
};

const LectureListItem = styled.li`
  list-style-type: none;
  transition: background-color 0.1s;
`;

const LectureButton = styled.button<{ $color?: `#${string}` }>`
  border: none;
  background-color: transparent;
  color: ${({ $color = '#000000' }) => $color};
  opacity: 0.8;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 2px;
  text-decoration: none;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.08);
  }

  &:disabled {
    color: #888;
    cursor: not-allowed;
  }
`;
