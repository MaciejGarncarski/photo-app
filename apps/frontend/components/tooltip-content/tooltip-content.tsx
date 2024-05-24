import * as Tooltip from "@radix-ui/react-tooltip";
import { type ReactNode, Ref } from "react";

import styles from "./tooltip-content.module.scss";

type Props = {
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
} & Tooltip.TooltipContentProps;

export const TooltipContent = ({ children, ref, ...otherProps }: Props) => {
  return (
    <Tooltip.Content
      forceMount
      sideOffset={5}
      asChild
      ref={ref}
      {...otherProps}
    >
      <div className={styles.tooltipContent}>
        {children}
        <Tooltip.Arrow className={styles.tooltipArrow} />
      </div>
    </Tooltip.Content>
  );
};
