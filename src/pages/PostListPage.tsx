import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import PostItem from 'components/PostItem/PostItem';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useActions, useTypedSelector } from 'src/store';
import { defaultSearchValue } from 'store/reducers/pagintaion/pagintation';
import { PostInStoreType } from 'store/reducers/post/types';

const perPageEnable = [1, 2, 3, 4, 5, 10, 20];

const PostListPage: React.FC = () => {
  const {posts} = useTypedSelector(state => state.post);
  const {postPerPage, pageCount, pageActive} = useTypedSelector(state => state.pagination);
  const {setActivePage, setPostsPerPage, setPageCount} = useActions();
  const [filteredPosts, setFilteredPosts] = useState<PostInStoreType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    initActivePage();
  }, []);

  useEffect(() => {
    setFilteredPosts(posts.slice((pageActive - 1) * postPerPage, pageActive * postPerPage));
    setPageCount(posts.length / postPerPage);

    changeSearchParam('page', pageActive);
    changeSearchParam('perPage', postPerPage);
  }, [pageActive, postPerPage]);

  useEffect(() => {
    const pageFromQueryParams = searchParams.get('page');
    const postPerPageFromQueryParams = searchParams.get('perPage');

    if (pageFromQueryParams && pageActive.toString() !== pageFromQueryParams) {
      setActivePage(+pageFromQueryParams);
    }

    if (postPerPageFromQueryParams && postPerPage.toString() !== postPerPageFromQueryParams) {
      setPostsPerPage(+postPerPageFromQueryParams);
    }
  }, [searchParams]);

  const changePageHandler = (event: React.ChangeEvent<unknown>, page: number) => {
    setActivePage(page);
  };

  const changePostPerPageHandler = (e: SelectChangeEvent) => {
    const perPage = +e.target.value;
    setPostsPerPage(perPage);
    setActivePage(1);
  };

  const initActivePage = () => {
    let pageFromQueryParams = parseInt(searchParams.get('page') || defaultSearchValue.page.toString(), 10);
    let postPerPageFromQueryParams = parseInt(searchParams.get('perPage') || defaultSearchValue.perPage.toString(), 10);

    if (pageFromQueryParams > Math.ceil(posts.length / postPerPageFromQueryParams)) pageFromQueryParams = defaultSearchValue.page;
    if (!perPageEnable.includes(postPerPageFromQueryParams)) postPerPageFromQueryParams = defaultSearchValue.perPage;

    setActivePage(pageFromQueryParams);
    setPostsPerPage(postPerPageFromQueryParams);
  };

  const changeSearchParam = (key: string, value: any) => {
    if (!key || searchParams.get(key) === value.toString()) return;

    // @ts-ignore
    if ((key && value == null) || (value === defaultSearchValue[key])) {
      searchParams.delete(key);
      setSearchParams(searchParams);
      return;
    }

    searchParams.set(key, value.toString());
    setSearchParams(searchParams);
  };

  function renderPerPageSelectItems() {
    return perPageEnable.map(item => (
      <MenuItem key={item} value={item}>{item}</MenuItem>
    ));
  }

  if (!posts.length) {
    return (
      <Typography component='div'>
        <h2>There are no posts yet.</h2>
        <Link to='/' replace>You can create your first page</Link>
      </Typography>
    );
  }

  return (
    <>
      <Grid container item xs={1} sx={{mb: 2}}>
        <FormControl fullWidth>
          <InputLabel id='post-per-page-select-label'>Постов на странице</InputLabel>
          <Select
            labelId='post-per-page-select-label'
            id='post=per-page-select'
            value={postPerPage.toString()}
            label='Age'
            onChange={changePostPerPageHandler}
            variant='standard'
          >
            {renderPerPageSelectItems()}
          </Select>
        </FormControl>
      </Grid>

      <Grid container spacing={2}>
        {filteredPosts.map(post => (
          <Grid item xs={4} key={post.id} >
            <PostItem {...post}/>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Pagination page={pageActive} count={pageCount} showFirstButton showLastButton onChange={changePageHandler}/>
        </Grid>
      </Grid>
    </>

  );
};

export default PostListPage;
