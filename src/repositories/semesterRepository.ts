type CourseBook = { year: number; semester: 1 | 2 | 3 | 4; updated_at: string };

export interface SemesterRepository {
  getCourseBooks(args: { baseUrl: string }): Promise<CourseBook[]>;
}

const getSemesterRepository = (): SemesterRepository => {
  return {
    getCourseBooks: async ({ baseUrl }) => {
      const response = await fetch(`${baseUrl}/course_books`);
      const data = await response.json().catch(() => null);
      if (!response.ok) throw data;
      return data as CourseBook[];
    },
  };
};

export const semesterRepository = getSemesterRepository();
