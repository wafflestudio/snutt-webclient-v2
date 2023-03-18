import { Color } from './color';
import { Day } from './time';

export interface BaseLecture {
  _id: string;
  classification?: string;
  department?: string;
  academic_year?: string;
  course_title: string;
  credit: number;
  class_time?: string;
  real_class_time: string;
  class_time_json: {
    day: Day;
    place: string;
    start_time: string;
    end_time: string;
    start?: never; // deprecated
    len?: never; //deprecated
  }[];
  class_time_mask: number[];
  instructor: string;
  quota: number;
  remark: string;
  category?: string;
  course_number?: string;
  lecture_id?: string;
  lecture_number?: string;
}

export interface Lecture extends BaseLecture {
  created_at: string;
  updated_at: string;
  color: Color | Record<string, never>;
  colorIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
}

// 커스텀 시간으로 새로 추가된 것
// __id__ 필드는 internal 용이고, 서버로 보낼 땐 제거되어야 한다
export type AddedLectureTime = { __id__: string; day: Day; start_time: string; end_time: string; place: string };
