import type { ApiClient } from '@/clients/api';
import type { CourseBook } from '@/entities/semester';

export interface SemesterRepository {
  getCourseBooks(): Promise<CourseBook[]>;
}

type Deps = { clients: [ApiClient] };
export const getSemesterRepository = ({ clients: [apiClient] }: Deps): SemesterRepository => {
  return {
    getCourseBooks: async () => (await apiClient.get<CourseBook[]>(`/v1/course_books`)).data,
  };
};
