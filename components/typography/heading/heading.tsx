import clsx from "clsx";
import type { ReactNode } from "react";

import styles from "./heading.module.scss";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type Sizes = "small" | "medium" | "big";

type Props = {
  tag: HeadingTag;
  children: ReactNode;
  size: Sizes;
};

export const Heading = ({
  children,
  size,
  tag: Tag = "h2",
  ...rest
}: Props) => {
  return (
    <Tag className={clsx(styles[size], styles.heading)} {...rest}>
      {children}
    </Tag>
  );
};
