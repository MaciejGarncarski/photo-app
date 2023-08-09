import { DefaultBodyType, PathParams, rest } from 'msw';

import { MockedUser, mockedUser } from '@/src/utils/tests/mocked-data';

export const handlers = [
  rest.get<DefaultBodyType, PathParams<string>, MockedUser>(
    'http://localhost:3001/api/auth/me',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockedUser));
    },
  ),
  rest.get<DefaultBodyType, PathParams<string>, MockedUser>(
    'http://localhost:3001/api/users/mockedUser',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockedUser));
    },
  ),
];
