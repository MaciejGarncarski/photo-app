import { dehydrate } from '@tanstack/react-query';

import { getQueryClient } from '@/src/utils/api/get-query-client';
import { Hydrate } from '@/src/utils/api/hydrate';

import { Chat } from '@/src/components/pages/chat/chat';
import { ProtectedPage } from '@/src/components/pages/protected-page/protected-page';
import { getSessionUserServer } from '@/src/services/auth.service';
import { getChatUsers } from '@/src/services/chat.service';
import { getUser } from '@/src/services/user.service';

const ChatPage = async () => {
  const queryClient = getQueryClient();

  try {
    const sessionUser = await getSessionUserServer();
    const users = await queryClient.fetchInfiniteQuery({
      queryKey: ['chat users', sessionUser.id, ''],
      queryFn: async ({ pageParam }) => {
        const data = await getChatUsers({
          skip: pageParam.toString(),
        });

        if (!data['data']) {
          throw new Error('No data');
        }

        return data['data'];
      },
      initialPageParam: 0,
      staleTime: 6000,
    });

    await Promise.all(
      users.pages.map(async ({ data }) => {
        if (!data) {
          return null;
        }

        await Promise.all(
          data.users.map(async (userData) => {
            await queryClient.prefetchQuery({
              queryKey: ['user', userData.id],
              queryFn: async () => {
                const userRequest = await getUser({ userId: userData.id });
                if (!userRequest.data) {
                  throw new Error('no user');
                }
                return userRequest.data;
              },
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
