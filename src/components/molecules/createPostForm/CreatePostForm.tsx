import { motion } from 'framer-motion';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Button } from '@/src/components/atoms/buttons/button/Button';
import { Heading } from '@/src/components/atoms/heading/Heading';
import { TextArea } from '@/src/components/atoms/textArea/TextArea';

import { getButtonList } from '@/src/components/molecules/createPostForm/buttonList';

import { PostDetails } from '@/src/components/pages/createPost/types';

import styles from './CreatePostForm.module.scss';

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
