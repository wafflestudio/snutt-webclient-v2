import type { Semester } from '@/entities/semester';
import type { CreateLectureRequest, FullTimetable, Timetable, UpdateLectureRequest } from '@/entities/timetable';
import type { TimetableRepository } from '@/repositories/timetableRepository';

export interface TimetableService {
  getTimetables(token: string): Promise<Timetable[]>;
  getFullTimetable(token: string, id: string): Promise<FullTimetable>;
  createTimetable(token: string, info: { title: string; year: number; semester: Semester }): Promise<Timetable[]>;
  renameTimetable(token: string, id: string, title: string): Promise<Timetable[]>;
  deleteTimetable(token: string, id: string): Promise<Timetable[]>;
  updateLecture(
    token: string,
    params: { id: string; lecture_id: string },
    data: UpdateLectureRequest,
  ): Promise<FullTimetable>;
  createLecture(token: string, params: { id: string }, data: CreateLectureRequest): Promise<FullTimetable>;
  deleteLecture(token: string, params: { id: string; lecture_id: string }): Promise<FullTimetable>;
  addLecture(token: string, params: { id: string; lecture_id: string }): Promise<FullTimetable>;
}

type Deps = { repositories: [TimetableRepository] };
export const getTimetableService = ({ repositories: [timetableRepository] }: Deps): TimetableService => {
  return {
    getTimetables: (token) => timetableRepository.getTimetables({ token }),
    getFullTimetable: (token, id) => timetableRepository.getFullTimetable({ token }, { id }),
    deleteTimetable: (token, id) => timetableRepository.deleteTimetable({ token }, { id }),
    renameTimetable: (token, id, title) => timetableRepository.updateTimetable({ token }, { id }, { title }),
    createTimetable: async (token, { title, year, semester }) =>
      timetableRepository.createTimetable({ token }, { title, year, semester }),
    updateLecture: async (token, params, body) => timetableRepository.updateLecture({ token }, params, body),
    createLecture: async (token, params, body) => timetableRepository.createLecture({ token }, params, body),
    deleteLecture: async (token, params) => timetableRepository.deleteLecture({ token }, params),
    addLecture: async (token, params) => timetableRepository.addLecture({ token }, params),
  };
};
