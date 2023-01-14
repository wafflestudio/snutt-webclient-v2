import { Color } from '@/entities/color';
import { Day } from '@/entities/day';
import { Semester } from '@/entities/semester';
import { TimeMask } from '@/entities/timeMask';
import { FullTimetable, Timetable } from '@/entities/timetable';
import { TimetableRepository, timetableRepository } from '@/repositories/timetableRepository';
import { AuthService, authService } from '@/usecases/authService';
import { EnvService, envService } from '@/usecases/envService';

export interface TimetableService {
  getTimetables(token: string): Promise<Timetable[]>;
  getFullTimetable(token: string, id: string): Promise<FullTimetable>;
  createTimetable(token: string, info: { title: string; year: number; semester: Semester }): Promise<Timetable[]>;
  deleteTimetable(token: string, id: string): Promise<Timetable[]>;
  updateLecture(
    token: string,
    params: { id: string; lecture_id: string },
    data: {
      course_title: string;
      instructor: string;
      class_time_mask: TimeMask;
      class_time_json: (
        | { _id: string; day: Day; start: number; start_time: string; end_time: string; len: number; place: string }
        | { day: Day; start: number; len: number; place: string }
      )[];
      remark: string;
      credit: number;
    } & ({ colorIndex: 9; color: Color } | { colorIndex: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 }),
  ): Promise<FullTimetable>;
  deleteLecture(token: string, params: { id: string; lecture_id: string }): Promise<FullTimetable>;
  addLecture(token: string, params: { id: string; lecture_id: string }): Promise<FullTimetable>;
}

const getTimetableService = (args: {
  services: [AuthService, EnvService];
  repositories: [TimetableRepository];
}): TimetableService => {
  const baseUrl = args.services[1].getBaseUrl();
  const apikey = args.services[0].getApiKey();

  return {
    getTimetables: (token) => args.repositories[0].getTimetables({ baseUrl, apikey, token }),
    getFullTimetable: (token, id) => args.repositories[0].getFullTimetable({ baseUrl, apikey, token }, { id }),
    deleteTimetable: (token, id) => args.repositories[0].deleteTimetable({ baseUrl, apikey, token }, { id }),
    createTimetable: async (token, { title, year, semester }) =>
      args.repositories[0].createTimetable({ baseUrl, apikey, token }, { title, year, semester }),
    updateLecture: async (token, params, body) =>
      args.repositories[0].updateLecture({ baseUrl, apikey, token }, params, body),
    deleteLecture: async (token, params) => args.repositories[0].deleteLecture({ baseUrl, apikey, token }, params),
    addLecture: async (token, params) => args.repositories[0].addLecture({ baseUrl, apikey, token }, params),
  };
};

export const timetableService = getTimetableService({
  services: [authService, envService],
  repositories: [timetableRepository],
});
