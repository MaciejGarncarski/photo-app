import { DefaultBodyType, PathParams, rest } from 'msw';

import { mockedUser } from '@/src/utils/tests/mockedData';

import { UserApiResponse } from '@/src/pages/api/account/userId/[userId]';

export const handlers = [
  rest.get<DefaultBodyType, PathParams<string>, UserApiResponse>(
    'http://localhost/api/account/user',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockedUser));
    },
  ),
  rest.get<DefaultBodyType, PathParams<string>, UserApiResponse>(
    'http://localhost/api/account/clb9cuwar0000hgo7wembhg3c',
    (req, res, ctx) => {
      return res(ctx.status(200), ctx.json(mockedUser));
    },
  ),

  rest.delete('http://localhost/api/followers', (req, res, ctx) => {
    const followingUserId = req.url.searchParams.get('followingUserId');

    if (followingUserId === 'user') {
      return res(ctx.status(200), ctx.text('success'));
    }
  }),

  rest.put('http://localhost/api/followers', (req, res, ctx) => {
    return res(ctx.status(200), ctx.text('success'));
  }),
];
