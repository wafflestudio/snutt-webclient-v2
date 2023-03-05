import { useState } from 'react';
import styled from 'styled-components';

import { Button } from '@/components/button';
import { AmPm, Hour, HourMinute } from '@/entities/time';
import { timetableViewService } from '@/usecases/timetableViewService';

import { Clock } from '../clock';
import { Dialog } from '../dialog';

type Minute = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55;
type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (hour: number, minute: number) => void;
  defaultTime?: HourMinute;
  range?: { start: HourMinute; end: HourMinute };
};

enum Step {
  HOUR = 'hour',
  MINUTE = 'minute',
}

export const TimePickDialog = ({ isOpen, onClose, onSubmit, defaultTime, range }: Props) => {
  const [step, setStep] = useState(Step.HOUR);
  const [type, setType] = useState<AmPm>();
  const [hour, setHour] = useState<Hour>();
  const [minute, setMinute] = useState<Minute>();

  const typeWithDefault = type ?? (defaultTime ? (defaultTime.hour >= 12 ? AmPm.PM : AmPm.AM) : undefined);
  const hourWithDefault = hour ?? (defaultTime ? defaultTime.hour % 12 : undefined);
  const minuteWithDefault = minute ?? defaultTime?.minute;
  const isValid = typeWithDefault !== undefined && hourWithDefault !== undefined && minuteWithDefault !== undefined;

  const handleClose = () => {
    onClose?.();
    setStep(Step.HOUR);
    setType(undefined);
    setHour(undefined);
    setMinute(undefined);
  };

  const handleSubmit = () => {
    if (!isValid) return;
    const submitHour =
      hour !== undefined
        ? timetableViewService.clock12To24(hour, typeWithDefault)
        : defaultTime
        ? timetableViewService.clock12To24(defaultTime.hour % 12, typeWithDefault)
        : undefined;
    const submitMinute = minute ?? defaultTime?.minute;
    if (submitHour === undefined || submitMinute === undefined) return; // cannot reach here
    onSubmit?.(submitHour, submitMinute);
    handleClose();
  };

  return (
    <StyledDialog open={isOpen} onClose={handleClose}>
      <Dialog.Title>시간 선택</Dialog.Title>
      <StyledContent>
        <TimeWrapper>
          <TypeWrapper>
            <TypeBox $selected={typeWithDefault === AmPm.AM} onClick={() => setType(AmPm.AM)}>
              오전
            </TypeBox>
            <TypeBox $selected={typeWithDefault === AmPm.PM} onClick={() => setType(AmPm.PM)}>
              오후
            </TypeBox>
          </TypeWrapper>
          <TimeBox
            value={hourWithDefault !== undefined ? `${hourWithDefault || 12}`.padStart(2, '0') : '--'}
            $active={step === Step.HOUR}
            onClick={() => setStep(Step.HOUR)}
          />
          :
          <TimeBox
            value={minuteWithDefault !== undefined ? `${minuteWithDefault}`.padStart(2, '0') : '--'}
            $active={step === Step.MINUTE}
            onClick={() => setStep(Step.MINUTE)}
          />
        </TimeWrapper>

        <ClockWrapper $step={step}>
          <TimeClock
            list={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h, i) => ({
              label: h === 0 ? 12 : h,
              degree: i * 30,
              value: h,
              disabled:
                typeWithDefault === undefined ||
                (!!range &&
                  (() => {
                    const h24 = timetableViewService.clock12To24(h, typeWithDefault);
                    return h24 < range.start.hour || h24 > range.end.hour;
                  })()),
            }))}
            onSelect={(v) => {
              setHour(v as Hour);
              setStep(Step.MINUTE);
            }}
            selected={hourWithDefault}
          />
          <TimeClock
            list={[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m, i) => ({
              label: m,
              degree: i * 30,
              value: m,
              disabled:
                typeWithDefault === undefined ||
                hourWithDefault === undefined ||
                (!!range &&
                  (() => {
                    const h24 = timetableViewService.clock12To24(hourWithDefault, typeWithDefault);
                    return (
                      h24 < range.start.hour ||
                      (h24 === range.start.hour && m < range.start.minute) ||
                      h24 > range.end.hour ||
                      (h24 === range.end.hour && m > range.end.minute)
                    );
                  })()),
            }))}
            onSelect={(v) => setMinute(v as Minute)}
            selected={minuteWithDefault}
          />
        </ClockWrapper>
      </StyledContent>

      <Dialog.Actions>
        <Button size="small" color="gray" onClick={handleClose}>
          취소
        </Button>
        <Button size="small" disabled={!isValid} onClick={handleSubmit} data-testid="time-pick-dialog-submit">
          확인
        </Button>
      </Dialog.Actions>
    </StyledDialog>
  );
};

const StyledDialog = styled(Dialog)`
  width: 300px;
`;

const StyledContent = styled(Dialog.Content)`
  flex: 1;
  width: 100%;
  overflow: hidden;
`;

const TimeWrapper = styled.div`
  display: flex;
  font-size: 42px;
  gap: 6px;
  font-weight: 700;
  align-items: center;
`;

const TypeWrapper = styled.div`
  width: 40px;
  margin-right: 10px;
  height: 80px;
  border: 2px solid #ccc;
  border-radius: 8px;
  flex: 1;
  overflow: hidden;
`;

const TypeBox = styled.div<{ $selected: boolean }>`
  font-size: 14px;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  color: ${({ $selected }) => ($selected ? '#337972' : '#1f1f1f')};
  background-color: ${({ $selected }) => ($selected ? '#1bd0c930' : '#fff')};
  transition: background-color 0.2s;

  &:first-of-type {
    border-bottom: 1px solid #ccc;
  }
  &:last-of-type {
    border-top: 1px solid #ccc;
  }
`;

const TimeBox = styled.input.attrs({ readOnly: true })<{ $active: boolean }>`
  width: 84px;
  height: 80px;
  text-align: center;
  background-color: ${({ $active }) => ($active ? '#1bd0c930' : '#eee')};
  border-color: ${({ $active }) => ($active ? '#1bd0c9' : 'transparent')};
  color: ${({ $active }) => ($active ? '#337972' : '#1f1f1f')};
  border-width: 2px;
  border-style: solid;
  cursor: pointer;
  border-radius: 8px;
  outline: none;
  font-size: 42px;
  font-weight: 700;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1bd0c930;
  }
`;

const ClockWrapper = styled.div<{ $step: Step }>`
  width: 200%;
  display: flex;
  transform: translateX(${({ $step }) => ($step === Step.MINUTE ? '-50%' : '0%')});
  transition: transform 0.2s;
`;

const TimeClock = styled(Clock)`
  margin: 30px auto 10px;
  flex-shrink: 0;
`;
