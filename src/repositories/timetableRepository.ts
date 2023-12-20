import type { ApiClient } from '@/clients/api';
import type { Semester } from '@/entities/semester';
import type { CreateLectureRequest, FullTimetable, Timetable, UpdateLectureRequest } from '@/entities/timetable';

export interface TimetableRepository {
  getTimetables(): Promise<Timetable[]>;
  getFullTimetable(params: { id: string }): Promise<FullTimetable>;
  createTimetable(params: { title: string; year: number; semester: Semester }): Promise<Timetable[]>;
  deleteTimetable(params: { id: string }): Promise<Timetable[]>;
  updateLecture(params: { id: string; lecture_id: string }, data: UpdateLectureRequest): Promise<FullTimetable>;
  createLecture(params: { id: string }, data: CreateLectureRequest): Promise<FullTimetable>;
  deleteLecture(params: { id: string; lecture_id: string }): Promise<FullTimetable>;
  addLecture(params: { id: string; lecture_id: string }): Promise<FullTimetable>;
  updateTimetable(params: { id: string }, data: { title: string }): Promise<Timetable[]>;
}

type Deps = { clients: [ApiClient] };
export const getTimetableRepository = ({ clients: [apiClient] }: Deps): TimetableRepository => {
  return {
    getTimetables: async () => (await apiClient.get<Timetable[]>('/v1/tables')).data,
    getFullTimetable: async ({ id }) => (await apiClient.get<FullTimetable>(`/v1/tables/${id}`)).data,
    deleteTimetable: async ({ id }) => (await apiClient.delete<Timetable[]>(`/v1/tables/${id}`)).data,
    createTimetable: async ({ title, year, semester }) =>
      (await apiClient.post<Timetable[]>('/v1/tables', { title, year, semester })).data,
    updateLecture: async ({ id, lecture_id }, body) =>
      (await apiClient.put<FullTimetable>(`/v1/tables/${id}/lecture/${lecture_id}`, body)).data,
    createLecture: async ({ id }, body) => (await apiClient.post<FullTimetable>(`/v1/tables/${id}/lecture`, body)).data,
    deleteLecture: async ({ id, lecture_id }) =>
      (await apiClient.delete<FullTimetable>(`/v1/tables/${id}/lecture/${lecture_id}`)).data,
    addLecture: async ({ id, lecture_id }) =>
      (await apiClient.post<FullTimetable>(`/v1/tables/${id}/lecture/${lecture_id}`, undefined)).data,
    updateTimetable: async ({ id }, body) => (await apiClient.put<Timetable[]>(`/v1/tables/${id}`, body)).data,
  };
};
