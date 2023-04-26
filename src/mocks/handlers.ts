import { DefaultBodyType, PathParams, rest } from 'msw';

import { MockedUser, mockedUser } from '@/src/utils/tests/mockedData';

export const handlers = [
  rest.get<DefaultBodyType, PathParams<string>, MockedUser>('http://localhost:3001/api/auth/me', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockedUser));
  }),
];
