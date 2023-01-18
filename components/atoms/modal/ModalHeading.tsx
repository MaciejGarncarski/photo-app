import clsx from 'clsx';

import styles from './modal.module.scss';

type ModalHeadingProps = {
  variant?: 'red';
  text: string;
};

export const ModalHeading = ({ text, variant }: ModalHeadingProps) => {
  const className = clsx(variant && styles[`heading-${variant}`], styles.heading);

  return <h3 className={className}>{text}</h3>;
};
