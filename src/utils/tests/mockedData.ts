export type MockedUser = {
  id: string;
  email: string | null;
  emailVerified: Date | null;
  name: string | null;
  password: string | null;
  username: string | null;
  bio: string | null;
  image: string | null;
  customImage: string | null;
  role: 'ADMIN' | 'USER';
  created_at: Date;
};

export const mockedUser = {
  id: 'clb9cuwar0000hgo7wembhg3c',
  name: 'Maciej Garncarski',
  username: 'maciek',
  bio: 'Lorem\r\n\r\n\r\n\r\n\r\n\r\nIpsum',
  image:
    'https://lh3.googleusercontent.com/a/ALm5wu38HG7zeOC1Ho2635jvsXMobLw_T8PbgEUeRIeN=s96-c',
  customImage:
    'https://ik.imagekit.io/798lkemwe/clb9cuwar0000hgo7wembhg3c/avatar/custom/_1_To4e1xFxjD.webp',
  created_at: new Date('2022-12-21T15:42:16.000Z'),
  email: '',
  emailVerified: new Date(),
  password: '',
  role: 'USER',
} satisfies MockedUser;
