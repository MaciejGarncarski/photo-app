import { IconEdit, IconTrash } from '@tabler/icons';

import { IconStarWrapper } from '@/components/atoms/icons/IconStarWrapper';
import { IconXWrapper } from '@/components/atoms/icons/IconXWrapper';
import { ListModal } from '@/components/molecules/listModal/ListModal';
import { ListModalItem } from '@/components/molecules/listModal/ListModalItem';
import { useCollectionMutation } from '@/components/molecules/postOptions/useCollectionMutation';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';
import { PostData } from '@/components/pages/collection/useCollection';

type PostOptionsProps = {
  close: () => void;
  post: PostData;
  openCnonfirmation: () => void;
};

export const PostOptions = ({ close, post, openCnonfirmation }: PostOptionsProps) => {
  const { id, isInCollection, author } = post;
  const { session } = useAuth();
  const { data } = useAccount({ userId: session?.user?.id ?? '' });
  const collectionMutation = useCollectionMutation();

  const isAbleToModify = author.id === data?.user?.id || data?.user?.role === 'ADMIN';

  const handleCollection = () => {
    collectionMutation.mutate({ type: isInCollection ? 'remove' : undefined, postId: id });
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
