import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import styled from 'styled-components';

import { Dialog } from '@/components/dialog';
import { Color } from '@/entities/color';
import { Day } from '@/entities/day';
import { Lecture } from '@/entities/lecture';
import { colorService } from '@/usecases/colorService';
import { lectureService } from '@/usecases/lectureService';
import { ArrayElement } from '@/utils/array-element';

import { MainLectureEditDialogColor } from './main-lecture-edit-dialog-color';
import { MainLectureEditDialogTime } from './main-lecture-edit-dialog-time';

type Editable = {
  course_title: Lecture['course_title'];
  instructor: Lecture['instructor'];
  credit: Lecture['credit'];
  remark: Lecture['remark'];
  color: Color;
  class_time_json: (
    | ArrayElement<Lecture['class_time_json']>
    | { day: Day; len: number; place: string; start: number }
  )[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  lecture?: Lecture;
};

export const MainLectureEditDialog = ({ open, onClose, lecture }: Props) => {
  const [draft, setDraft] = useState<Partial<Editable>>({});

  const { data: colorList } = useColorList();

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
                onChangeColor={(c) => setDraft({ ...draft, color: c })}
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
      <Dialog.Actions>
        <button>삭제</button>
        <button data-testid="main-lecture-edit-dialog-cancel" onClick={close}>
          취소
        </button>
        <button>저장하기</button>
      </Dialog.Actions>
    </EditDialog>
  );
};

const useColorList = () => useQuery(['colors'], () => colorService.getColorList(), { staleTime: Infinity });

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
