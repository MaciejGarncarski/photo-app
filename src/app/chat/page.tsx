import { dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/src/utils/get-query-client';
import { Hydrate } from '@/src/utils/hydrate';

import { Chat } from '@/src/components/pages/chat/chat';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';
import { getChatUsers } from '@/src/services/chat.service';
import { getSessionUserServer, getUser } from '@/src/services/user.service';

const ChatPage = async () => {
  const queryClient = getQueryClient();

  try {
    const sessionUser = await getSessionUserServer();
    const users = await queryClient.fetchInfiniteQuery({
      queryKey: ['chat users', sessionUser.id, ''],
      queryFn: async ({ pageParam = 0 }) =>
        getChatUsers({ pageParam, searchedUser: '' }),
      initialPageParam: 0,
      staleTime: 6000,
    });

    await Promise.all(
      users.pages.map(async ({ users }) => {
        await Promise.all(
          users.map(async (user) => {
            await queryClient.prefetchQuery({
              queryKey: ['user', user],
              queryFn: () => getUser({ userId: user }),
            });
          }),
        );
      }),
    );

    await Promise.all(users.pages);
  } catch (error) {}

  return (
    <Hydrate state={dehydrate(queryClient)}>
      <ProtectedPage sessionNeeded={true}>
        <Chat />
      </ProtectedPage>
    </Hydrate>
  );
};

export default ChatPage;
