import { Semester } from '@/entities/semester';
import { CreateLectureRequest, FullTimetable, Timetable, UpdateLectureRequest } from '@/entities/timetable';

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
  deleteTimetable(
    args: { baseUrl: string; apikey: string; token: string },
    params: { id: string },
  ): Promise<Timetable[]>;
  updateLecture(
    args: { baseUrl: string; apikey: string; token: string },
    params: { id: string; lecture_id: string },
    data: UpdateLectureRequest,
  ): Promise<FullTimetable>;
  createLecture(
    args: { baseUrl: string; apikey: string; token: string },
    params: { id: string },
    data: CreateLectureRequest,
  ): Promise<FullTimetable>;
  deleteLecture(
    args: { baseUrl: string; apikey: string; token: string },
    params: { id: string; lecture_id: string },
  ): Promise<FullTimetable>;
  addLecture(
    args: { baseUrl: string; apikey: string; token: string },
    params: { id: string; lecture_id: string },
  ): Promise<FullTimetable>;
  updateTimetable(
    args: { baseUrl: string; apikey: string; token: string },
    params: { id: string },
    data: { title: string },
  ): Promise<Timetable[]>;
}

const getTimetableRepository = (): TimetableRepository => {
  return {
    getTimetables: async ({ baseUrl, apikey, token }) => {
      const response = await fetch(`${baseUrl}/v1/tables`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as Timetable[];
    },
    getFullTimetable: async ({ baseUrl, apikey, token }, { id }) => {
      const response = await fetch(`${baseUrl}/v1/tables/${id}`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token, accept: 'application/json' },
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as FullTimetable;
    },
    deleteTimetable: async ({ baseUrl, apikey, token }, { id }) => {
      const response = await fetch(`${baseUrl}/v1/tables/${id}`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token },
        method: 'DELETE',
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as Timetable[];
    },
    createTimetable: async ({ baseUrl, apikey, token }, { title, year, semester }) => {
      const response = await fetch(`${baseUrl}/v1/tables`, {
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
    updateLecture: async ({ baseUrl, apikey, token }, { id, lecture_id }, body) => {
      const response = await fetch(`${baseUrl}/v1/tables/${id}/lecture/${lecture_id}`, {
        headers: {
          'x-access-apikey': apikey,
          'x-access-token': token,
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'PUT',
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as FullTimetable;
    },
    createLecture: async ({ baseUrl, apikey, token }, { id }, body) => {
      const response = await fetch(`${baseUrl}/v1/tables/${id}/lecture`, {
        headers: {
          'x-access-apikey': apikey,
          'x-access-token': token,
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'POST',
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as FullTimetable;
    },
    deleteLecture: async ({ baseUrl, apikey, token }, { id, lecture_id }) => {
      const response = await fetch(`${baseUrl}/v1/tables/${id}/lecture/${lecture_id}`, {
        headers: { 'x-access-apikey': apikey, 'x-access-token': token },
        method: 'DELETE',
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as FullTimetable;
    },
    addLecture: async ({ baseUrl, apikey, token }, { id, lecture_id }) => {
      const response = await fetch(`${baseUrl}/v1/tables/${id}/lecture/${lecture_id}`, {
        headers: {
          'x-access-apikey': apikey,
          'x-access-token': token,
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'POST',
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as FullTimetable;
    },
    updateTimetable: async ({ baseUrl, apikey, token }, { id }, body) => {
      const response = await fetch(`${baseUrl}/v1/tables/${id}`, {
        headers: {
          'x-access-apikey': apikey,
          'x-access-token': token,
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'PUT',
        body: JSON.stringify(body),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as Timetable[];
    },
  };
};

export const timetableRepository = getTimetableRepository();
