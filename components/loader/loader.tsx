"use client";

import { CircleNotch } from "@phosphor-icons/react";
import clsx from "clsx";

import styles from "./loader.module.scss";

type Props = {
  size: "small" | "big";
  color: "accent" | "primary";
  marginTop?: boolean;
};

export const Loader = ({ size, color, marginTop }: Props) => {
  return (
    <span
      className={clsx(
        marginTop && styles.marginTop,
        styles[color],
        styles[size],
        styles.loading,
      )}
      aria-busy="true"
      aria-live="polite"
    >
      <CircleNotch />
      <span className="visually-hidden">Loading</span>
    </span>
  );
};
