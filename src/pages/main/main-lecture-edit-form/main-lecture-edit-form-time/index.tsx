import { useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/button';
import { HourMinutePickDialog } from '@/components/hour-minute-pick-dialog';
import { IcClose } from '@/components/icons/ic-close';
import { AddedLectureTime, Lecture } from '@/entities/lecture';
import { Day, DAY_LABEL_MAP, HourMinute } from '@/entities/time';
import { hourMinuteService } from '@/usecases/hourMinuteService';
import { lectureService } from '@/usecases/lectureService';
import { timetableViewService } from '@/usecases/timetableViewService';
import { ArrayElement } from '@/utils/array-element';

type Props = {
  lectureTime: (ArrayElement<Lecture['class_time_json']> | AddedLectureTime)[];
  onChangeLectureTime: (lectureTime: (ArrayElement<Lecture['class_time_json']> | AddedLectureTime)[]) => void;
};

const startBound = { hour: 8, minute: 0 } as const;
const endBound = { hour: 22, minute: 55 } as const;

export const MainLectureEditFormTime = ({ lectureTime, onChangeLectureTime }: Props) => {
  const [openTimeDialog, setOpenTimeDialog] = useState<{
    id: string;
    type: 'start' | 'end';
    defaultTime: HourMinute;
  } | null>(null);
  const handleAddTime = () => onChangeLectureTime([...lectureTime, lectureService.getEmptyClassTime()]);

  const handleDeleteLectureTime = (_id: string) =>
    onChangeLectureTime(lectureTime.filter((t) => '__id__' in t || t._id !== _id));

  const handleDeleteAddedTime = (__id__: string) =>
    onChangeLectureTime(lectureTime.filter((t) => '_id' in t || t.__id__ !== __id__));

  return (
    <Wrapper>
      {lectureTime.map((lt, i) => {
        const isAddedTime = '__id__' in lt;
        const id = isAddedTime ? lt.__id__ : lt._id;

        const onChangeDay = (day: Day) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, day } : _lt)));

        const onChangeStartTime = (start_time: string) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, start_time } : _lt)));

        const onChangeEndTime = (end_time: string) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, end_time } : _lt)));

        const onChangePlace = (place: string) =>
          onChangeLectureTime(lectureTime.map((_lt, _i) => (_i === i ? { ..._lt, place } : _lt)));

        return (
          <TimeItem key={id} data-testid="main-lecture-edit-form-time">
            <Select value={lt.day} onChange={(e) => onChangeDay(Number(e.target.value) as Day)}>
              {([0, 1, 2, 3, 4, 5, 6] as const).map((item) => (
                <option key={item} value={item}>
                  {DAY_LABEL_MAP[item]}
                </option>
              ))}
            </Select>

            <Input
              readOnly
              value={lt.start_time}
              onClick={() =>
                setOpenTimeDialog({ id, type: 'start', defaultTime: timetableViewService.parseTime(lt.start_time) })
              }
            />

            <Input
              readOnly
              value={lt.end_time}
              onClick={() =>
                setOpenTimeDialog({ id, type: 'end', defaultTime: timetableViewService.parseTime(lt.end_time) })
              }
            />

            <Input style={{ width: 'auto' }} value={lt.place} onChange={(e) => onChangePlace(e.target.value)} />

            <CloseIcon
              data-testid="main-lecture-edit-form-delete-time"
              onClick={() => (isAddedTime ? handleDeleteAddedTime(lt.__id__) : handleDeleteLectureTime(lt._id))}
            />
            <HourMinutePickDialog
              isOpen={openTimeDialog?.id === id && openTimeDialog.type === 'start'}
              onClose={() => setOpenTimeDialog(null)}
              onSubmit={(hour, minute) => {
                if (hourMinuteService.isBefore(timetableViewService.parseTime(lt.end_time), { hour, minute }))
                  onChangeLectureTime(
                    lectureTime.map((_lt, _i) =>
                      _i === i
                        ? {
                            ..._lt,
                            start_time: timetableViewService.formatTime(hour, minute),
                            end_time: timetableViewService.formatTime(hour, minute),
                          }
                        : _lt,
                    ),
                  );
                else onChangeStartTime(timetableViewService.formatTime(hour, minute));
              }}
              defaultHourMinute={openTimeDialog?.defaultTime}
              range={{ start: startBound, end: endBound }}
            />
            <HourMinutePickDialog
              isOpen={openTimeDialog?.id === id && openTimeDialog.type === 'end'}
              onClose={() => setOpenTimeDialog(null)}
              onSubmit={(hour, minute) => onChangeEndTime(timetableViewService.formatTime(hour, minute))}
              defaultHourMinute={openTimeDialog?.defaultTime}
              range={{ start: timetableViewService.parseTime(lt.start_time), end: endBound }}
            />
          </TimeItem>
        );
      })}
      <AddButton data-testid="main-lecture-edit-form-add-time" onClick={handleAddTime}>
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
  width: 60px;
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
