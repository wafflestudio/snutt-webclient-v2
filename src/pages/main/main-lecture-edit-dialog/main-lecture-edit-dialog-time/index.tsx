import styled from 'styled-components';

import { Button } from '@/components/button';
import { IcClose } from '@/components/icons/ic-close';
import { Day, DAY_LABEL_MAP } from '@/entities/day';
import { AddedLectureTime, Lecture } from '@/entities/lecture';
import { lectureService } from '@/usecases/lectureService';
import { ArrayElement } from '@/utils/array-element';

type Props = {
  lectureTime: (ArrayElement<Lecture['class_time_json']> | AddedLectureTime)[];
  onChangeLectureTime: (lectureTime: (ArrayElement<Lecture['class_time_json']> | AddedLectureTime)[]) => void;
};

export const MainLectureEditDialogTime = ({ lectureTime, onChangeLectureTime }: Props) => {
  const handleAddTime = () => onChangeLectureTime([...lectureTime, lectureService.getEmptyClassTime()]);

  const handleDeleteLectureTime = (_id: string) =>
    onChangeLectureTime(lectureTime.filter((t) => '__id__' in t || t._id !== _id));

  const handleDeleteAddedTime = (__id__: string) =>
    onChangeLectureTime(lectureTime.filter((t) => '_id' in t || t.__id__ !== __id__));

  return (
    <Wrapper>
      {lectureTime.map((lt, i) => {
        const isAddedTime = '__id__' in lt;

        const onChangeDay = (day: Day) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, day } : _lt)));

        const onChangeStart = (start: number) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, start } : _lt)));

        const onChangeLen = (len: number) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, len } : _lt)));

        const onChangePlace = (place: string) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, place } : _lt)));

        return (
          <TimeItem key={isAddedTime ? lt.__id__ : lt._id} data-testid="main-lecture-edit-dialog-time">
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

            <Input value={lt.place} onChange={(e) => onChangePlace(e.target.value)} />
            <CloseIcon
              data-testid="main-lecture-edit-dialog-delete-time"
              onClick={() => (isAddedTime ? handleDeleteAddedTime(lt.__id__) : handleDeleteLectureTime(lt._id))}
            />
          </TimeItem>
        );
      })}
      <AddButton data-testid="main-lecture-edit-dialog-add-time" onClick={handleAddTime}>
        시간 추가
      </AddButton>
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
  gap: 4px;
  height: 30px;
  align-items: center;
`;

const Select = styled.select`
  width: 60px;
  outline: none;
  height: 100%;
`;

const Input = styled.input`
  outline: none;
  height: 100%;
`;

const CloseIcon = styled(IcClose)`
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const AddButton = styled(Button).attrs({ variant: 'outlined', color: 'gray', size: 'small' })``;
