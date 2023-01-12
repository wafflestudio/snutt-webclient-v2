import styled from 'styled-components';

import { Day, DAY_LABEL_MAP } from '@/entities/day';
import { Lecture } from '@/entities/lecture';
import { ArrayElement } from '@/utils/array-element';

type Props = {
  lectureTime: (ArrayElement<Lecture['class_time_json']> | { day: Day; len: number; place: string; start: number })[];
  onChangeLectureTime: (
    lectureTime: (ArrayElement<Lecture['class_time_json']> | { day: Day; len: number; place: string; start: number })[],
  ) => void;
};

export const MainLectureEditDialogTime = ({ lectureTime, onChangeLectureTime }: Props) => {
  return (
    <Wrapper>
      {lectureTime.map((lt, i) => {
        const onChangeDay = (day: Day) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, day } : _lt)));

        const onChangeStart = (start: number) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, start } : _lt)));

        const onChangeLen = (len: number) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, len } : _lt)));

        const onChangePlace = (place: string) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, place } : _lt)));

        return (
          <TimeItem key={i} data-testid="main-lecture-edit-dialog-time">
            <Select value={lt.day} onChange={(e) => onChangeDay(Number(e.target.value) as Day)}>
              {([0, 1, 2, 3, 4, 5, 6] as const).map((item) => (
                <option key={item} value={item}>
                  {DAY_LABEL_MAP[item]}
                </option>
              ))}
            </Select>

            <Select value={lt.start} onChange={(e) => onChangeStart(Number(e.target.value) as Day)}>
              {Array(29)
                .fill(0)
                .map((item, i) => (
                  <option key={i / 2} value={i / 2}>
                    {i % 2 === 0 ? `${i / 2 + 8}:00` : `${parseInt(`${i / 2}`) + 8}:30`}
                  </option>
                ))}
            </Select>

            <Select value={lt.len} onChange={(e) => onChangeLen(Number(e.target.value) as Day)}>
              {Array((15 - lt.start) * 2)
                .fill(0)
                .map((item, i) => (
                  <option key={i} value={(i + 1) / 2}>
                    {(i + 1) / 2}
                  </option>
                ))}
            </Select>

            <input value={lt.place} onChange={(e) => onChangePlace(e.target.value)} />
          </TimeItem>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const TimeItem = styled.div`
  display: flex;
  gap: 2px;
  height: 30px;
`;

const Select = styled.select`
  width: 60px;
  outline: none;
`;
