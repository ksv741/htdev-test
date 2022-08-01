import { PaginationActionEnum, SetActivePage, SetPageCount, SetPostPerPage } from 'store/reducers/pagintaion/types';

export const PaginationAction = {
  setPostsPerPage: (value: number): SetPostPerPage => {
    return {
      type: PaginationActionEnum.POST_PER_PAGE,
      payload: value,
    };
  },
  setPageCount: (value: number): SetPageCount => {
    return {
      type: PaginationActionEnum.PAGE_COUNT,
      payload: Math.ceil(value),
    };
  },
  setActivePage: (page: number): SetActivePage => {
    return {
      type: PaginationActionEnum.PAGE_ACTIVE,
      payload: page,
    };
  },
};
