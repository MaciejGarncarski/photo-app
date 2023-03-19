import { motion } from 'framer-motion';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { Button } from '@/components/atoms/buttons/button/Button';
import { CreatePostItemContainer } from '@/components/atoms/createPostItemContainer/CreatePostItemContainer';
import { Heading } from '@/components/atoms/heading/Heading';
import { TextArea } from '@/components/atoms/textArea/TextArea';
import { getButtonList } from '@/components/molecules/createPostForm/buttonList';
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
  const buttonList = getButtonList(open, disabled);

  return (
    <motion.form onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <CreatePostItemContainer>
        <Heading tag="h2">Info about post</Heading>
        <TextArea label="description" {...register('description')} error={errors.description} />
        <div className={styles.actionButtons}>
          {buttonList.map(({ text, disabled, onClick, type, variant }) => (
            <Button key={text} disabled={disabled} onClick={onClick} type={type} variant={variant}>
              {text}
            </Button>
          ))}
        </div>
      </CreatePostItemContainer>
    </motion.form>
  );
};
