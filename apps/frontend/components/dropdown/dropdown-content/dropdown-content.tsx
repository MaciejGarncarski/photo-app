import * as Dropdown from "@radix-ui/react-dropdown-menu";
import { motion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

import styles from "./dropdown-content.module.scss";

type Props = {
  children: ReactNode;
} & Dropdown.DropdownMenuContentProps;

export const DropdownContent = forwardRef<HTMLDivElement, Props>(
  ({ children, ...otherProps }, ref) => {
    return (
      <Dropdown.Content
        asChild
        ref={ref}
        {...otherProps}
        onEscapeKeyDown={(ev) => ev.stopPropagation()}
      >
        <motion.div
          className={styles.content}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
          <Dropdown.Arrow className={styles.arrow} />
        </motion.div>
      </Dropdown.Content>
    );
  }
);
