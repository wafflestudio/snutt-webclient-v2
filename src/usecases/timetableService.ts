import type { Semester } from '@/entities/semester';
import type { CreateLectureRequest, FullTimetable, Timetable, UpdateLectureRequest } from '@/entities/timetable';
import type { TimetableRepository } from '@/repositories/timetableRepository';
import { timetableRepository } from '@/repositories/timetableRepository';
import { envService } from '@/usecases';
import type { AuthService } from '@/usecases/authService';
import type { EnvService } from '@/usecases/envService';

import { authService } from '.';

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

const getTimetableService = ({
  services,
  repositories: [timetableRepo],
}: {
  services: [AuthService, EnvService];
  repositories: [TimetableRepository];
}): TimetableService => {
  const baseUrl = services[1].getBaseUrl();
  const apikey = services[0].getApiKey();

  return {
    getTimetables: (token) => timetableRepo.getTimetables({ baseUrl, apikey, token }),
    getFullTimetable: (token, id) => timetableRepo.getFullTimetable({ baseUrl, apikey, token }, { id }),
    deleteTimetable: (token, id) => timetableRepo.deleteTimetable({ baseUrl, apikey, token }, { id }),
    renameTimetable: (token, id, title) => timetableRepo.updateTimetable({ baseUrl, apikey, token }, { id }, { title }),
    createTimetable: async (token, { title, year, semester }) =>
      timetableRepo.createTimetable({ baseUrl, apikey, token }, { title, year, semester }),
    updateLecture: async (token, params, body) => timetableRepo.updateLecture({ baseUrl, apikey, token }, params, body),
    createLecture: async (token, params, body) => timetableRepo.createLecture({ baseUrl, apikey, token }, params, body),
    deleteLecture: async (token, params) => timetableRepo.deleteLecture({ baseUrl, apikey, token }, params),
    addLecture: async (token, params) => timetableRepo.addLecture({ baseUrl, apikey, token }, params),
  };
};

export const timetableService = getTimetableService({
  services: [authService, envService],
  repositories: [timetableRepository],
});
