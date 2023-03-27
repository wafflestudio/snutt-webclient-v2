import type { ApiClient } from '@/clients/api';
import type { Semester } from '@/entities/semester';
import type { CreateLectureRequest, FullTimetable, Timetable, UpdateLectureRequest } from '@/entities/timetable';

export interface TimetableRepository {
  getTimetables(args: { token: string }): Promise<Timetable[]>;
  getFullTimetable(args: { token: string }, params: { id: string }): Promise<FullTimetable>;
  createTimetable(
    args: { token: string },
    params: { title: string; year: number; semester: Semester },
  ): Promise<Timetable[]>;
  deleteTimetable(args: { token: string }, params: { id: string }): Promise<Timetable[]>;
  updateLecture(
    args: { token: string },
    params: { id: string; lecture_id: string },
    data: UpdateLectureRequest,
  ): Promise<FullTimetable>;
  createLecture(args: { token: string }, params: { id: string }, data: CreateLectureRequest): Promise<FullTimetable>;
  deleteLecture(args: { token: string }, params: { id: string; lecture_id: string }): Promise<FullTimetable>;
  addLecture(args: { token: string }, params: { id: string; lecture_id: string }): Promise<FullTimetable>;
  updateTimetable(args: { token: string }, params: { id: string }, data: { title: string }): Promise<Timetable[]>;
}

type Deps = { clients: [ApiClient] };
export const getTimetableRepository = ({ clients: [apiClient] }: Deps): TimetableRepository => {
  return {
    getTimetables: async ({ token }) =>
      (await apiClient.get<Timetable[]>('/v1/tables', { headers: { 'x-access-token': token } })).data,
    getFullTimetable: async ({ token }, { id }) =>
      (await apiClient.get<FullTimetable>(`/v1/tables/${id}`, { headers: { 'x-access-token': token } })).data,
    deleteTimetable: async ({ token }, { id }) =>
      (await apiClient.delete<Timetable[]>(`/v1/tables/${id}`, { headers: { 'x-access-token': token } })).data,
    createTimetable: async ({ token }, { title, year, semester }) =>
      (
        await apiClient.post<Timetable[]>(
          '/v1/tables',
          { title, year, semester },
          { headers: { 'x-access-token': token } },
        )
      ).data,
    updateLecture: async ({ token }, { id, lecture_id }, body) =>
      (
        await apiClient.put<FullTimetable>(`/v1/tables/${id}/lecture/${lecture_id}`, body, {
          headers: { 'x-access-token': token },
        })
      ).data,
    createLecture: async ({ token }, { id }, body) =>
      (await apiClient.post<FullTimetable>(`/v1/tables/${id}/lecture`, body, { headers: { 'x-access-token': token } }))
        .data,
    deleteLecture: async ({ token }, { id, lecture_id }) =>
      (
        await apiClient.delete<FullTimetable>(`/v1/tables/${id}/lecture/${lecture_id}`, {
          headers: { 'x-access-token': token },
        })
      ).data,
    addLecture: async ({ token }, { id, lecture_id }) =>
      (
        await apiClient.post<FullTimetable>(`/v1/tables/${id}/lecture/${lecture_id}`, undefined, {
          headers: { 'x-access-token': token },
        })
      ).data,
    updateTimetable: async ({ token }, { id }, body) =>
      (await apiClient.put<Timetable[]>(`/v1/tables/${id}`, body, { headers: { 'x-access-token': token } })).data,
  };
};
