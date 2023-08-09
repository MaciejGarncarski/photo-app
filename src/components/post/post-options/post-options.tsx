import { IconEdit, IconTrash } from '@tabler/icons-react';

import { IconXWrapper } from '@/src/components/atoms/icons/IconXWrapper';

import { ListModal } from '@/src/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/src/components/organisms/listModal/ListModalItem';
import { usePostOptions } from '@/src/components/organisms/post/postOptions/usePostOptions';

type PropsTypes = {
  closeModal: () => void;
  openCnonfirmation: () => void;
  authorId: string;
  postId: number;
  isVisible: boolean;
};

export const PostOptions = ({
  closeModal,
  authorId,
  postId,
  openCnonfirmation,
  isVisible,
}: PropsTypes) => {
  const { isAbleToModify } = usePostOptions({ authorId });

  return (
    <ListModal
      isVisible={isVisible}
      closeModal={closeModal}
      headingText="Post options"
    >
      {isAbleToModify && (
        <>
          <ListModalItem
            type="link"
            href={`/post/${postId}/edit`}
            icon={<IconEdit />}
          >
            Edit
          </ListModalItem>
          <ListModalItem
            type="button"
            onClick={openCnonfirmation}
            icon={<IconTrash />}
          >
            Delete
          </ListModalItem>
        </>
      )}
      <ListModalItem
        isLast
        type="button"
        onClick={closeModal}
        icon={<IconXWrapper />}
      >
        Close
      </ListModalItem>
    </ListModal>
  );
};
