import { useState } from 'react';
import styled from 'styled-components';

import { truffleClient } from '@/clients/truffle';
import { Button } from '@/components/button';
import { AmPm, Hour, HourMinute } from '@/entities/time';
import { hourMinutePickerService } from '@/usecases/hourMinutePickerService';

import { Clock } from '../clock';
import { Dialog } from '../dialog';

type Minute = 0 | 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55;
type Props = {
  isOpen: boolean;
  onClose?: () => void;
  onSubmit?: (hour: number, minute: number) => void;
  defaultHourMinute?: HourMinute;
  range?: { start: HourMinute; end: HourMinute };
};

enum Step {
  HOUR = 'hour',
  MINUTE = 'minute',
}

export const HourMinutePickDialog = ({ isOpen, onClose, onSubmit, defaultHourMinute, range }: Props) => {
  const [step, setStep] = useState(Step.HOUR);
  const [amPm, setAmPm] = useState<AmPm>();
  const [hour, setHour] = useState<Hour>();
  const [minute, setMinute] = useState<Minute>();

  const ampmWithDefault = hourMinutePickerService.getAmPmWithDefault(amPm, defaultHourMinute);
  const hourWithDefault = hourMinutePickerService.getHourWithDefault(hour, defaultHourMinute);
  const minuteWithDefault = hourMinutePickerService.getMinuteWithDefault(minute, defaultHourMinute);
  const isValid = ampmWithDefault !== undefined && hourWithDefault !== undefined && minuteWithDefault !== undefined;

  const handleClose = () => {
    onClose?.();
    setStep(Step.HOUR);
    setAmPm(undefined);
    setHour(undefined);
    setMinute(undefined);
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const submitHourMinute = hourMinutePickerService.getSubmitHourMinute({ amPm, hour, minute }, { defaultHourMinute });
    if (submitHourMinute === null) return truffleClient.capture(new Error('submitHourMinute is null'));

    onSubmit?.(submitHourMinute.hour, submitHourMinute.minute);
    handleClose();
  };

  return (
    <StyledDialog open={isOpen} onClose={handleClose}>
      <Dialog.Title>시간 선택</Dialog.Title>
      <StyledContent>
        <TimeWrapper>
          <TypeWrapper>
            {hourMinutePickerService.getAmPmList({}, { range }).map(({ value, label, disabled }) => (
              <TypeBox
                $selected={ampmWithDefault === value}
                onClick={() => !disabled && setAmPm(value)}
                key={value}
                $disabled={disabled}
              >
                {label}
              </TypeBox>
            ))}
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
            list={hourMinutePickerService.getHourList({ amPm }, { range, defaultHourMinute })}
            onSelect={(v) => {
              setHour(v as Hour);
              setStep(Step.MINUTE);
            }}
            selected={hourWithDefault}
          />
          <TimeClock
            list={hourMinutePickerService.getMinuteList({ amPm, hour }, { range, defaultHourMinute })}
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

const TypeBox = styled.div<{ $selected: boolean; $disabled: boolean }>`
  font-size: 14px;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};

  color: ${({ $selected }) => ($selected ? '#337972' : '#1f1f1f')};
  background-color: ${({ $selected }) => ($selected ? '#1bd0c930' : '#fff')};
  transition: background-color 0.2s;
  opacity: ${({ $disabled }) => ($disabled ? 0.2 : 1)};

  &:not(:first-of-type) {
    border-top: 1px solid #ccc;
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid #ccc;
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
