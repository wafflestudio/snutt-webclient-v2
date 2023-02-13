import { DefaultBodyType, PathParams, ResponseResolver, RestContext, RestRequest } from 'msw';

import { CoreServerError } from '@/entities/error';

import { mockUsers } from '../fixtures/user';

type Options = { token: boolean };

export const withValidateAccess = <
  ReqBody extends DefaultBodyType,
  Param extends PathParams<keyof Param>,
  ResBody extends DefaultBodyType | CoreServerError,
>(
  callback: ResponseResolver<RestRequest<ReqBody, Param>, RestContext, ResBody | CoreServerError>,
  options: Partial<Options> = {},
): ResponseResolver<RestRequest<ReqBody, Param>, RestContext, ResBody | CoreServerError> => {
  const isValidateToken = options.token ?? true;

  return (req, res, ctx) => {
    const xApiKey = req.headers.get('x-access-apikey');
    const xToken = req.headers.get('x-access-token');

    if (xApiKey !== 'test')
      return res(ctx.status(403), ctx.json({ ext: {}, message: 'invalid api key', errcode: 8192 }));

    if (isValidateToken && mockUsers.every((u) => u.auth.token !== xToken))
      return res(ctx.status(403), ctx.json({ ext: {}, message: 'Failed to authenticate token', errcode: 8194 }));

    return callback(req, res, ctx);
  };
};
