import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTypedSelector } from 'src/store';
import { PostInStoreType } from 'store/reducers/post/types';

const PostItem:React.FC<PostInStoreType> = ({sign, text, tz, date, id}) => {
  const {posts} = useTypedSelector(state => state.post);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          {sign}
        </Typography>
        <Typography variant='h6' component='span'>
          Пост № {posts.findIndex(post => post.id === id) + 1}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color='text.secondary'>
          {date[tz].datetime}
        </Typography>
        <Typography variant='body2' component='p'>
          {text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small'><NavLink to={`/post/${id}`}>Подробнее</NavLink></Button>
        <Button size='small'>Удалить</Button>
      </CardActions>
    </Card>
  );
};

export default PostItem;
