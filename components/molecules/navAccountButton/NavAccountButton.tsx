import clsx from 'clsx';
import { AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { useUser } from '@/hooks/useUser';

import { Avatar } from '@/components/atoms/avatar/Avatar';
import { NavAccountMenu } from '@/components/atoms/navAccountMenu/NavAccountMenu';
import { VisuallyHiddenText } from '@/components/atoms/visuallyHiddenText/VisuallyHiddenText';
import { useCloseTooltip } from '@/components/molecules/navAccountButton/useCloseTooltip';

import styles from './navAccountButton.module.scss';
import commonStyles from '@/components/molecules/navButtons/navButtons.module.scss';

export const NavAccountButton = () => {
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLLIElement>(null);

  const { session } = useAuth();
  const { username, id, isLoading } = useUser({ userId: session?.user?.id ?? '' });
  const { isGoingUp } = useScrollPosition();
  const { isMobile } = useScreenWidth();

  useCloseTooltip(containerRef.current, setIsOptionsOpen);

  const handleOpen = () => setIsOptionsOpen(true);
  const handleClose = () => setIsOptionsOpen(false);
  const canShowOnScroll = (isMobile && isGoingUp) || !isMobile;

  return (
    <li
      ref={containerRef}
      onMouseOver={isMobile ? undefined : handleOpen}
      onFocus={isMobile ? undefined : handleOpen}
      onMouseLeave={handleClose}
      onBlur={handleClose}
      data-testid="button"
      className={commonStyles.accountIconContainer}
    >
      <button
        type="button"
        onClick={() => setIsOptionsOpen((prev) => !prev)}
        className={clsx(commonStyles.listItemChild, styles.button)}
      >
        <VisuallyHiddenText text={`@${username}`} />
        <Avatar className={styles.avatar} userId={isLoading ? undefined : id} />
      </button>

      <AnimatePresence>
        {isOptionsOpen && canShowOnScroll && (
          <NavAccountMenu onClick={() => setIsOptionsOpen(false)} userId={session?.user?.id ?? ''} />
        )}
      </AnimatePresence>
    </li>
  );
};
