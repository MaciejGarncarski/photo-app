export type PostImage = {
  id: number;
  fileId: string;
  name: string;
  url: string;
  thumbnailUrl: string;
  width: number;
  height: number;
  size: number;
};

export type PostDetails = {
  createdAt: Date;
  id: number;
  authorId: string;
  commentsCount: number;
  likesCount: number;
  images: PostImage[];
  description: string;
  isLiked: boolean;
};

export type CreatePostInput = {
  description: string;
  images: Array<Blob | null>;
};
