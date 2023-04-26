import { apiClient } from '@/src/utils/apiClient';

type User = {
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

export const getNewestUsers = async () => {
  const { data } = await apiClient.get<Array<User>>('home/newest-users');
  return data;
};
