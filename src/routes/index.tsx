import CreatePostPage from 'pages/CreatePostPage';
import PostListPage from 'pages/PostListPage';
import SinglePostPage from 'pages/SinglePostPage';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export default () => (
  <Routes>
    <Route path='/' element={<CreatePostPage/>}/>
    <Route path='posts' element={<PostListPage />}/>
    <Route path='post/:postId' element={<SinglePostPage />}/>

    <Route path='*' element={<Navigate to='/'/>}/>
  </Routes>
);
