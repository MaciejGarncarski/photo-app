import { IconDoorExit, IconMoon, IconSun } from '@tabler/icons';

import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

import { ListModal } from '../listModal/ListModal';
import { ListModalItem } from '../listModal/ListModalItem';

type PropsTypes = {
  close: () => void;
};

export const Settings = ({ close }: PropsTypes) => {
  const { handleTheme, theme } = useTheme();
  const { sessionUserData } = useAuth();

  const ThemeButton = () => {
    if (theme === 'dark') {
      return <IconMoon />;
    }
    return <IconSun />;
  };

  return (
    <ListModal close={close} headingText={`Hi ${sessionUserData.username}`}>
      <ListModalItem type="button" onClick={handleTheme} icon={<ThemeButton />}>
        Current app theme: {theme}
      </ListModalItem>
      <ListModalItem type="button" onClick={() => console.log('xd')} isLast icon={<IconDoorExit />}>
        Sign Out
      </ListModalItem>
    </ListModal>
  );
};
