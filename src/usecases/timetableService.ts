import { Timetable } from '@/entities/timetable';
import { EnvRepository, envRepository } from '@/repositories/envRepository';
import { TimetableRepository, timetableRepository } from '@/repositories/timetableRepository';

import { AuthService, authService } from './authService';

export interface TimetableService {
  getTimetables(): Promise<Timetable[]>;
}

const getTimetableService = (args: {
  services: [AuthService];
  repositories: [TimetableRepository, EnvRepository];
}): TimetableService => {
  const baseUrl = args.repositories[1].getBaseUrl();
  const apikey = args.services[0].getApiKey();
  const token = args.services[0].getToken();

  return {
    getTimetables: () => args.repositories[0].getTimetables({ baseUrl, apikey, token }),
  };
};

export const timetableService = getTimetableService({
  services: [authService],
  repositories: [timetableRepository, envRepository],
});
