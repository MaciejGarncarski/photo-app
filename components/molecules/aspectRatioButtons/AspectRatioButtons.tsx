import { Button } from '@/components/atoms/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { Heading } from '@/components/atoms/heading/Heading';

import styles from './aspectRatioButtons.module.scss';

type ButtonData = {
  text: string;
  aspectRatio: number;
};
const buttonData: Array<ButtonData> = [
  { text: 'square', aspectRatio: 1 },
  { text: 'portrait', aspectRatio: 4 / 5 },
  { text: 'landscape', aspectRatio: 1.91 / 1 },
];

type AspectRatioButtonsProps = {
  setAspect: (aspect: number) => void;
  aspect: number;
};

export const AspectRatioButtons = ({ setAspect, aspect }: AspectRatioButtonsProps) => {
  return (
    <CreatePostItemContainer>
      <Heading tag="h2">Type of crop</Heading>
      <div className={styles.aspectRatioButtons}>
        {buttonData.map(({ text, aspectRatio }) => {
          return (
            <Button
              className={styles.button}
              variant={aspectRatio === aspect ? undefined : 'secondary'}
              onClick={() => setAspect(aspectRatio)}
              key={aspectRatio}
            >
              {text}
            </Button>
          );
        })}
      </div>
    </CreatePostItemContainer>
  );
};
