import { Semester } from '@/entities/semester';
import { FullTimetable, Timetable } from '@/entities/timetable';

export interface TimetableRepository {
  getTimetables(args: { baseUrl: string; apikey: string; token: string }): Promise<Timetable[]>;
  getFullTimetable(
    args: { baseUrl: string; apikey: string; token: string },
    params: { id: string },
  ): Promise<FullTimetable>;
  createTimetable(
    args: { baseUrl: string; apikey: string; token: string },
    params: { title: string; year: number; semester: Semester },
  ): Promise<Timetable[]>;
}

const getTimetableRepository = (): TimetableRepository => {
  return {
    getTimetables: async ({ baseUrl, apikey, token }) => {
      const response = await fetch(`${baseUrl}/tables`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as Timetable[];
    },
    getFullTimetable: async ({ baseUrl, apikey, token }, { id }) => {
      const response = await fetch(`${baseUrl}/tables/${id}`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as FullTimetable;
    },
    createTimetable: async ({ baseUrl, apikey, token }, { title, year, semester }) => {
      const response = await fetch(`${baseUrl}/tables`, {
        headers: {
          'x-access-apikey': apikey,
          'x-access-token': token,
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify({ title, year, semester }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as Timetable[];
    },
  };
};

export const timetableRepository = getTimetableRepository();
