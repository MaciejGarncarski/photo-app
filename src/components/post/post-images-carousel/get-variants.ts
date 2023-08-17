import { Variants } from 'framer-motion';

type GetVariantsArguments = {
  currentIndex: number;
  width: number;
};

export const getVariants = ({ currentIndex, width }: GetVariantsArguments) => {
  const listVariants: Variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: -1 * currentIndex * width,
      transition: {
        ease: 'easeInOut',
      },
    },
    exit: { x: currentIndex * width },
  };

  return listVariants;
};
