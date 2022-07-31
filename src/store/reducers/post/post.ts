import { clientStorage } from 'src/api/clientStorage';
import { getFromLS } from 'src/utils/localStorage';
import { PostActionEnum, PostActionType, PostStateType } from 'store/reducers/post/types';

const initialState: PostStateType = {
  timeZoneList: null,
  timeZoneCurrent: getFromLS('currentTimeZone') || '',
  timeZoneIsLoading: false,
  signValue: getFromLS('currentSignValue') || '',
  signError: getFromLS('currentSignError') || false,
};

export default function PostReducer(state: PostStateType = initialState, action: PostActionType): PostStateType {
  clientStorage(action);

  switch (action.type) {
    case PostActionEnum.SET_TIMEZONE_LIST:
      return {...state, timeZoneList: action.payload, timeZoneIsLoading: false, timeZoneListError: ''};

    case PostActionEnum.SET_CURRENT_TIMEZONE:
      return {...state, timeZoneCurrent: action.payload};

    case PostActionEnum.SET_IS_TIMEZONE_LIST_LOADING:
      return {...state, timeZoneIsLoading: action.payload};

    case PostActionEnum.SET_TIMEZONE_LIST_ERROR:
      return {...state, timeZoneListError: action.payload, timeZoneIsLoading: false};

    case PostActionEnum.SET_SIGN_VALUE:
      return {...state, signValue: action.payload};

    case PostActionEnum.SET_SIGN_ERROR:
      return {...state, signError: action.payload};

    default:
      return state;
  }
}
