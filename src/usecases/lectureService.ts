import { DAY_LABEL_MAP } from '@/entities/day';
import { BaseLecture } from '@/entities/lecture';
import { CourseBook } from '@/entities/semester';

export interface SemesterService {
  getLectureDetailUrl(lecture: BaseLecture, courseBook: Omit<CourseBook, 'updated_at'>): string;
  getLectureTimeTexts(lecture: BaseLecture): string[];
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
  };
};

export const lectureService = getLectureService();
