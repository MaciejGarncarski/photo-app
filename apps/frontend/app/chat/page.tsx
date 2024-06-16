import {
	dehydrate,
	HydrationBoundary,
	QueryClient,
} from '@tanstack/react-query'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getPageTitle } from '@/utils/get-page-title'
import { isAuthenticated } from '@/utils/is-authenticated'

import { Chat } from '@/components/pages/chat/chat'

export const metadata: Metadata = {
	title: getPageTitle('Chat'),
}

const ChatPage = async () => {
	const queryClient = new QueryClient()

	if (!(await isAuthenticated())) {
		redirect('/access-denied')
	}

	// try {
	//   const users = await queryClient.fetchInfiniteQuery({
	//     queryKey: ["chat users"],
	//     queryFn: async ({ pageParam }) => {
	//       const data = await getChatUsers({
	//         skip: pageParam.toString(),
	//       });

	//       if (!data.data) {
	//         throw new Error("No data");
	//       }

	//       return data.data;
	//     },
	//     initialPageParam: 0,
	//   });

	//   await Promise.all(
	//     users.pages.map(async ({ data }) => {
	//       if (!data) {
	//         return null;
	//       }

	//       await Promise.all(
	//         data.users.map(async (userData) => {
	//           await queryClient.prefetchQuery({
	//             queryKey: ["user", userData.userId],
	//             queryFn: async () => {
	//               const userRequest = await getUser({ userId: userData.userId });
	//               if (!userRequest.data) {
	//                 throw new Error("no user");
	//               }
	//               return userRequest.data;
	//             },
	//           });
	//         })
	//       );
	//     })
	//   );

	//   await Promise.all(users.pages);
	// } catch (error) {}

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Chat />
		</HydrationBoundary>
	)
}

export default ChatPage
