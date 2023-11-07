import { buttonData } from '@/src/components/buttons/aspect-ratio-buttons/aspect-ratio-buttons.data';
import { Button } from '@/src/components/buttons/button/button';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './aspect-ratio-buttons.module.scss';

type Props = {
  setAspect: (aspect: number) => void;
  aspect: number;
};

export const AspectRatioButtons = ({ setAspect, aspect }: Props) => {
  return (
    <section className={styles.container}>
      <Heading tag="h3" size="small">
        Preferred aspect ratio
      </Heading>
      <div className={styles.aspectRatioButtons}>
        {buttonData.map(({ text, aspectRatio }) => {
          return (
            <Button
              type="button"
              variant={aspectRatio === aspect ? 'primary' : 'secondary'}
              onClick={() => setAspect(aspectRatio)}
              key={aspectRatio}
            >
              {text}
            </Button>
          );
        })}
      </div>
    </section>
  );
};
