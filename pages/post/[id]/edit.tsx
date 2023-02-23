import { useRouter } from 'next/router';

import { string } from '@/utils/string';

import { EditPost } from '@/components/pages/editPost/EditPost';

const EditPostPage = () => {
  const router = useRouter();

  return <EditPost postId={Number(string(router.query.id))} />;
};

export default EditPostPage;
