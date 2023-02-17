import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { Color } from '@/entities/color';
import { AddedLectureTime, Lecture } from '@/entities/lecture';
import { colorService } from '@/usecases/colorService';
import { lectureService } from '@/usecases/lectureService';
import { ArrayElement } from '@/utils/array-element';

import { MainLectureEditFormColor } from './main-lecture-edit-form-color';
import { MainLectureEditFormTime } from './main-lecture-edit-form-time';

export type LectureEditForm = {
  course_title: Lecture['course_title'];
  instructor: Lecture['instructor'];
  credit: Lecture['credit'];
  remark: Lecture['remark'];
  color: Color;
  colorIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9; // 0이면 커스텀 색
  class_time_json: (ArrayElement<Lecture['class_time_json']> | AddedLectureTime)[];
};

type Props = {
  draft: Partial<LectureEditForm>;
  setDraft: (draft: Partial<LectureEditForm>) => void;
  defaultState?: Partial<Lecture>;
};

export const MainLectureEditForm = ({ draft, defaultState = {}, setDraft }: Props) => {
  const { data: colorList } = useColorList();

  const currentColor =
    draft.color ??
    (defaultState.color && colorList && defaultState.colorIndex !== undefined
      ? lectureService.getLectureColor(defaultState as Pick<Lecture, 'color' | 'colorIndex'>, colorList)
      : undefined);

  return (
    <Wrapper>
      <Row>
        <RowLabel>강의명</RowLabel>
        <Input
          data-testid="main-lecture-edit-form-title"
          value={draft.course_title ?? defaultState.course_title ?? ''}
          onChange={(e) => setDraft({ ...draft, course_title: e.target.value })}
        />
      </Row>
      <Row>
        <RowLabel>선생님</RowLabel>
        <Input
          data-testid="main-lecture-edit-form-instructor"
          value={draft.instructor ?? defaultState.instructor ?? ''}
          onChange={(e) => setDraft({ ...draft, instructor: e.target.value })}
        />
      </Row>
      <Row>
        <RowLabel>색</RowLabel>
        {colorList && (
          <MainLectureEditFormColor
            colorList={colorList}
            currentColor={currentColor}
            onChangeColor={(i, c) => setDraft({ ...draft, colorIndex: i, color: c })}
          />
        )}
      </Row>
      <Row>
        <RowLabel>학점</RowLabel>
        <Input
          data-testid="main-lecture-edit-form-credit"
          value={`${draft.credit ?? defaultState.credit ?? ''}`}
          onChange={(e) => setDraft({ ...draft, credit: Number(e.target.value.replace('.', '')) })}
          type="number"
          min="0"
        />
      </Row>
      <Row>
        <RowLabel>비고</RowLabel>
        <Input
          data-testid="main-lecture-edit-form-remark"
          value={draft.remark ?? defaultState.remark ?? ''}
          onChange={(e) => setDraft({ ...draft, remark: e.target.value })}
        />
      </Row>
      <Row>
        <RowLabel>시간</RowLabel>
        <MainLectureEditFormTime
          lectureTime={draft.class_time_json ?? defaultState.class_time_json ?? []}
          onChangeLectureTime={(e) => setDraft({ ...draft, class_time_json: e })}
        />
      </Row>
    </Wrapper>
  );
};

const useColorList = () => useQuery(['colors'], () => colorService.getColorList(), { staleTime: Infinity });

const Wrapper = styled.div``;

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
