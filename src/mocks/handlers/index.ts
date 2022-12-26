import { rest } from 'msw';

import { CourseBook } from '@/entities/semester';

export const handlers = [
  rest.get<never, never, CourseBook[]>(`*/course_books`, (req, res, ctx) => {
    return res(
      ctx.json([
        { year: 1001, semester: 1, updated_at: '' },
        { year: 2001, semester: 2, updated_at: '' },
        { year: 3001, semester: 4, updated_at: '' },
        { year: 4001, semester: 3, updated_at: '' },
      ]),
    );
  }),
];
