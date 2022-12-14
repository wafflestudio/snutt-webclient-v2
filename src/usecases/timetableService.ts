import { Semester } from '@/entities/semester';
import { FullTimetable, Timetable } from '@/entities/timetable';
import { TimetableRepository, timetableRepository } from '@/repositories/timetableRepository';
import { AuthService, authService } from '@/usecases/authService';
import { EnvService, envService } from '@/usecases/envService';

export interface TimetableService {
  getTimetables(token: string): Promise<Timetable[]>;
  getFullTimetable(token: string, id: string): Promise<FullTimetable>;
  createTimetable(token: string, info: { title: string; year: number; semester: Semester }): Promise<Timetable[]>;
}

const getTimetableService = (args: {
  services: [AuthService, EnvService];
  repositories: [TimetableRepository];
}): TimetableService => {
  const baseUrl = args.services[1].getBaseUrl();
  const apikey = args.services[0].getApiKey();

  return {
    getTimetables: (token: string) => args.repositories[0].getTimetables({ baseUrl, apikey, token }),
    getFullTimetable: (token: string, id: string) =>
      args.repositories[0].getFullTimetable({ baseUrl, apikey, token }, { id }),
    createTimetable: async (token, { title, year, semester }) =>
      args.repositories[0].createTimetable({ baseUrl, apikey, token }, { title, year, semester }),
  };
};

export const timetableService = getTimetableService({
  services: [authService, envService],
  repositories: [timetableRepository],
});
