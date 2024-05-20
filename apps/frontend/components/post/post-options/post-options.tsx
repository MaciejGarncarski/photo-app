import { PencilSimple, Trash, X } from "@phosphor-icons/react";

import { useOnEscape } from "@/hooks/use-on-escape";

import { ListModal } from "@/components/modals/list-modal/list-modal";
import { ListModalItem } from "@/components/modals/list-modal-item/list-modal-item";
import { usePostOptions } from "@/components/post/post-options/use-post-options";

type Props = {
  closeModal: () => void;
  openConfirmation: () => void;
  authorId: string;
  postId: number;
  isVisible: boolean;
};

export const PostOptions = ({
  closeModal,
  authorId,
  postId,
  openConfirmation,
  isVisible,
}: Props) => {
  const { isAbleToModify } = usePostOptions({ authorId });
  useOnEscape({ callback: closeModal });

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
            icon={<PencilSimple />}
          >
            Edit
          </ListModalItem>
          <ListModalItem
            type="button"
            onClick={openConfirmation}
            icon={<Trash />}
          >
            Delete
          </ListModalItem>
        </>
      )}
      <ListModalItem type="button" onClick={closeModal} icon={<X />}>
        Close
      </ListModalItem>
    </ListModal>
  );
};
