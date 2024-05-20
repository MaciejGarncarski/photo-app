"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FloppyDisk, SignOut } from "@phosphor-icons/react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { useModal } from "@/hooks/use-modal";

import { Button } from "@/components/buttons/button/button";
import { Loader } from "@/components/loader/loader";
import { ConfirmationDialog } from "@/components/modals/confirmation-dialog/confirmation-dialog";
import { usePost } from "@/components/pages/account/use-post";
import { PostDetailsSchema } from "@/components/pages/create-post/create-post";
import { useEditPost } from "@/components/pages/edit-post/use-edit-post";
import { TextArea } from "@/components/textarea/text-area";
import { Heading } from "@/components/typography/heading/heading";

import styles from "./edit-post.module.scss";

export const EditPost = () => {
  const router = useRouter();
  const params = useParams();
  const postId = Number.parseInt(params?.postId as string);
  const { data, isPending } = usePost({ postId });
  const { mutate } = useEditPost({ postId });
  const saveModal = useModal();
  const cancelModal = useModal();

  const {
    formState: { errors, isDirty },
    register,
    getValues,
  } = useForm({
    mode: "all",
    resolver: zodResolver(PostDetailsSchema),
    defaultValues: {
      description: data?.description ?? "",
    },
  });

  if (!data?.description || isPending) {
    return <Loader color="accent" size="big" marginTop />;
  }

  const onSubmit = () => {
    const { description } = getValues();
    mutate({ description }, { onSettled: saveModal.closeModal });
  };

  const cancelChanges = () => {
    router.back();
  };

  return (
    <section className={styles.editPost}>
      <Heading tag="h2" size="big">
        Edit post
      </Heading>
      <form className={styles.form}>
        <TextArea
          label="Description"
          placeholder="Type in new description"
          {...register("description")}
          rows={6}
          error={errors.description?.message}
        />
        <div className={styles.buttons}>
          <Button
            type="button"
            variant="secondary"
            onClick={cancelModal.openModal}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={!isDirty || Boolean(errors.description)}
            onClick={saveModal.openModal}
          >
            Save
          </Button>
        </div>
      </form>
      <ConfirmationDialog
        isVisible={cancelModal.isModalOpen}
        text="Abort editing?"
        closeModal={cancelModal.closeModal}
      >
        <Button variant="destructive" onClick={cancelChanges}>
          Abort editing
          <SignOut />
        </Button>
        <Button variant="secondary" onClick={cancelModal.closeModal}>
          Cancel
        </Button>
      </ConfirmationDialog>
      <ConfirmationDialog
        isVisible={saveModal.isModalOpen}
        text="Save changes?"
        closeModal={saveModal.closeModal}
      >
        <Button variant="primary" onClick={onSubmit}>
          Save
          <FloppyDisk />
        </Button>
        <Button variant="secondary" onClick={saveModal.closeModal}>
          Cancel
        </Button>
      </ConfirmationDialog>
    </section>
  );
};
