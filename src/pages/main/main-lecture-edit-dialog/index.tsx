import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/button';
import { Dialog } from '@/components/dialog';
import { ErrorDialog } from '@/components/error-dialog';
import { useTokenContext } from '@/contexts/tokenContext';
import { Color } from '@/entities/color';
import { Day } from '@/entities/day';
import { Lecture } from '@/entities/lecture';
import { useErrorDialog } from '@/hooks/useErrorDialog';
import { colorService } from '@/usecases/colorService';
import { lectureService } from '@/usecases/lectureService';
import { timeMaskService } from '@/usecases/timeMaskService';
import { timetableService } from '@/usecases/timetableService';
import { ArrayElement } from '@/utils/array-element';
import { queryKey } from '@/utils/query-key-factory';

import { MainLectureDeleteDialog } from './main-lecture-delete-dialog';
import { MainLectureEditDialogColor } from './main-lecture-edit-dialog-color';
import { MainLectureEditDialogTime } from './main-lecture-edit-dialog-time';

type Editable = {
  course_title: Lecture['course_title'];
  instructor: Lecture['instructor'];
  credit: Lecture['credit'];
  remark: Lecture['remark'];
  color: Color;
  colorIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // 0이면 커스텀 색
  class_time_json: (
    | ArrayElement<Lecture['class_time_json']>
    | { day: Day; len: number; place: string; start: number }
  )[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  lecture?: Lecture;
  timetableId?: string;
};

export const MainLectureEditDialog = ({ open, onClose, timetableId, lecture }: Props) => {
  const [draft, setDraft] = useState<Partial<Editable>>({});
  const { open: openErrorDialog, isOpen: isOpenErrorDialog, onClose: onCloseErrorDialog, message } = useErrorDialog();
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const { data: colorList } = useColorList();

  const { mutate } = useUpdateLecture(timetableId, lecture?._id);

  const submit = () => {
    if (!lecture) return;

    const color =
      draft.colorIndex === 0
        ? { colorIndex: 0 as const, color: draft.color as Color }
        : draft.colorIndex
        ? { colorIndex: draft.colorIndex }
        : lecture.colorIndex === 0
        ? { colorIndex: 0 as const, color: lecture.color as Color }
        : { colorIndex: lecture.colorIndex };

    mutate(
      {
        class_time_json: draft.class_time_json ?? lecture.class_time_json,
        course_title: draft.course_title ?? lecture.course_title,
        credit: draft.credit ?? lecture.credit,
        instructor: draft.instructor ?? lecture.instructor,
        remark: draft.remark ?? lecture.remark,
        class_time_mask: timeMaskService.getLectureFullTimeBitMask(draft.class_time_json ?? lecture.class_time_json),
        ...color,
      },
      {
        onSuccess: close,
        onError: (err) => {
          const message =
            err && typeof err === 'object' && 'errcode' in err && err.errcode === 12300
              ? '강의 시간이 서로 겹칩니다.'
              : '오류가 발생했습니다.';
          openErrorDialog(message);
        },
      },
    );
  };

  const close = () => {
    setDraft({});
    onClose();
  };

  return (
    <EditDialog open={open} onClose={close}>
      <Dialog.Title>강의 편집</Dialog.Title>
      {lecture && (
        <EditDialogContent data-testid="main-lecture-edit-dialog-content">
          <Row>
            <RowLabel>강의명</RowLabel>
            <Input
              data-testid="main-lecture-edit-dialog-title"
              value={draft.course_title ?? lecture.course_title}
              onChange={(e) => setDraft({ ...draft, course_title: e.target.value })}
            />
          </Row>
          <Row>
            <RowLabel>선생님</RowLabel>
            <Input
              data-testid="main-lecture-edit-dialog-instructor"
              value={draft.instructor ?? lecture.instructor}
              onChange={(e) => setDraft({ ...draft, instructor: e.target.value })}
            />
          </Row>
          <Row>
            <RowLabel>색</RowLabel>
            {colorList && (
              <MainLectureEditDialogColor
                colorList={colorList}
                currentColor={draft.color ?? lectureService.getLectureColor(lecture, colorList)}
                onChangeColor={(i, c) => setDraft({ ...draft, colorIndex: i, color: c })}
              />
            )}
          </Row>
          <Row>
            <RowLabel>학점</RowLabel>
            <Input
              value={draft.credit ?? lecture.credit}
              onChange={(e) => setDraft({ ...draft, credit: Number(e.target.value) })}
              type="number"
            />
          </Row>
          <Row>
            <RowLabel>비고</RowLabel>
            <Input
              data-testid="main-lecture-edit-dialog-remark"
              value={draft.remark ?? lecture.remark}
              onChange={(e) => setDraft({ ...draft, remark: e.target.value })}
            />
          </Row>
          <Row>
            <RowLabel>시간</RowLabel>
            <MainLectureEditDialogTime
              lectureTime={draft.class_time_json ?? lecture.class_time_json}
              onChangeLectureTime={(e) => setDraft({ ...draft, class_time_json: e })}
            />
          </Row>
        </EditDialogContent>
      )}
      <Actions>
        <Button
          data-testid="main-lecture-edit-dialog-delete"
          color="red"
          size="small"
          onClick={() => setDeleteDialogOpen(true)}
        >
          삭제
        </Button>
        <ActionsRight>
          <Button color="gray" size="small" data-testid="main-lecture-edit-dialog-cancel" onClick={close}>
            취소
          </Button>
          <Button size="small" data-testid="main-lecture-edit-dialog-submit" onClick={submit}>
            저장하기
          </Button>
        </ActionsRight>
      </Actions>
      <ErrorDialog isOpen={isOpenErrorDialog} onClose={onCloseErrorDialog} message={message} />
      <MainLectureDeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        timetableId={timetableId}
        lectureId={lecture?._id}
        closeEditModal={close}
      />
    </EditDialog>
  );
};

const useColorList = () => useQuery(['colors'], () => colorService.getColorList(), { staleTime: Infinity });

const useUpdateLecture = (id?: string, lectureId?: string) => {
  const { token } = useTokenContext();
  const queryClient = useQueryClient();

  return useMutation(
    (body: Parameters<typeof timetableService.updateLecture>[2]) => {
      if (!token) throw new Error('no token');
      if (!id) throw new Error('no id');
      if (!lectureId) throw new Error('no lectureId');
      return timetableService.updateLecture(token, { id, lecture_id: lectureId }, body);
    },
    { onSuccess: () => queryClient.invalidateQueries(queryKey(`tables/${id}`, { token })) },
  );
};

const EditDialog = styled(Dialog)`
  width: 550px;
  min-height: 550px;
  padding: 21px 35px;
  display: flex;
  flex-direction: column;
`;

const EditDialogContent = styled(Dialog.Content)`
  border-top: 2px solid #d5dbe0;
  border-bottom: 2px solid #d5dbe0;
  flex: 1;
`;

const Row = styled.div`
  display: flex;
  min-height: 60px;
  align-items: center;
`;

const RowLabel = styled.div`
  width: 100px;
  min-width: 100px;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  outline: none;
  border: none;
  border-bottom: 2px solid #ddd;
`;

const Actions = styled(Dialog.Actions)`
  justify-content: space-between;
`;

const ActionsRight = styled.div`
  display: flex;
  gap: 4px;
`;
