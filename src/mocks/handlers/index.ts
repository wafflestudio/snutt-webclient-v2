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
import { mockCourseBooks } from '@/mocks/fixtures/courseBook';
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

import { withValidateAccess } from '../utils/access';

export const handlers = [
  rest.get<never, never, CourseBook[] | CoreServerError>(
    `*/v1/course_books`,
    withValidateAccess((req, res, ctx) => res(ctx.json(mockCourseBooks)), { token: false }),
  ),

  rest.get<never, never, Timetable[] | CoreServerError>(
    `*/v1/tables`,
    withValidateAccess((req, res, ctx) => res(ctx.json(mockTimeTables))),
  ),

  rest.get<never, { id: string }, FullTimetable | CoreServerError>(
    `*/v1/tables/:id`,
    withValidateAccess((req, res, ctx) => {
      const { id } = req.params;

      if (id === '123') return res(ctx.json(mockTimeTable123));
      if (id === '456') return res(ctx.json(mockTimeTable456));
      if (id === '789') return res(ctx.json(mockTimeTable789));
      if (id === '101112') return res(ctx.json(mockTimeTable101112));

      return res(ctx.json(mockTimeTable));
    }),
  ),

  rest.put<{ title: string }, { id: string }, Timetable[] | CoreServerError>(
    `*/v1/tables/:id`,
    withValidateAccess(async (req, res, ctx) => {
      const { title } = await req.json();
      const { id } = req.params;

      if (mockTimeTables.every((t) => t._id !== id)) return res(ctx.status(404));
      return res(ctx.json(mockTimeTables.map((t) => (t._id === id ? { ...t, title } : t))));
    }),
  ),

  rest.get<never, never, { message: 'ok'; colors: Color[]; names: string[] } | CoreServerError>(
    `*/v1/colors/vivid_ios`,
    withValidateAccess((req, res, ctx) => res(ctx.json(mockVividIos)), { token: false }),
  ),

  rest.get<
    never,
    { year: string; semester: `${1 | 2 | 3 | 4}` },
    Awaited<ReturnType<SearchRepository['getTags']> | CoreServerError>
  >(
    `*/v1/tags/:year/:semester`,
    withValidateAccess(
      (req, res, ctx) => {
        const { year, semester } = req.params;

        if (!mockCourseBooks.some((cb) => cb.year === Number(year) && cb.semester === Number(semester)))
          return res(ctx.status(404), ctx.json({ errcode: 16384, message: 'not found', ext: {} }));

        return res(ctx.json(mockTags));
      },
      { token: false },
    ),
  ),

  rest.get<never, never, Awaited<ReturnType<UserRepository['getUserInfo']> | CoreServerError>>(
    `*/v1/user/info`,
    withValidateAccess((req, res, ctx) => {
      const token = req.headers.get('x-access-token');
      const user = mockUsers.find((u) => u.auth.token === token);

      if (!user) return res(ctx.status(403), ctx.json({ errcode: 8194, ext: {}, message: '' }));

      return res(ctx.json(user.info));
    }),
  ),

  rest.get<never, never, { count: number } | CoreServerError>(
    `*/v1/notification/count`,
    withValidateAccess((req, res, ctx) => res(ctx.json({ count: 3 }))),
  ),

  rest.get<never, never, Notification[] | CoreServerError>(
    `*/v1/notification`,
    withValidateAccess((req, res, ctx) => res(ctx.json(mockNotification))),
  ),

  rest.post<Partial<SearchFilter>, never, SearchResultLecture[] | CoreServerError>(
    `*/v1/search_query`,
    withValidateAccess((req, res, ctx) => res(ctx.json(mockSearchResult)), { token: false }),
  ),

  rest.post<{ title: string; year: number; semester: Semester }, never, Timetable[] | CoreServerError>(
    `*/v1/tables`,
    withValidateAccess(async (req, res, ctx) => {
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
    }),
  ),

  rest.put<
    Parameters<typeof timetableRepository['updateLecture']>[2],
    Parameters<typeof timetableRepository['updateLecture']>[1],
    FullTimetable | CoreServerError
  >(
    `*/v1/tables/:id/lecture/:lecture_id`,
    withValidateAccess(async (req, res, ctx) => {
      // TODO: 시간표 validation ?
      const { class_time_json } = await req.json();
      if (!class_time_json || !Array.isArray(class_time_json)) return res(ctx.status(400));

      const classTimeJson = class_time_json as { start: number; len: number; day: number }[];
      if (classTimeJson.some((c1, i1) => classTimeJson.some((c2, i2) => i1 !== i2 && isOverlap(c1, c2))))
        return res(
          ctx.status(403),
          ctx.json({ errcode: 12300, message: 'Lecture time overlapped', ext: { confirm_message: '' } }),
        );

      return res(ctx.status(200), ctx.json(mockTimeTable123));
    }),
  ),

  rest.post<
    Parameters<typeof timetableRepository['updateLecture']>[2],
    Parameters<typeof timetableRepository['updateLecture']>[1],
    FullTimetable | CoreServerError
  >(
    `*/v1/tables/:id/lecture`,
    withValidateAccess(async (req, res, ctx) => {
      // TODO: 시간표 validation ?
      const { class_time_json } = await req.json();
      if (!class_time_json || !Array.isArray(class_time_json)) return res(ctx.status(400));

      const classTimeJson = class_time_json as { start: number; len: number; day: number }[];
      if (classTimeJson.some((c1, i1) => classTimeJson.some((c2, i2) => i1 !== i2 && isOverlap(c1, c2))))
        return res(
          ctx.status(403),
          ctx.json({ errcode: 12300, message: 'Lecture time overlapped', ext: { confirm_message: '' } }),
        );

      return res(ctx.status(200), ctx.json(mockTimeTable123));
    }),
  ),

  rest.delete<never, { id: string }, Timetable[] | CoreServerError>(
    `*/v1/tables/:id`,
    withValidateAccess(async (req, res, ctx) => res(ctx.status(200), ctx.json(mockTimeTables))),
  ),

  rest.delete<never, { id: string; lectureId: string }, FullTimetable | CoreServerError>(
    `*/v1/tables/:id/lecture/:lectureId`,
    withValidateAccess(async (req, res, ctx) => res(ctx.status(200), ctx.json(mockTimeTable123)), { token: false }),
  ),

  rest.post<never, { id: string; lectureId: string }, FullTimetable | CoreServerError>(
    `*/v1/tables/:id/lecture/:lectureId`,
    withValidateAccess(async (req, res, ctx) => {
      const table =
        req.params.id === '123' ? mockTimeTable123 : req.params.id === '456' ? mockTimeTable456 : mockTimeTable789;
      const lecture = mockSearchResult.find((item) => item._id === req.params.lectureId);

      if (
        table.lecture_list
          .flatMap((ll) => ll.class_time_json)
          .some((t1, i1) => lecture?.class_time_json.some((t2, i2) => i1 !== i2 && isOverlap(t1, t2)))
      )
        return res(ctx.status(403), ctx.json({ errcode: 12300, message: '', ext: {} }));

      return res(ctx.status(200), ctx.json(mockTimeTable123));
    }),
  ),

  rest.post<{ id: string; password: string }, never, SignInResponse | CoreServerError>(
    `*/v1/auth/login_local`,
    withValidateAccess(
      async (req, res, ctx) => {
        const { id, password } = await req.json();
        const user = mockUsers.find((mockUser) => mockUser.info.local_id === id);

        if (!user) return res(ctx.status(403), ctx.json({ errcode: 8196, message: '', ext: {} }));

        if (user.auth.password !== password)
          return res(ctx.status(403), ctx.json({ errcode: 8197, message: '', ext: {} }));

        return res(ctx.json({ user_id: '여기뭐들어오는건지모르겠음', token: user.auth.token }));
      },
      { token: false },
    ),
  ),

  rest.post<{ email: string; message: string }, never, { message: 'ok' } | CoreServerError>(
    `*/v1/feedback`,
    withValidateAccess((req, res, ctx) => res(ctx.delay(300), ctx.json({ message: 'ok' })), { token: false }),
  ),

  rest.post<
    { id: string; password: string },
    never,
    { message: 'ok'; token: string; user_id: string } | CoreServerError
  >(
    `*/v1/auth/register_local`,
    withValidateAccess(
      async (req, res, ctx) => {
        const { id } = await req.json();

        if (mockUsers.some((u) => u.info.local_id === id))
          return res(ctx.status(403), ctx.json({ errcode: 12290, ext: {}, message: 'duplicate id' }));

        return res(ctx.status(200), ctx.json({ message: 'ok', token: 't1', user_id: '뭐냐이건' }));
      },
      { token: false },
    ),
  ),

  rest.delete<never, never, { message: 'ok' } | CoreServerError>(
    `*/v1/user/account`,
    withValidateAccess(async (req, res, ctx) => {
      const token = req.headers.get('x-access-token');

      if (mockUsers.every((u) => u.auth.token !== token)) return res(ctx.status(403));

      return res(ctx.json({ message: 'ok' }));
    }),
  ),

  rest.post<{ email: string }, never, { message: 'ok' } | CoreServerError>(
    `*/v1/auth/id/find`,
    withValidateAccess(
      async (req, res, ctx) => {
        const { email } = await req.json();

        if (!email)
          return res(ctx.status(400), ctx.json({ errcode: 0x1018, message: '이메일을 입력해주세요.', ext: {} }));
        if (mockUsers.every((u) => u.info.email !== email))
          return res(
            ctx.status(404),
            ctx.json({ errcode: 0x4004, message: '해당 이메일로 가입된 사용자가 없습니다.', ext: {} }),
          );

        return res(ctx.json({ message: 'ok' }));
      },
      { token: false },
    ),
  ),

  rest.post<{ user_id: string }, never, { email: string } | CoreServerError>(
    `*/v1/auth/password/reset/email/check`,
    withValidateAccess(
      async (req, res, ctx) => {
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
      { token: false },
    ),
  ),

  rest.post<{ user_email: string }, never, { message: 'ok' } | CoreServerError>(
    `*/v1/auth/password/reset/email/send`,
    withValidateAccess((req, res, ctx) => res(ctx.json({ message: 'ok' })), { token: false }),
  ),

  rest.post<{ user_email: string }, never, { message: 'ok' } | CoreServerError>(
    `*/v1/auth/password/reset/verification/code`,
    withValidateAccess(
      (req, res, ctx) => {
        type Status = 'expired' | 'no' | 'wrong' | 'success';

        const status = (req.cookies.TEST_AUTH_PASSWORD_RESET_STATUS ?? 'success') as Status;

        if (status === 'no') return res(ctx.status(409), ctx.json({ errcode: 0x2009, message: '', ext: {} }));
        if (status === 'expired') return res(ctx.status(401), ctx.json({ errcode: 0x2010, message: '', ext: {} }));
        if (status === 'wrong') return res(ctx.status(401), ctx.json({ errcode: 0x2011, message: '', ext: {} }));

        return res(ctx.json({ message: 'ok' }));
      },
      { token: false },
    ),
  ),

  rest.post<{ user_id: string; password: string }, never, { message: 'ok' } | CoreServerError>(
    `*/v1/auth/password/reset`,
    withValidateAccess((req, res, ctx) => res(ctx.json({ message: 'ok' })), { token: false }),
  ),

  rest.put<{ old_password: string; new_password: string }, never, { token: string } | CoreServerError>(
    `*/v1/user/password`,
    withValidateAccess(async (req, res, ctx) => {
      const token = req.headers.get('x-access-token');
      if (!token) return res(ctx.status(403));

      const { old_password } = await req.json();

      const user = mockUsers.find((u) => u.auth.token === token);
      if (!user) return res(ctx.status(403));
      if (user.auth.password !== old_password) return res(ctx.status(403));

      return res(ctx.json({ token }));
    }),
  ),

  rest.post<{ id: string; password: string }, never, { token: string } | CoreServerError>(
    `*/v1/user/password`,
    withValidateAccess(async (req, res, ctx) => {
      const token = req.headers.get('x-access-token');
      if (!token) return res(ctx.status(403));

      const { id } = await req.json();

      if (mockUsers.every((u) => u.auth.token !== token)) return res(ctx.status(403));
      if (mockUsers.some((u) => u.info.local_id === id))
        return res(ctx.status(403), ctx.json({ errcode: 12290, message: 'duplicate id', ext: {} }));

      return res(ctx.json({ token }));
    }),
  ),

  rest.delete<never, never, { token: string } | CoreServerError>(
    `*/v1/user/facebook`,
    withValidateAccess((req, res, ctx) => {
      const token = req.headers.get('x-access-token');

      const user = mockUsers.find((u) => u.auth.token === token);
      if (!user) return res(ctx.status(403));

      return res(ctx.json({ token: 't1' }));
    }),
  ),

  rest.post<{ fb_id: string; fb_token: string }, never, { token: string } | CoreServerError>(
    `*/v1/user/facebook`,
    withValidateAccess((req, res, ctx) => {
      const token = req.headers.get('x-access-token');

      const user = mockUsers.find((u) => u.auth.token === token);
      if (!user) return res(ctx.status(403));

      return res(ctx.json({ token: 't5' }));
    }),
  ),
];

const isOverlap = (
  c1: { start: number; len: number; day: number; _id?: string }, // c1 이 c2 보다 빠른 경우만 확인
  c2: { start: number; len: number; day: number; _id?: string }, // c1 < c2
) => {
  return c1.day === c2.day && c1.start <= c2.start && c1.start + c1.len > c2.start;
};
