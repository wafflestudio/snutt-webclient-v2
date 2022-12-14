import { Color } from './color';
import { Day } from './day';

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
    _id: string;
    day: Day;
    start: number;
    len: number;
    place: string;
    start_time: string;
    end_time: string;
  }[];
  class_time_mask: number[];
  instructor: string;
  quota: number;
  remark: string;
  category?: string;
  course_number?: string;
  lecture_number?: string;
}

export interface Lecture extends BaseLecture {
  created_at: string;
  updated_at: string;
  color: Color | Record<string, never>;
  colorIndex: number;
}
