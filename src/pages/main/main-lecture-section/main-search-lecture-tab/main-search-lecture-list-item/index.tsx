import styled from 'styled-components';

import { BaseLecture } from '@/entities/lecture';

import { MainLectureListItem } from '../../main-lecture-listitem';

type Props = {
  timetableId?: string;
  lecture: BaseLecture;
  setPreviewLectureId: (id: string | null) => void;
};

export const MainSearchLectureListItem = ({ lecture, timetableId, setPreviewLectureId }: Props) => {
  const onClickAdd = () => {
    // TODO: implement
  };

  return (
    <LectureListItem
      data-testid="main-lecture-listitem"
      onMouseEnter={() => setPreviewLectureId(lecture._id)}
      onMouseLeave={() => setPreviewLectureId(null)}
    >
      <MainLectureListItem
        lecture={lecture}
        cta={
          <LectureButton disabled={!timetableId} $color="#0000ff" onClick={onClickAdd}>
            추가
          </LectureButton>
        }
      />
    </LectureListItem>
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
