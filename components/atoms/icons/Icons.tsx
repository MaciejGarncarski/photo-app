import {
  AiFillHeart,
  AiOutlineCheckCircle,
  AiOutlineClose,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineMessage,
  AiOutlinePlusCircle,
  AiOutlineShareAlt,
  AiOutlineUser,
} from 'react-icons/ai';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

import styles from './icons.module.scss';

import { Children } from '@/components/Layout/Layout';

export const Icon = ({ children }: Children) => <>{children}</>;

const HeartActive = () => <AiFillHeart className={styles.heartActive} />;
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
const Create = () => <AiOutlinePlusCircle />;
const Account = () => <AiOutlineUser />;
const Close = () => <AiOutlineClose />;
const Edit = () => <AiOutlineEdit />;
const Trash = () => <AiOutlineDelete />;
const Success = () => <AiOutlineCheckCircle />;

Icon.Home = Home;
Icon.Create = Create;
Icon.Account = Account;
Icon.Close = Close;
Icon.Edit = Edit;
Icon.Trash = Trash;
Icon.Success = Success;
