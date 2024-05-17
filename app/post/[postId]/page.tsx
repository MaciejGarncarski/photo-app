import type { Metadata } from "next";

import { getPageTitle } from "@/utils/get-page-title";

import { PostById } from "@/components/pages/post-by-id/post-by-id";
import { APP_URL } from "@/constants";
import { getPost } from "@/services/posts.service";
import { getUser } from "@/services/user.service";

type Props = {
  params: { postId: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { postId } = params;

  const { data: post } = await getPost(
    { postId: postId },
    { cache: "no-cache" },
  );

  const postData = post.data;

  if (!postData) {
    return {
      title: getPageTitle("Post"),
    };
  }
  const {
    data: { data: userData },
  } = await getUser({ userId: postData.authorId }, { cache: "no-cache" });

  const image = postData.images[0];

  return {
    title: getPageTitle(`@${userData.username} post`),
    metadataBase: new URL("https://ik.imagekit.io"),
    description: postData.description,
    openGraph: {
      title: getPageTitle(`@${userData.username} post`),
      description: postData.description,
      url: APP_URL,
      siteName: "Photo App",
      locale: "en_GB",
      type: "article",
      images: [
        {
          alt: `${userData.username} post. Description: ${postData.description}`,
          url: image.thumbnailUrl,
          width: image.width,
          height: image.height,
        },
      ],
    },
  };
};

const PostPage = async () => {
  return <PostById />;
};

export default PostPage;
