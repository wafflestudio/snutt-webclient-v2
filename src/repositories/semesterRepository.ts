import { CourseBook } from '@/entities/semester';

export interface SemesterRepository {
  getCourseBooks(args: { baseUrl: string; apikey: string }): Promise<CourseBook[]>;
}

const getSemesterRepository = (): SemesterRepository => {
  return {
    getCourseBooks: async ({ baseUrl, apikey }) => {
      const response = await fetch(`${baseUrl}/course_books`, { headers: { 'x-access-apikey': apikey } });
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as CourseBook[];
    },
  };
};

export const semesterRepository = getSemesterRepository();
