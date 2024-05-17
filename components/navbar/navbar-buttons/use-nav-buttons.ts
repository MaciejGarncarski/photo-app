import {
  Chat,
  House,
  type Icon,
  PlusCircle,
  User,
} from "@phosphor-icons/react";

type ListData = {
  icon: Icon;
  title: string;
  href: string;
  shouldShowWhileGuest: boolean;
};

export const getNavListData = (username?: string | null) => {
  const navButtonsList: Array<ListData> = [
    {
      icon: House,
      title: "Home",
      href: "/",
      shouldShowWhileGuest: true,
    },
    {
      icon: Chat,
      title: "Chat",
      href: "/chat",
      shouldShowWhileGuest: false,
    },
    {
      icon: PlusCircle,
      title: "Create post",
      href: "/create-post",
      shouldShowWhileGuest: false,
    },
    {
      icon: User,
      title: "Profile",
      href: `/${username}`,
      shouldShowWhileGuest: false,
    },
  ];

  return { navButtonsList };
};
