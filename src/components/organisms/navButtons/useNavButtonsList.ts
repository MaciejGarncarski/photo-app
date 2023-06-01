import {
  IconHome,
  IconMessageCircle2,
  IconSquareRoundedPlus,
  IconUser,
  TablerIconsProps,
} from '@tabler/icons-react';

type ListData = {
  icon: (props: TablerIconsProps) => JSX.Element;
  title: string;
  href: string;
  shouldShowWhileGuest: boolean;
};

export const getNavListData = (username?: string | null) => {
  const navButtonsList: Array<ListData> = [
    {
      icon: IconHome,
      title: 'Home',
      href: '/',
      shouldShowWhileGuest: true,
    },
    {
      icon: IconMessageCircle2,
      title: 'Chat',
      href: '/chat',
      shouldShowWhileGuest: false,
    },
    {
      icon: IconSquareRoundedPlus,
      title: 'Create post',
      href: '/create-post',
      shouldShowWhileGuest: false,
    },
    {
      icon: IconUser,
      title: 'Profile',
      href: `/${username}`,
      shouldShowWhileGuest: false,
    },
  ];

  return { navButtonsList };
};
