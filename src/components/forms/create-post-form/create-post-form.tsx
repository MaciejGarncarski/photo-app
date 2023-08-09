import { motion } from 'framer-motion';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Button } from '@/src/components/buttons/button/button';
import { getButtonList } from '@/src/components/forms/create-post-form/create-post-form.data';
import { PostDetails } from '@/src/components/pages/create-post/types';
import { TextArea } from '@/src/components/textarea/text-area';
import { Heading } from '@/src/components/typography/heading/heading';

import styles from './create-post-form.module.scss';

type PropsTypes = {
  onSubmit: () => void;
  errors: FieldErrors<PostDetails>;
  disabled: boolean;
  openModal: () => void;
  isEmpty: boolean;
  register: UseFormRegister<PostDetails>;
};

export const CreatePostForm = ({
  disabled,
  errors,
  onSubmit,
  openModal,
  isEmpty,
  register,
}: PropsTypes) => {
  const buttonList = getButtonList(openModal, disabled);

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Heading tag="h2" size="medium">
        3. Info about post
      </Heading>
      <TextArea
        isEmpty={isEmpty}
        label="description"
        {...register('description')}
        error={errors.description?.message}
      />
      <div className={styles.actionButtons}>
        {buttonList.map(({ text, disabled, onClick, type, variant }) => (
          <Button
            key={text}
            disabled={disabled}
            onClick={onClick}
            type={type}
            variant={variant}
          >
            {text}
          </Button>
        ))}
      </div>
    </motion.form>
  );
};
