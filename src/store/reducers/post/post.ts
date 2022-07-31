import { PostActionEnum, PostActionType, PostStateType } from 'store/reducers/post/types';

const initialState: PostStateType = {
  timeZoneList: null,
  currentTimeZone: '',
  isTimeZoneListLoading: false,
};

export default function PostReducer(state: PostStateType = initialState, action: PostActionType): PostStateType {
  switch (action.type) {
    case PostActionEnum.SET_TIMEZONE_LIST:
      return {...state, timeZoneList: action.payload, isTimeZoneListLoading: false, timeZoneListError: ''};

    case PostActionEnum.SET_CURRENT_TIMEZONE:
      return {...state, currentTimeZone: action.payload};

    case PostActionEnum.SET_IS_TIMEZONE_LIST_LOADING:
      return {...state, isTimeZoneListLoading: action.payload};

    case PostActionEnum.SET_TIMEZONE_LIST_ERROR:
      return {...state, timeZoneListError: action.payload, isTimeZoneListLoading: false};

    default:
      return state;
  }
}
