import { rest } from 'msw';

import { Color } from '@/entities/color';
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

  rest.get<never, never, { message: 'ok'; colors: Color[]; names: string[] }>(`*/colors/vivid_ios`, (req, res, ctx) => {
    return res(
      ctx.json({
        message: 'ok',
        colors: [
          { fg: '#ffffff', bg: '#e54459' },
          { fg: '#ffffff', bg: '#f58d3d' },
          { fg: '#ffffff', bg: '#fac52d' },
          { fg: '#ffffff', bg: '#a6d930' },
          { fg: '#ffffff', bg: '#2bc366' },
          { fg: '#ffffff', bg: '#1bd0c9' },
          { fg: '#ffffff', bg: '#1d99e9' },
          { fg: '#ffffff', bg: '#4f48c4' },
          { fg: '#ffffff', bg: '#af56b3' },
        ],
        names: ['석류', '감귤', '들국', '완두', '비취', '지중해', '하늘', '라벤더', '자수정'],
      }),
    );
  }),
];
