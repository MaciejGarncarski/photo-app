import { motion } from 'framer-motion';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Button } from '@/components/buttons/button/button';
import { getButtonList } from '@/components/forms/create-post-form/create-post-form.data';
import { PostDetails } from '@/components/pages/create-post/create-post-schema';
import { TextArea } from '@/components/textarea/text-area';

import styles from './create-post-form.module.scss';

type Props = {
  onSubmit: () => void;
  errors: FieldErrors<PostDetails>;
  disabled: boolean;
  openModal: () => void;
  register: UseFormRegister<PostDetails>;
};

export const CreatePostForm = ({
  disabled,
  errors,
  onSubmit,
  openModal,
  register,
}: Props) => {
  const buttonList = getButtonList(openModal, disabled);

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <TextArea
        label="Description"
        placeholder="Type in post description"
        rows={6}
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
