import PostTab, { PostTabTitleProps } from 'components/UI/PostTab/PostTab';
import CreatePostPage from 'pages/CreatePostPage';
import PostListPage from 'pages/PostListPage';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const location = useLocation();

  useEffect(() => {
    getTimeZones();
  }, []);

  useEffect(() => {
    if (location.pathname.includes('/posts')) setActiveTab(PostTabLayoutPages.POSTS);
    else setActiveTab(PostTabLayoutPages.CREATE);
  }, [location]);

  return (
    <PostTab titles={tabsHeaders} defaultActiveTab={activeTab}>
      <CreatePostPage/>
      <PostListPage/>
    </PostTab>
  );
};

export default PostTabLayout;
