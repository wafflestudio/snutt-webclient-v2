import { Lecture } from './lecture';

export interface Timetable {
  semester: 1 | 2 | 3 | 4;
  title: string;
  total_credit: number;
  updated_at: string;
  year: number;
  _id: string;
}

export interface FullTimetable {
  lecture_list: Lecture[];
  semester: 1 | 2 | 3 | 4;
  theme: number;
  title: string;
  updated_at: string;
  user_id: string;
  year: number;
  _id: string;
}
