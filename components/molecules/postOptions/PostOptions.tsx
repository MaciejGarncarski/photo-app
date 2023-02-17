import { IconEdit, IconTrash } from '@tabler/icons';

import { useAuth } from '@/hooks/useAuth';
import { useUser } from '@/hooks/useUser';

import { IconStarWrapper } from '@/components/atoms/icons/IconStarWrapper';
import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';
import { ListModal } from '@/components/molecules/listModal/ListModal';
import { ListModalItem } from '@/components/molecules/listModal/ListModalItem';
import { useCollectionMutation } from '@/components/molecules/postOptions/useCollectionMutation';
import { PostData } from '@/components/pages/collection/useCollection';

type PostOptionsProps = {
  close: () => void;
  post: PostData;
  openCnonfirmation: () => void;
};

export const PostOptions = ({ close, post, openCnonfirmation }: PostOptionsProps) => {
  const { postId, isInCollection, author } = post;
  const { session } = useAuth();
  const { id, role } = useUser({ userId: session?.user?.id ?? '' });
  const collectionMutation = useCollectionMutation();

  const isAbleToModify = author.id === id || role === 'ADMIN';

  const handleCollection = () => {
    collectionMutation.mutate({ type: isInCollection ? 'remove' : undefined, postId });
  };

  return (
    <ListModal close={close} headingText="Post options">
      <ListModalItem
        isLoading={collectionMutation.isLoading}
        loadingText={isInCollection ? 'Removing...' : 'Saving...'}
        icon={<IconStarWrapper isActive={Boolean(isInCollection)} />}
        type="button"
        onClick={handleCollection}
      >
        {isInCollection ? 'Remove from collection' : 'Save to collection'}
      </ListModalItem>

      {isAbleToModify && (
        <>
          <ListModalItem type="link" href={`/post/${id}/edit`} icon={<IconEdit />}>
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
