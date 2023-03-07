import { motion } from 'framer-motion';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Button } from '@/components/atoms/buttons/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { Heading } from '@/components/atoms/heading/Heading';
import { TextArea } from '@/components/atoms/textArea/TextArea';
import { PostDetails } from '@/components/pages/createPost/types';

import styles from './createPostForm.module.scss';

type PropsTypes = {
  onSubmit: () => void;
  errors: FieldErrors<PostDetails>;
  disabled: boolean;
  open: () => void;
  register: UseFormRegister<PostDetails>;
};

export const CreatePostForm = ({ disabled, errors, onSubmit, open, register }: PropsTypes) => {
  return (
    <motion.form onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <CreatePostItemContainer>
        <Heading tag="h2">Info about post</Heading>
        <TextArea label="description" {...register('description')} error={errors.description} />
        <div className={styles.actionButtons}>
          <Button variant="secondary" onClick={open}>
            Cancel
          </Button>
          <Button type="submit" disabled={disabled}>
            Complete
          </Button>
        </div>
      </CreatePostItemContainer>
    </motion.form>
  );
};
