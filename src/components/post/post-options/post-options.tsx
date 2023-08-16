import { IconEdit, IconTrash, IconX } from '@tabler/icons-react';

import { ListModal } from '@/src/components/modals/list-modal/list-modal';
import { ListModalItem } from '@/src/components/modals/list-modal/list-modal-item';
import { usePostOptions } from '@/src/components/post/post-options/use-post-options';

type Props = {
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
}: Props) => {
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
      <ListModalItem isLast type="button" onClick={closeModal} icon={<IconX />}>
        Close
      </ListModalItem>
    </ListModal>
  );
};