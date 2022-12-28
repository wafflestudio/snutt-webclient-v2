import { Lecture } from '@/entities/lecture';
import { CourseBook } from '@/entities/semester';

export interface SemesterService {
  getLectureDetailUrl(lecture: Lecture, courseBook: Omit<CourseBook, 'updated_at'>): string;
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
  };
};

export const lectureService = getLectureService();
