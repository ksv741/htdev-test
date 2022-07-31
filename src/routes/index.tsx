import PostTabLayout, { PostTabLayoutPages } from 'components/PostTabLayout/PostTabLayout';
import SinglePostPage from 'pages/SinglePostPage';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export default () => (
  <Routes>
    <Route path='/' element={<PostTabLayout defaultActiveTab={PostTabLayoutPages.CREATE}/>}/>
    <Route path='posts' element={<PostTabLayout defaultActiveTab={PostTabLayoutPages.POSTS}/>}/>
    <Route path='post/:postId' element={<SinglePostPage />}/>

    <Route path='*' element={<Navigate to='/'/>}/>
  </Routes>
);
