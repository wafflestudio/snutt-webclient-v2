import { Dialog } from '@/components/dialog';
import { Lecture } from '@/entities/lecture';

type Props = {
  open: boolean;
  onClose: () => void;
  lecture?: Lecture;
};

export const MainLectureEditDialog = ({ open, onClose, lecture }: Props) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Dialog.Title>강의 편집</Dialog.Title>
      {lecture && (
        <Dialog.Content data-testid="main-lecture-edit-dialog-content">{lecture.course_title}</Dialog.Content>
      )}
      <Dialog.Actions>
        <button>삭제</button>
        <button>취소</button>
        <button>저장하기</button>
      </Dialog.Actions>
    </Dialog>
  );
};
