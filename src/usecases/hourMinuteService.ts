import { AmPm, Hour12, Hour24, HourMinute, HourMinute12, HourMinute24 } from '@/entities/time';

export interface HourMinuteService {
  isAfter: (hm1: HourMinute, hm2: HourMinute) => boolean;
  isBefore: (hm1: HourMinute, hm2: HourMinute) => boolean;

  max: (...hms: HourMinute[]) => HourMinute;
  min: (...hms: HourMinute[]) => HourMinute;

  toHour24: (hour: Hour12, amPm: AmPm) => Hour24;
  toHourMinute24: (hm: HourMinute) => HourMinute24;
  toHourMinute12: (hm: HourMinute) => HourMinute12;
}

const getHourMinuteService = (): HourMinuteService => {
  return {
    isAfter: (hm1, hm2) => toValue(hm1) > toValue(hm2),
    isBefore: (hm1, hm2) => toValue(hm1) < toValue(hm2),

    max: (...hms) => hms.reduce((acc, cur) => (acc.hour * 60 + acc.minute > cur.hour * 60 + cur.minute ? acc : cur)),
    min: (...hms) => hms.reduce((acc, cur) => (acc.hour * 60 + acc.minute < cur.hour * 60 + cur.minute ? acc : cur)),

    toHour24: (hm, ap) => (ap === AmPm.AM ? hm : hm + 12) as Hour24,
    toHourMinute24: (hm) =>
      'amPm' in hm
        ? {
            hour: (hm.hour + (hm.amPm === AmPm.AM ? 0 : 12)) as Hour24,
            minute: hm.minute,
          }
        : hm,
    toHourMinute12: (hm) =>
      'amPm' in hm
        ? hm
        : {
            hour: (hm.hour % 12) as Hour12,
            minute: hm.minute,
            amPm: hm.hour >= 12 ? AmPm.PM : AmPm.AM,
          },
  };
};

export const hourMinuteService = getHourMinuteService();

const toValue = (hm: HourMinute12 | HourMinute24) =>
  ('amPm' in hm && hm.amPm === AmPm.PM ? hm.hour + 12 : hm.hour) * 60 + hm.minute;
