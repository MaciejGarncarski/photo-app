"use client";

import { GearSix } from "@phosphor-icons/react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";

import { SignInButton } from "@/components/buttons/sign-in-button/sign-in-button";
import { getNavListData } from "@/components/navbar/navbar-buttons/use-nav-buttons";
import { useSettingsAtom } from "@/components/settings-modal/use-settings-atom";

import styles from "./navbar-buttons.module.scss";

export const NavButtons = () => {
  const { sessionUser, isPending, isSignedIn } = useAuth();
  const paths = usePathname();

  const [currentPathname] = paths
    .split("/")
    .filter((el, idx) => idx === 1)
    .map((el) => `/${el}`);

  const { navButtonsList } = getNavListData(sessionUser?.username);
  const { isSettingsOpen, setSettingsOpen } = useSettingsAtom();

  return (
    <>
      <ul className={styles.list}>
        {navButtonsList.map(
          ({ icon: Icon, href, title, shouldShowWhileGuest }) => {
            if (!shouldShowWhileGuest && !isSignedIn) {
              return null;
            }

            const isActive = currentPathname === href && !isSettingsOpen;

            return (
              <li key={title} className={styles.listItem}>
                <Link
                  href={href}
                  className={clsx(
                    {
                      [styles.active]: isActive,
                    },
                    styles.listItemContent
                  )}
                >
                  <span className={styles.icon}>
                    <Icon weight={isActive ? "fill" : "bold"} />
                  </span>
                  <span className={styles.title}>{title}</span>
                </Link>
              </li>
            );
          }
        )}
        <li className={styles.listItem}>
          <button
            data-cy="settings button"
            type="button"
            className={clsx(
              {
                [styles.active]: isSettingsOpen,
              },
              styles.listItemContent
            )}
            onClick={() => setSettingsOpen(true)}
          >
            <span className={styles.icon}>
              <GearSix weight={isSettingsOpen ? "fill" : "bold"} />
            </span>
            <span className={styles.title}>settings</span>
          </button>
        </li>
      </ul>
      {(!isSignedIn || isPending) && (
        <div className={styles.signInButton}>
          <SignInButton />
        </div>
      )}
    </>
  );
};
