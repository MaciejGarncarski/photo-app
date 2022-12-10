import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlinePlusSquare,
  AiOutlineShareAlt,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

import { Children } from '@/components/Layout/Layout';

export const Icon = ({ children }: Children) => <>{children}</>;

const HeartActive = () => <AiFillHeart />;

const Heart = () => <AiOutlineHeart />;

const Comment = () => <AiOutlineMessage />;

const Bookmark = () => <BsBookmark style={{ transform: 'scale(0.85)' }} />;

const BookmarkActive = () => <BsBookmarkFill style={{ transform: 'scale(0.85)' }} />;

const Share = () => <AiOutlineShareAlt />;

Icon.HeartActive = HeartActive;
Icon.Heart = Heart;
Icon.Comment = Comment;
Icon.Bookmark = Bookmark;
Icon.BookmarkActive = BookmarkActive;
Icon.Share = Share;

const Home = () => <AiOutlineHome />;

const Create = () => <AiOutlinePlusSquare />;

const Account = () => <AiOutlineUser />;

Icon.Home = Home;
Icon.Create = Create;
Icon.Account = Account;
