import PostTab, { PostTabTitleProps } from 'components/UI/PostTab/PostTab';
import CreatePostPage from 'pages/CreatePostPage';
import PostListPage from 'pages/PostListPage';
import React, { useEffect } from 'react';
import { useActions } from 'src/store';

const tabsHeaders: PostTabTitleProps[] = [
  {value: 'Создать запись', href: '/'},
  {value: 'Записи', href: '/posts'},
];

export enum PostTabLayoutPages {
  CREATE,
  POSTS,
}

interface PostTabLayoutProps {
  defaultActiveTab?: number;
}

const PostTabLayout: React.FC<PostTabLayoutProps> = ({defaultActiveTab = 0}) => {
  const {getTimeZones} = useActions();

  useEffect(() => {
    getTimeZones();
  }, []);

  return (
    <PostTab titles={tabsHeaders} defaultActiveTab={defaultActiveTab}>
      <CreatePostPage/>
      <PostListPage/>
    </PostTab>
  );
};

export default PostTabLayout;
