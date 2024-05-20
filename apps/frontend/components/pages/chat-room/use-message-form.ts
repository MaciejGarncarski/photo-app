import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { useAuth } from "@/hooks/use-auth";

import {
  type AddChatMessage,
  addChatMessageSchema,
} from "@/schemas/chat.schema";
import { addChatMessage } from "@/services/chat.service";

export type MessageMutation = {
  senderId: string;
  receiverId: string;
  message: string;
};

export const messageMutationKey = ["new chat message"];

type UseMessageFormArguments = {
  friendId?: string;
};

export const useMessageForm = ({ friendId }: UseMessageFormArguments) => {
  const { sessionUser } = useAuth();

  const messageMutation = useMutation({
    mutationKey: messageMutationKey,
    mutationFn: (body: MessageMutation) => {
      return addChatMessage(body);
    },

    onSuccess: () => {
      form.setValue("text", "");
    },
  });

  const form = useForm<AddChatMessage>({
    mode: "all",
    resolver: zodResolver(addChatMessageSchema),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit = form.handleSubmit(({ text }) => {
    if (!friendId) {
      return;
    }

    messageMutation.mutate({
      message: text,
      senderId: sessionUser?.id || "",
      receiverId: friendId,
    });
  });

  return useMemo(() => {
    return {
      form,
      onSubmit,
    };
  }, [form, onSubmit]);
};
