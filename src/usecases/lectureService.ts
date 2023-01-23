import { Color } from '@/entities/color';
import { DAY_LABEL_MAP } from '@/entities/day';
import { AddedLectureTime, BaseLecture, Lecture } from '@/entities/lecture';
import { CourseBook } from '@/entities/semester';
import { createRandomId } from '@/utils/random-id';

export interface SemesterService {
  getLectureDetailUrl(lecture: BaseLecture, courseBook: Omit<CourseBook, 'updated_at'>): string;
  getLectureTimeTexts(lecture: BaseLecture): string[];
  getLectureColor(lecture: Pick<Lecture, 'color' | 'colorIndex'>, colorList: Color[]): Color;
  getEmptyClassTime(): AddedLectureTime;
  emptyClassTimeToRequest(time: AddedLectureTime): Omit<AddedLectureTime, '__id__'>;
}

const getLectureService = (): SemesterService => {
  return {
    getLectureDetailUrl: ({ course_number, lecture_number }, { year, semester }) => {
      const { openShtmFg, openDetaShtmFg } = {
        1: { openShtmFg: 'U000200001', openDetaShtmFg: 'U000300001' },
        2: { openShtmFg: 'U000200002', openDetaShtmFg: 'U000300001' },
        3: { openShtmFg: 'U000200001', openDetaShtmFg: 'U000300002' },
        4: { openShtmFg: 'U000200002', openDetaShtmFg: 'U000300002' },
      }[semester];

      return `https://sugang.snu.ac.kr/sugang/cc/cc103.action?openSchyy=${year}&openShtmFg=${openShtmFg}&openDetaShtmFg=${openDetaShtmFg}&sbjtCd=${course_number}&ltNo=${lecture_number}&sbjtSubhCd=000`;
    },
    getLectureTimeTexts: (lecture) =>
      lecture.class_time_json.map((t) => `${DAY_LABEL_MAP[t.day]}(${t.start_time}~${t.end_time})`),
    getLectureColor: (lecture, colorList) => {
      const fallback = { bg: '#94e6fe', fg: '#1579c2' };

      if (lecture.colorIndex === 0) return { bg: lecture.color.bg ?? fallback.bg, fg: lecture.color.fg ?? fallback.fg };

      const bg = colorList?.[lecture.colorIndex - 1]?.bg ?? fallback.bg;
      const fg = colorList?.[lecture.colorIndex - 1]?.fg ?? fallback.fg;

      return { bg, fg };
    },
    getEmptyClassTime: () => ({ day: 0, len: 0.5, place: '', start: 0, __id__: createRandomId() }),
    emptyClassTimeToRequest: (time) => ({ day: time.day, len: time.len, place: time.place, start: time.start }),
  };
};

export const lectureService = getLectureService();
