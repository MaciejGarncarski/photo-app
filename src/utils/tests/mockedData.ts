import { UserApiResponse } from '@/src/pages/api/account/userId/[userId]';

export const mockedUser: UserApiResponse = {
  id: 'clb9cuwar0000hgo7wembhg3c',
  email: 'maciejg@mackovic.com',
  name: 'Maciej Garncarski',
  username: 'maciek',
  bio: 'Lorem\r\n\r\n\r\n\r\n\r\n\r\nIpsum',
  image: 'https://lh3.googleusercontent.com/a/ALm5wu38HG7zeOC1Ho2635jvsXMobLw_T8PbgEUeRIeN=s96-c',
  customImage: 'https://ik.imagekit.io/798lkemwe/clb9cuwar0000hgo7wembhg3c/avatar/custom/_1_To4e1xFxjD.webp',
  createdAt: new Date('2022-12-21T15:42:16.000Z'),
  postsCount: 9,
  followersCount: 2,
  friendsCount: 2,
  isFollowing: false,
  role: 'USER',
};
