import { AmPm, HourMinute } from '@/entities/time';

import { TimetableViewService, timetableViewService } from './timetableViewService';

type State = {
  amPm: AmPm | undefined;
  hour: number | undefined;
  minute: number | undefined;
};

type Props = {
  range: { start: HourMinute; end: HourMinute } | undefined;
  defaultHourMinute: HourMinute | undefined;
};

export interface HourMinutePickerService {
  getAmPmList: (
    state: Pick<State, never>,
    props: Pick<Props, 'range'>,
  ) => { value: AmPm; label: string; disabled: boolean }[];
  getHourList: (
    state: Pick<State, 'amPm'>,
    props: Pick<Props, 'range' | 'defaultHourMinute'>,
  ) => { label: number; degree: number; value: number; disabled: boolean }[];
  getMinuteList: (
    state: Pick<State, 'amPm' | 'hour'>,
    props: Pick<Props, 'range' | 'defaultHourMinute'>,
  ) => { label: number; degree: number; value: number; disabled: boolean }[];

  getSubmitHourMinute: (
    state: Pick<State, 'amPm' | 'hour' | 'minute'>,
    props: Pick<Props, 'defaultHourMinute'>,
  ) => HourMinute | null;

  getAmPmWithDefault: (amPm: AmPm | undefined, defaultHourMinute: HourMinute | undefined) => AmPm | undefined;
  getHourWithDefault: (hour: number | undefined, defaultHourMinute: HourMinute | undefined) => number | undefined;
  getMinuteWithDefault: (minute: number | undefined, defaultHourMinute: HourMinute | undefined) => number | undefined;
}

type Deps = { services: [TimetableViewService] };
const getHourMinutePickerService = ({ services }: Deps): HourMinutePickerService => {
  const getAmPmWithDefault = (amPm: AmPm | undefined, defaultHourMinute: HourMinute | undefined) =>
    amPm ?? (defaultHourMinute ? (defaultHourMinute.hour >= 12 ? AmPm.PM : AmPm.AM) : undefined);

  const getHourWithDefault = (hour: number | undefined, defaultHourMinute: HourMinute | undefined) =>
    hour ?? (defaultHourMinute ? defaultHourMinute.hour % 12 : undefined);

  const getMinuteWithDefault = (minute: number | undefined, defaultHourMinute: HourMinute | undefined) =>
    minute ?? defaultHourMinute?.minute;

  return {
    getAmPmList: ({}, { range }) => {
      return [
        { value: AmPm.AM, label: '오전', disabled: !!range && range.start.hour >= 12 },
        { value: AmPm.PM, label: '오후', disabled: !!range && range.end.hour < 12 },
      ];
    },
    getHourList: ({ amPm }, { range, defaultHourMinute }) => {
      const amPmWithDefault = getAmPmWithDefault(amPm, defaultHourMinute);
      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h, i) => ({
        label: h === 0 ? 12 : h,
        degree: i * 30,
        value: h,
        disabled:
          amPmWithDefault === undefined ||
          (!!range &&
            (() => {
              const h24 = services[0].clock12To24(h, amPmWithDefault);
              return h24 < range.start.hour || h24 > range.end.hour;
            })()),
      }));
    },
    getMinuteList: ({ amPm, hour }, { range, defaultHourMinute }) => {
      const amPmWithDefault = getAmPmWithDefault(amPm, defaultHourMinute);
      const hourWithDefault = getHourWithDefault(hour, defaultHourMinute);

      return [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m, i) => ({
        label: m,
        degree: i * 30,
        value: m,
        disabled:
          amPmWithDefault === undefined ||
          hourWithDefault === undefined ||
          (!!range &&
            (() => {
              const h24 = timetableViewService.clock12To24(hourWithDefault, amPmWithDefault);
              return (
                h24 < range.start.hour ||
                (h24 === range.start.hour && m < range.start.minute) ||
                h24 > range.end.hour ||
                (h24 === range.end.hour && m > range.end.minute)
              );
            })()),
      }));
    },
    getSubmitHourMinute: ({ amPm, hour, minute }, { defaultHourMinute }) => {
      const amPmWithDefault = getAmPmWithDefault(amPm, defaultHourMinute);

      if (!amPmWithDefault) return null;

      const submitHour =
        hour !== undefined
          ? timetableViewService.clock12To24(hour, amPmWithDefault)
          : defaultHourMinute
          ? timetableViewService.clock12To24(defaultHourMinute.hour % 12, amPmWithDefault)
          : undefined;
      const submitMinute = minute ?? defaultHourMinute?.minute;

      if (submitHour === undefined || submitMinute === undefined) return null;

      return { hour: submitHour, minute: submitMinute };
    },
    getAmPmWithDefault,
    getHourWithDefault,
    getMinuteWithDefault,
  };
};

export const hourMinutePickerService = getHourMinutePickerService({ services: [timetableViewService] });
