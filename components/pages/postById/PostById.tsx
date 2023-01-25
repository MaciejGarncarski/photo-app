type PropsTypes = {
  postId: number;
};

export const PostById = ({ postId }: PropsTypes) => {
  return <p>im a post with id: {postId}</p>;
};
