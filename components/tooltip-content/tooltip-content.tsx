import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { forwardRef, type ReactNode } from "react";

import styles from "./tooltip-content.module.scss";

type Props = {
  children: ReactNode;
} & Tooltip.TooltipContentProps;

export const TooltipContent = forwardRef<HTMLDivElement, Props>(
  ({ children, ...otherProps }, ref) => {
    return (
      <Tooltip.Content
        forceMount
        sideOffset={5}
        asChild
        ref={ref}
        {...otherProps}
      >
        <motion.div
          className={styles.tooltipContent}
          initial={{
            scale: 0.5,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            y: -5,
          }}
        >
          {children}
          <Tooltip.Arrow className={styles.tooltipArrow} />
        </motion.div>
      </Tooltip.Content>
    );
  },
);
