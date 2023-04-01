import { IconEdit, IconTrash } from '@tabler/icons-react';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';
import { PostData } from '@/utils/apis/transformPost';
import { unlock } from '@/utils/bodyLock';

import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';
import { ListModal } from '@/components/organisms/listModal/ListModal';
import { ListModalItem } from '@/components/organisms/listModal/ListModalItem';

type PropsTypes = {
  close: () => void;
  post: PostData;
  openCnonfirmation: () => void;
  isVisible: boolean;
};

export const PostOptions = ({ close, post, openCnonfirmation, isVisible }: PropsTypes) => {
  const { author, postId } = post;
  const { session } = useAuth();
  const { id, role } = useUser({ userId: session?.user?.id ?? '' });

  const isAbleToModify = author.id === id || role === 'ADMIN';

  return (
    <ListModal isVisible={isVisible} close={close} headingText="Post options">
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
      <ListModalItem isLast type="button" onClick={close} icon={<IconXWrapper />}>
        Close
      </ListModalItem>
    </ListModal>
  );
};
