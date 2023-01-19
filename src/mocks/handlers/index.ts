import dayjs from 'dayjs';
import { rest } from 'msw';

import { SignInResponse } from '@/entities/auth';
import { Color } from '@/entities/color';
import { CoreServerError } from '@/entities/error';
import { Notification } from '@/entities/notification';
import { SearchFilter, SearchResultLecture } from '@/entities/search';
import { CourseBook, Semester } from '@/entities/semester';
import { FullTimetable, Timetable } from '@/entities/timetable';
import { mockVividIos } from '@/mocks/fixtures/color';
import { mockNotification } from '@/mocks/fixtures/notification';
import { mockSearchResult } from '@/mocks/fixtures/search';
import { mockTags } from '@/mocks/fixtures/tag';
import {
  mockTimeTable,
  mockTimeTable123,
  mockTimeTable456,
  mockTimeTable789,
  mockTimeTable101112,
  mockTimeTables,
} from '@/mocks/fixtures/timetable';
import { mockUsers } from '@/mocks/fixtures/user';
import { SearchRepository } from '@/repositories/searchRepository';
import { timetableRepository } from '@/repositories/timetableRepository';
import { UserRepository } from '@/repositories/userRepository';

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
    if (id === '101112') return res(ctx.json(mockTimeTable101112));

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

  rest.get<never, never, Awaited<ReturnType<UserRepository['getUserInfo']> | CoreServerError>>(
    `*/user/info`,
    (req, res, ctx) => {
      if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));
      const token = req.headers.get('x-access-token');
      if (!token) return res(ctx.status(403));

      const user = mockUsers.find((u) => u.auth.token === token);

      if (!user) return res(ctx.status(403), ctx.json({ errcode: 8194, ext: {}, message: '' }));

      return res(ctx.json(user.info));
    },
  ),

  rest.get<never, never, { count: number }>(`*/notification/count`, (req, res, ctx) => {
    if (!req.headers.get('x-access-token')) return res(ctx.status(403));
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

    return res(ctx.json({ count: 3 }));
  }),

  rest.get<never, never, Notification[]>(`*/notification`, (req, res, ctx) => {
    if (!req.headers.get('x-access-token')) return res(ctx.status(403));
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

    return res(ctx.json(mockNotification));
  }),

  rest.post<Partial<SearchFilter>, never, SearchResultLecture[]>(`*/search_query`, (req, res, ctx) => {
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

    return res(ctx.json(mockSearchResult));
  }),

  rest.post<{ title: string; year: number; semester: Semester }, never, Timetable[] | CoreServerError>(
    `*/tables`,
    async (req, res, ctx) => {
      if (!req.headers.get('x-access-token')) return res(ctx.status(403));
      if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

      try {
        const { title, year, semester } = await req.json();

        if (mockTimeTables.some((tt) => tt.title === title && tt.year === year && tt.semester === semester))
          return res(ctx.status(403), ctx.json({ errcode: 12291, message: 'duplicate timetable title', ext: {} }));

        const _id = `${Math.random()}`;
        const newTimetable = { _id, year, semester, title, total_credit: 0, updated_at: dayjs().format() };

        return res(ctx.json(mockTimeTables.concat(newTimetable)));
      } catch (err) {
        return res(ctx.status(400));
      }
    },
  ),

  rest.put<
    Parameters<typeof timetableRepository['updateLecture']>[2],
    Parameters<typeof timetableRepository['updateLecture']>[1],
    FullTimetable | CoreServerError
  >(`*/tables/:id/lecture/:lecture_id`, async (req, res, ctx) => {
    // TODO: 시간표 validation ?
    const { class_time_json } = await req.json();
    if (!class_time_json || !Array.isArray(class_time_json)) return res(ctx.status(400));

    const classTimeJson = class_time_json as { start: number; len: number; day: number }[];
    if (classTimeJson.some((c1) => classTimeJson.some((c2) => isOverlap(c1, c2))))
      return res(
        ctx.status(403),
        ctx.json({ errcode: 12300, message: 'Lecture time overlapped', ext: { confirm_message: '' } }),
      );

    return res(ctx.status(200), ctx.json(mockTimeTable123));
  }),

  rest.delete<never, { id: string }, Timetable[] | CoreServerError>(`*/tables/:id`, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockTimeTables));
  }),

  rest.delete<never, { id: string; lectureId: string }, FullTimetable>(
    `*/tables/:id/lecture/:lectureId`,
    async (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockTimeTable123));
    },
  ),

  rest.post<never, { id: string; lectureId: string }, FullTimetable | CoreServerError>(
    `*/tables/:id/lecture/:lectureId`,
    async (req, res, ctx) => {
      const table =
        req.params.id === '123' ? mockTimeTable123 : req.params.id === '456' ? mockTimeTable456 : mockTimeTable789;
      const lecture = mockSearchResult.find((item) => item._id === req.params.lectureId);

      if (
        table.lecture_list
          .flatMap((ll) => ll.class_time_json)
          .some((t1) => lecture?.class_time_json.some((t2) => isOverlap(t1, t2)))
      )
        return res(ctx.status(403), ctx.json({ errcode: 12300, message: '', ext: {} }));

      return res(ctx.status(200), ctx.json(mockTimeTable123));
    },
  ),

  rest.post<{ id: string; password: string }, never, SignInResponse | CoreServerError>(
    `*/auth/login_local`,
    async (req, res, ctx) => {
      if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

      const params = new URLSearchParams(await req.text());
      const id = params.get('id');
      const password = params.get('password');

      const user = mockUsers.find((mockUser) => mockUser.info.local_id === id);

      if (!user) {
        return res(ctx.status(403), ctx.json({ errcode: 8196, message: '', ext: {} }));
      }

      if (user.auth.password !== password) {
        return res(ctx.status(403), ctx.json({ errcode: 8197, message: '', ext: {} }));
      }

      return res(ctx.json({ user_id: '여기뭐들어오는건지모르겠음', token: user.auth.token }));
    },
  ),

  rest.post<{ email: string; message: string }, never, { message: 'ok' }>(`*/feedback`, async (req, res, ctx) => {
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));
    return res(ctx.delay(300), ctx.json({ message: 'ok' }));
  }),

  rest.post<
    { id: string; password: string },
    never,
    { message: 'ok'; token: string; user_id: string } | CoreServerError
  >(`*/auth/register_local`, async (req, res, ctx) => {
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));
    const { id } = await req.json();

    if (mockUsers.some((u) => u.info.local_id === id))
      return res(ctx.status(403), ctx.json({ errcode: 12290, ext: {}, message: 'duplicate id' }));

    return res(ctx.status(200), ctx.json({ message: 'ok', token: 't1', user_id: '뭐냐이건' }));
  }),

  rest.delete<never, never, { message: 'ok' }>(`*/user/account`, async (req, res, ctx) => {
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));
    const token = req.headers.get('x-access-token');

    if (mockUsers.every((u) => u.auth.token !== token)) return res(ctx.status(403));

    return res(ctx.json({ message: 'ok' }));
  }),

  rest.post<{ email: string }, never, { message: 'ok' } | CoreServerError>(`*/auth/id/find`, async (req, res, ctx) => {
    if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));
    const { email } = await req.json();
    if (!email) return res(ctx.status(400), ctx.json({ errcode: 0x1018, message: '이메일을 입력해주세요.', ext: {} }));
    if (mockUsers.every((u) => u.info.email !== email))
      return res(
        ctx.status(404),
        ctx.json({ errcode: 0x4004, message: '해당 이메일로 가입된 사용자가 없습니다.', ext: {} }),
      );

    return res(ctx.json({ message: 'ok' }));
  }),

  rest.post<{ user_id: string }, never, { email: string } | CoreServerError>(
    `*/auth/password/reset/email/check`,
    async (req, res, ctx) => {
      if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));
      const userId = (await req.json()).user_id;

      if (!userId)
        return res(ctx.status(400), ctx.json({ errcode: 0x1015, message: '등록된 이메일이 없습니다.', ext: {} }));

      const foundUser = mockUsers.find((u) => u.info.local_id === userId);

      if (!foundUser)
        return res(
          ctx.status(404),
          ctx.json({ errcode: 0x4004, message: '해당 아이디로 가입된 사용자가 없습니다.', ext: {} }),
        );

      const email = foundUser.info.email;

      if (!email)
        return res(ctx.status(404), ctx.json({ errcode: 0x4006, message: '등록된 이메일이 없습니다.', ext: {} }));

      return res(ctx.json({ email }));
    },
  ),

  rest.post<{ user_email: string }, never, { message: 'ok' } | CoreServerError>(
    `*/auth/password/reset/email/send`,
    async (req, res, ctx) => {
      if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

      return res(ctx.json({ message: 'ok' }));
    },
  ),

  rest.post<{ user_email: string }, never, { message: 'ok' } | CoreServerError>(
    `*/auth/password/reset/verification/code`,
    async (req, res, ctx) => {
      if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));
      type Status = 'expired' | 'no' | 'wrong' | 'success';

      const status = (req.cookies.TEST_AUTH_PASSWORD_RESET_STATUS ?? 'success') as Status;

      if (status === 'no') return res(ctx.status(409), ctx.json({ errcode: 0x2009, message: '', ext: {} }));
      if (status === 'expired') return res(ctx.status(401), ctx.json({ errcode: 0x2010, message: '', ext: {} }));
      if (status === 'wrong') return res(ctx.status(401), ctx.json({ errcode: 0x2011, message: '', ext: {} }));

      return res(ctx.json({ message: 'ok' }));
    },
  ),

  rest.post<{ user_id: string; password: string }, never, { message: 'ok' } | CoreServerError>(
    `*/auth/password/reset`,
    async (req, res, ctx) => {
      if (!req.headers.get('x-access-apikey')) return res(ctx.status(403));

      return res(ctx.json({ message: 'ok' }));
    },
  ),
];

const isOverlap = (
  c1: { start: number; len: number; day: number; _id?: string }, // c1 이 c2 보다 빠른 경우만 확인
  c2: { start: number; len: number; day: number; _id?: string }, // c1 < c2
) => {
  if (c1._id && c2._id && c1._id === c2._id) return false;
  return c1.day === c2.day && c1.start <= c2.start && c1.start + c1.len > c2.start;
};
