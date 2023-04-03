import { IconEdit, IconTrash } from '@tabler/icons-react';

import { useAuth } from '@/src/hooks/useAuth';
import { useUser } from '@/src/hooks/useUser';
import { PostData } from '@/src/utils/apis/transformPost';
import { unlock } from '@/src/utils/bodyLock';

import { IconXWrapper } from '@/src/components/atoms/icons/IconXWrapper';

import { ListModal } from '@/src/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/src/components/organisms/listModal/ListModalItem';

type PropsTypes = {
  closeModal: () => void;
  post: PostData;
  openCnonfirmation: () => void;
  isVisible: boolean;
};

export const PostOptions = ({ closeModal, post, openCnonfirmation, isVisible }: PropsTypes) => {
  const { author, postId } = post;
  const { session } = useAuth();
  const { id, role } = useUser({ userId: session?.user?.id ?? '' });

  const isAbleToModify = author?.id === id || role === 'ADMIN';

  return (
    <ListModal isVisible={isVisible} closeModal={closeModal} headingText="Post options">
      {isAbleToModify && (
        <>
          <ListModalItem type="link" href={`/post/${postId}/edit`} icon={<IconEdit />} onClick={unlock}>
            Edit
          </ListModalItem>
          <ListModalItem type="button" onClick={openCnonfirmation} icon={<IconTrash />}>
            Delete post
          </ListModalItem>
        </>
      )}
      <ListModalItem isLast type="button" onClick={closeModal} icon={<IconXWrapper />}>
        Close
      </ListModalItem>
    </ListModal>
  );
};
