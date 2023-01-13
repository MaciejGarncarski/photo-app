import { useState } from 'react';

import { Icon } from '@/components/atoms/icons/Icons';
import { Loading } from '@/components/atoms/loading/Loading';
import { Modal } from '@/components/atoms/modal/Modal';
import { ConfirmationModal } from '@/components/molecules/confirmationModal/ConfirmationModal';
import { useCollectionMutation } from '@/components/molecules/postOptions/useCollectionMutation';
import { useDeletePost } from '@/components/molecules/postOptions/useDeletePost';
import { useAuth } from '@/components/organisms/signIn/useAuth';
import { useAccount } from '@/components/pages/account/useAccount';
import { PostData } from '@/components/pages/collection/useCollection';

type PostOptionsProps = {
  setIsOpen: (isOpen: boolean) => void;
  post: PostData;
};

export const PostOptions = ({ setIsOpen, post }: PostOptionsProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const { id, isInCollection, author } = post;
  const collectionMutation = useCollectionMutation();
  const deletePostMutation = useDeletePost();
  const { session } = useAuth();
  const { data } = useAccount({ userId: session?.user?.id ?? '' });

  const isAbleToModify = author.id === data?.user?.id || data?.user?.role === 'ADMIN';

  const onModalClose = () => {
    setIsOpen(false);
  };

  const handleCollection = () => {
    collectionMutation.mutate({ type: isInCollection ? 'remove' : undefined, postId: id });
  };

  const handleDeletePost = () => {
    deletePostMutation.mutate({ postId: id });
  };

  if (deletePostMutation.isLoading) {
    return (
      <Modal.Overlay setOpen={setIsOpen}>
        <Modal.Container>
          <Modal.List>
            <Modal.ListItem isFirst>
              <Loading variants={['very-small']} />
              Deleting...
            </Modal.ListItem>
          </Modal.List>
        </Modal.Container>
      </Modal.Overlay>
    );
  }

  if (isDeleting) {
    return (
      <ConfirmationModal onCancel={() => setIsDeleting(false)} onConfirm={handleDeletePost} setIsOpen={setIsDeleting} />
    );
  }

  return (
    <Modal.Overlay setOpen={setIsOpen}>
      <Modal.Container>
        <Modal.Close onClose={onModalClose} />
        <Modal.List>
          {collectionMutation.isLoading ? (
            <Modal.ListItem isFirst>
              <Loading variants={['very-small']} />
              {isInCollection ? 'Removing...' : 'Saving...'}
            </Modal.ListItem>
          ) : (
            <Modal.ListItem withButton onClick={handleCollection} isFirst>
              {isInCollection ? (
                <>
                  <Icon.BookmarkActive />
                  Remove from collection
                </>
              ) : (
                <>
                  <Icon.Bookmark />
                  Save to collection
                </>
              )}
            </Modal.ListItem>
          )}

          {isAbleToModify && (
            <>
              <Modal.ListItem>
                <Icon.Edit />
                edit (not working)
              </Modal.ListItem>
              <Modal.ListItem withButton variant="red" onClick={() => setIsDeleting(true)}>
                <Icon.Trash />
                Delete post
              </Modal.ListItem>
            </>
          )}
          <Modal.ListItem withButton onClick={onModalClose}>
            <Icon.Close />
            Close
          </Modal.ListItem>
        </Modal.List>
      </Modal.Container>
    </Modal.Overlay>
  );
};
