import { rest } from 'msw';

import { CourseBook } from '@/entities/semester';
import { FullTimetable, Timetable } from '@/entities/timetable';

import { mockTimeTable, mockTimeTable123, mockTimeTable456, mockTimeTable789 } from '../fixtures/timetable';

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

  rest.get<never, never, Timetable[]>(`*/tables`, (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id: '123',
          year: 1001,
          semester: 1,
          title: '나의 시간표',
          updated_at: '2022-10-16T05:17:41.499Z',
          total_credit: 0,
        },
        {
          _id: '456',
          year: 1001,
          semester: 1,
          title: '나무의 시간표',
          updated_at: '2022-11-26T14:18:05.110Z',
          total_credit: 3,
        },
        {
          _id: '789',
          year: 2001,
          semester: 2,
          title: '나비의 시간표',
          updated_at: '2022-10-16T05:25:43.381Z',
          total_credit: 0,
        },
      ]),
    );
  }),

  rest.get<never, { id: string }, FullTimetable>(`*/tables/:id`, (req, res, ctx) => {
    const { id } = req.params;
    if (id === '123') return res(ctx.json(mockTimeTable123));
    if (id === '456') return res(ctx.json(mockTimeTable456));
    if (id === '789') return res(ctx.json(mockTimeTable789));

    return res(ctx.json(mockTimeTable));
  }),
];
