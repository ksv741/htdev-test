import { clientStorage } from 'src/api/clientStorage';
import { PaginationActionEnum, PaginationActionType, PaginationStateType } from 'store/reducers/pagintaion/types';

export const defaultSearchValue = {
  page: 1,
  perPage: 10,
};

const initialState: PaginationStateType = {
  postPerPage: defaultSearchValue.perPage,
  pageCount: 0,
  pageActive: defaultSearchValue.page,
};

export default function PaginationReducer(state: PaginationStateType = initialState, action: PaginationActionType): PaginationStateType {
  clientStorage(action);

  switch (action.type) {
    case PaginationActionEnum.PAGE_COUNT:
      return {...state, pageCount: action.payload};

    case PaginationActionEnum.POST_PER_PAGE:
      return {...state, postPerPage: action.payload};

    case PaginationActionEnum.PAGE_ACTIVE:
      return {...state, pageActive: action.payload};

    default:
      return state;
  }
}
