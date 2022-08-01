export type PaginationStateType = {
  postPerPage: number;
  pageCount: number;
  pageActive: number;
};

export enum PaginationActionEnum {
  POST_PER_PAGE = 'POST_PER_PAGE',
  PAGE_COUNT = 'PAGE_COUNT',
  PAGE_ACTIVE = 'PAGE_ACTIVE',
}

export interface SetPostPerPage {
  type: PaginationActionEnum.POST_PER_PAGE;
  payload: number;
}

export interface SetPageCount {
  type: PaginationActionEnum.PAGE_COUNT;
  payload: number;
}

export interface SetActivePage {
  type: PaginationActionEnum.PAGE_ACTIVE;
  payload: number;
}

export type PaginationActionType =
  SetPostPerPage |
  SetPageCount |
  SetActivePage;
