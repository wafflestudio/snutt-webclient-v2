import { Hour, HourMinute } from '@/entities/time';

export interface HourMinuteService {
  isAfter: (hm1: HourMinute, hm2: HourMinute) => boolean;
  isBefore: (hm1: HourMinute, hm2: HourMinute) => boolean;

  max: (...hms: HourMinute[]) => HourMinute;
  min: (...hms: HourMinute[]) => HourMinute;

  clock24To12: (hm: HourMinute) => HourMinute;
}

const getHourMinuteService = (): HourMinuteService => {
  return {
    isAfter: (hm1, hm2) => hm1.hour * 60 + hm1.minute > hm2.hour * 60 + hm2.minute,
    isBefore: (hm1, hm2) => hm1.hour * 60 + hm1.minute < hm2.hour * 60 + hm2.minute,
    max: (...hms) => hms.reduce((acc, cur) => (acc.hour * 60 + acc.minute > cur.hour * 60 + cur.minute ? acc : cur)),
    min: (...hms) => hms.reduce((acc, cur) => (acc.hour * 60 + acc.minute < cur.hour * 60 + cur.minute ? acc : cur)),
    clock24To12: (hm) => ({ hour: (hm.hour % 12) as Hour, minute: hm.minute }),
  };
};

export const hourMinuteService = getHourMinuteService();
