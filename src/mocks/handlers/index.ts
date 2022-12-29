import { rest } from 'msw';

import { Color } from '@/entities/color';
import { CourseBook } from '@/entities/semester';
import { FullTimetable, Timetable } from '@/entities/timetable';
import { SearchRepository } from '@/repositories/searchRepository';

import { mockVividIos } from '../fixtures/color';
import { mockTags } from '../fixtures/tag';
import {
  mockTimeTable,
  mockTimeTable123,
  mockTimeTable456,
  mockTimeTable789,
  mockTimeTables,
} from '../fixtures/timetable';

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
    return res(ctx.json(mockTimeTables));
  }),

  rest.get<never, { id: string }, FullTimetable>(`*/tables/:id`, (req, res, ctx) => {
    const { id } = req.params;
    if (id === '123') return res(ctx.json(mockTimeTable123));
    if (id === '456') return res(ctx.json(mockTimeTable456));
    if (id === '789') return res(ctx.json(mockTimeTable789));

    return res(ctx.json(mockTimeTable));
  }),

  rest.get<never, never, { message: 'ok'; colors: Color[]; names: string[] }>(`*/colors/vivid_ios`, (req, res, ctx) =>
    res(ctx.json(mockVividIos)),
  ),

  rest.get<never, { year: string; semester: `${1 | 2 | 3 | 4}` }, Awaited<ReturnType<SearchRepository['getTags']>>>(
    `*/tags/:year/:semester`,
    (req, res, ctx) => res(ctx.json(mockTags)),
  ),
];
