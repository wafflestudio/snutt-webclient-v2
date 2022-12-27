export interface Timetable {
  semester: 1 | 2 | 3 | 4;
  title: string;
  total_credit: number;
  updated_at: string;
  year: number;
  _id: string;
}

export interface FullTimetable {
  lecture_list: {
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
      day: number;
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
    created_at: string;
    updated_at: string;
    color: unknown;
    colorIndex: number;
  }[];
  semester: 1 | 2 | 3 | 4;
  theme: number;
  title: string;
  updated_at: string;
  user_id: string;
  year: number;
  _id: string;
}