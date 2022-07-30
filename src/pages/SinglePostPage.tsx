import React from 'react';
import { useParams } from 'react-router-dom';

const SinglePostPage = () => {
  const {postId} = useParams();

  return (
    <div>
      <h1>Single post page with id {postId}</h1>
    </div>
  );
};

export default SinglePostPage;
