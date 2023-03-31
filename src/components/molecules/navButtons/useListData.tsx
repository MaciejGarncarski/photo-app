import { IconHome, IconMessageCircle2, IconSquareRoundedPlus, IconUser } from '@tabler/icons-react';

import { useAuth } from '@/hooks/useAuth';

import { ListData } from '@/components/molecules/navButtons/NavButtons';

export const useListData = () => {
  const { sessionUserData } = useAuth();

  const listData: Array<ListData> = [
    {
      icon: <IconHome />,
      title: 'Home',
      href: '/',
      shouldShowWhileGuest: true,
    },
    {
      icon: <IconMessageCircle2 />,
      title: 'Chat',
      href: '/chat',
      shouldShowWhileGuest: false,
    },
    {
      icon: <IconSquareRoundedPlus />,
      title: 'Create post',
      href: '/create-post',
      shouldShowWhileGuest: false,
    },
    {
      icon: <IconUser />,
      title: 'Profile',
      href: `/${sessionUserData.username}`,
      shouldShowWhileGuest: false,
    },
  ];

  return { listData };
};
