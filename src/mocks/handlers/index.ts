import { rest } from 'msw';

import { Color } from '@/entities/color';
import { CourseBook } from '@/entities/semester';
import { FullTimetable, Timetable } from '@/entities/timetable';
import { SearchRepository } from '@/repositories/searchRepository';
import { UserRepository } from '@/repositories/userRepository';

import { mockVividIos } from '../fixtures/color';
import { mockTags } from '../fixtures/tag';
import {
  mockTimeTable,
  mockTimeTable123,
  mockTimeTable456,
  mockTimeTable789,
  mockTimeTables,
} from '../fixtures/timetable';
import { mockUser } from '../fixtures/user';

export const handlers = [
  rest.get<never, never, CourseBook[]>(`*/course_books`, (req, res, ctx) => {
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

    return res(
      ctx.json([
        { year: 1001, semester: 1, updated_at: '2022-12-28T12:45:17.509Z' },
        { year: 2001, semester: 2, updated_at: '2022-12-28T12:45:17.509Z' },
        { year: 3001, semester: 4, updated_at: '2022-12-28T12:45:17.509Z' },
        { year: 4001, semester: 3, updated_at: '2022-12-28T12:45:17.509Z' },
      ]),
    );
  }),

  rest.get<never, never, Timetable[]>(`*/tables`, (req, res, ctx) => {
    if (!req.headers.get('x-access-token')) return res(ctx.status(403));
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

    return res(ctx.json(mockTimeTables));
  }),

  rest.get<never, { id: string }, FullTimetable>(`*/tables/:id`, (req, res, ctx) => {
    if (!req.headers.get('x-access-token')) return res(ctx.status(403));
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

    const { id } = req.params;
    if (id === '123') return res(ctx.json(mockTimeTable123));
    if (id === '456') return res(ctx.json(mockTimeTable456));
    if (id === '789') return res(ctx.json(mockTimeTable789));

    return res(ctx.json(mockTimeTable));
  }),

  rest.get<never, never, { message: 'ok'; colors: Color[]; names: string[] }>(`*/colors/vivid_ios`, (req, res, ctx) => {
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

    return res(ctx.json(mockVividIos));
  }),

  rest.get<never, { year: string; semester: `${1 | 2 | 3 | 4}` }, Awaited<ReturnType<SearchRepository['getTags']>>>(
    `*/tags/:year/:semester`,
    (req, res, ctx) => {
      if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

      return res(ctx.json(mockTags));
    },
  ),

  rest.get<never, never, Awaited<ReturnType<UserRepository['getUserInfo']>>>(`/user/info`, (req, res, ctx) => {
    if (!req.headers.get('x-access-token')) return res(ctx.status(403));
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

    return res(ctx.json(mockUser));
  }),
];
