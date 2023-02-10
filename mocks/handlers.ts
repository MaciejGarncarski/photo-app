import { DefaultBodyType, PathParams, rest } from 'msw';

import { Account } from '@/components/pages/account/useUser';

export const handlers = [
  rest.get<DefaultBodyType, PathParams<string>, Account>('http://localhost/api/account/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: {
          id: 'clb9cuwar0000hgo7wembhg3c',
          email: 'maciejg@mackovic.com',
          emailVerified: null,
          name: 'Maciej Garncarski',
          username: 'maciek',
          bio: 'Lorem\r\n\r\n\r\n\r\n\r\n\r\nIpsum',
          image: 'https://lh3.googleusercontent.com/a/ALm5wu38HG7zeOC1Ho2635jvsXMobLw_T8PbgEUeRIeN=s96-c',
          customImage: 'https://ik.imagekit.io/798lkemwe/clb9cuwar0000hgo7wembhg3c/avatar/custom/_1_To4e1xFxjD.webp',
          role: 'ADMIN',
          created_at: new Date('2022-12-21T15:42:16.000Z'),
        },
        count: {
          posts: 9,
          followers: 2,
          following: 2,
        },
        isFollowing: false,
      }),
    );
  }),

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