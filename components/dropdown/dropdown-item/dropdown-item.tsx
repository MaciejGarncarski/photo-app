import { IconContext } from "@phosphor-icons/react";
import * as Dropdown from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./dropdown-item.module.scss";

type Props = {
  children: ReactNode;
  variant: "primary" | "destructive";
} & Dropdown.DropdownMenuItemProps;

export const DropdownItem = ({ children, variant, ...otherProps }: Props) => {
  return (
    <Dropdown.Item
      className={clsx(styles[variant], styles.item)}
      {...otherProps}
    >
      <IconContext.Provider
        value={{
          weight: "regular",
          size: 17,
        }}
      >
        {children}
      </IconContext.Provider>
    </Dropdown.Item>
  );
};
