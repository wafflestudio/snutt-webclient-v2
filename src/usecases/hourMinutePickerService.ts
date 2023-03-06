import { AmPm, Hour, HourMinute, Minute } from '@/entities/time';

import { HourMinuteService, hourMinuteService } from './hourMinuteService';
import { TimetableViewService, timetableViewService } from './timetableViewService';

type State = {
  amPm: AmPm | undefined;
  hour: Hour | undefined;
  minute: Minute | undefined;
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

  getUpdatedStateOnAmPmChange: (
    state: Pick<State, 'amPm' | 'hour' | 'minute'>,
    props: Pick<Props, 'range' | 'defaultHourMinute'>,
    updatedAmPm: AmPm,
  ) => State;

  getSubmitHourMinute: (
    state: Pick<State, 'amPm' | 'hour' | 'minute'>,
    props: Pick<Props, 'defaultHourMinute'>,
  ) => HourMinute | null;

  getAmPmWithDefault: (amPm: AmPm | undefined, defaultHourMinute: HourMinute | undefined) => AmPm | undefined;
  getHourWithDefault: (hour: Hour | undefined, defaultHourMinute: HourMinute | undefined) => Hour | undefined;
  getMinuteWithDefault: (minute: Minute | undefined, defaultHourMinute: HourMinute | undefined) => Minute | undefined;
}

type Deps = { services: [TimetableViewService, HourMinuteService] };
const getHourMinutePickerService = ({ services }: Deps): HourMinutePickerService => {
  const getAmPmWithDefault = (amPm: AmPm | undefined, defaultHourMinute: HourMinute | undefined): AmPm | undefined =>
    amPm ?? (defaultHourMinute ? (defaultHourMinute.hour >= 12 ? AmPm.PM : AmPm.AM) : undefined);

  const getHourWithDefault = (hour: Hour | undefined, defaultHourMinute: HourMinute | undefined): Hour | undefined =>
    hour ?? (defaultHourMinute ? ((defaultHourMinute.hour % 12) as Hour) : undefined);

  const getMinuteWithDefault = (
    minute: Minute | undefined,
    defaultHourMinute: HourMinute | undefined,
  ): Minute | undefined => minute ?? defaultHourMinute?.minute;

  return {
    getAmPmList: ({}, { range }) => {
      return [
        { value: AmPm.AM, label: '오전', disabled: !!range && range.start.hour >= 12 },
        { value: AmPm.PM, label: '오후', disabled: !!range && range.end.hour < 12 },
      ];
    },
    getHourList: ({ amPm }, { range, defaultHourMinute }) => {
      const amPmWithDefault = getAmPmWithDefault(amPm, defaultHourMinute);

      return ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as const).map((h, i) => ({
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
              const h24 = services[0].clock12To24(hourWithDefault, amPmWithDefault);
              return (
                h24 < range.start.hour ||
                (h24 === range.start.hour && m < range.start.minute) ||
                h24 > range.end.hour ||
                (h24 === range.end.hour && m > range.end.minute)
              );
            })()),
      }));
    },
    getUpdatedStateOnAmPmChange: ({ hour, minute }, { range, defaultHourMinute }, updatedAmPm) => {
      const hourWithDefault = hourMinutePickerService.getHourWithDefault(hour, defaultHourMinute);
      const minuteWithDefault = hourMinutePickerService.getMinuteWithDefault(minute, defaultHourMinute);

      if (!range) return { amPm: updatedAmPm, hour, minute };

      if (hourWithDefault === undefined || minuteWithDefault === undefined) {
        const minHourMinuteInAmPm =
          updatedAmPm === AmPm.AM ? ({ hour: 0, minute: 0 } as const) : ({ hour: 12, minute: 0 } as const);
        return { amPm: updatedAmPm, ...services[1].min(minHourMinuteInAmPm, range.start) };
      }

      const orgHourMinute = { hour: services[0].clock12To24(hourWithDefault, updatedAmPm), minute: minuteWithDefault };

      if (services[1].isAfter(orgHourMinute, range.end))
        return { amPm: updatedAmPm, ...services[1].clock24To12(range.end) };

      if (services[1].isBefore(orgHourMinute, range.start))
        return { amPm: updatedAmPm, ...services[1].clock24To12(range.start) };

      return { amPm: updatedAmPm, hour, minute };
    },
    getSubmitHourMinute: ({ amPm, hour, minute }, { defaultHourMinute }) => {
      const amPmWithDefault = getAmPmWithDefault(amPm, defaultHourMinute);

      if (!amPmWithDefault) return null;

      const submitHour =
        hour !== undefined
          ? services[0].clock12To24(hour, amPmWithDefault)
          : defaultHourMinute
          ? services[0].clock12To24((defaultHourMinute.hour % 12) as Hour, amPmWithDefault)
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

export const hourMinutePickerService = getHourMinutePickerService({
  services: [timetableViewService, hourMinuteService],
});
