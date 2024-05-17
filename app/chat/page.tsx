import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query';
import type { Metadata } from 'next';

import { getPageTitle } from '@/utils/get-page-title';

import { Chat } from '@/components/pages/chat/chat';
import { ProtectedPage } from '@/components/pages/protected-page/protected-page';
import { getChatUsers } from '@/services/chat.service';
import { getUser } from '@/services/user.service';

export const metadata: Metadata = {
  title: getPageTitle('Chat'),
};

const ChatPage = async () => {
  const queryClient = new QueryClient();

  try {
    const users = await queryClient.fetchInfiniteQuery({
      queryKey: ['chat users'],
      queryFn: async ({ pageParam }) => {
        const data = await getChatUsers({
          skip: pageParam.toString(),
        });

        if (!data.data) {
          throw new Error('No data');
        }

        return data.data;
      },
      initialPageParam: 0,
    });

    await Promise.all(
      users.pages.map(async ({ data }) => {
        if (!data) {
          return null;
        }

        await Promise.all(
          data.users.map(async (userData) => {
            await queryClient.prefetchQuery({
              queryKey: ['user', userData.userId],
              queryFn: async () => {
                const userRequest = await getUser({ userId: userData.userId });
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
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProtectedPage sessionNeeded={true}>
        <Chat />
      </ProtectedPage>
    </HydrationBoundary>
  );
};

export default ChatPage;
