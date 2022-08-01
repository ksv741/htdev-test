import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useActions, useTypedSelector } from 'src/store';
import { PostInStoreType } from 'store/reducers/post/types';

const SinglePostPage = () => {
  const {postId} = useParams();
  const {posts} = useTypedSelector(state => state.post);
  const {removePost, removePostMessage} = useActions();
  const navigation = useNavigate();
  const [post, setPost] = useState<PostInStoreType | null>(null);

  useEffect(() => {
    const candidate = posts.find(p => p.id === postId);
    if (candidate) setPost(candidate);
  }, []);

  const removePostHandler = () => {
    post?.id && removePost(post.id);
    navigation('/');
    removePostMessage('Пост удален');
  };

  if (!post) {
    return (
      <Typography component='div'>
        <h2>There are no post with id {postId}</h2>
        <Typography variant='h6' component='div'><Link to='/' replace>You can create post</Link></Typography>
        <Typography variant='h6' component='div'><Link to='/posts' replace>Or watch posts list</Link></Typography>
      </Typography>
    );
  }

  return (
    <div>
      <Typography variant='h6' component='div'><Link to='/posts' replace>All posts</Link></Typography>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            {post.sign}
          </Typography>
          <Typography variant='h6' component='span'>
            Пост № {posts.findIndex(p => p.id === post.id) + 1}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {post.date[Object.keys(post.date)[0]].datetime}
          </Typography>
          <Typography variant='body2' component='p'>
            {post.text}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size='small' onClick={removePostHandler}>Удалить</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default SinglePostPage;
