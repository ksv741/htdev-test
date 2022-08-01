import { clientStorage } from 'src/api/clientStorage';
import { getFromLS } from 'src/utils/localStorage';
import { PostActionEnum, PostActionType, PostStateType } from 'store/reducers/post/types';

const initialState: PostStateType = {
  timeZoneList: null,
  timeZoneCurrent: getFromLS('currentTimeZone') || '',
  timeZoneIsLoading: false,
  timeZoneListError: '',
  timeZoneObject: {},

  signValue: getFromLS('currentSignValue') || '',
  signError: getFromLS('currentSignError') || false,
  textValue: '',

  createPostLoading: false,
  createPostError: '',

  posts: getFromLS('posts') || [],
  removePostMessage: '',
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

    case PostActionEnum.SET_TIMEZONE_OBJECT:
      return {...state, timeZoneObject: action.payload, timeZoneIsLoading: false};

    case PostActionEnum.SET_SIGN_VALUE:
      return {...state, signValue: action.payload};

    case PostActionEnum.SET_SIGN_ERROR:
      return {...state, signError: action.payload};

    case PostActionEnum.SET_TEXT_VALUE:
      return {...state, textValue: action.payload};

    case PostActionEnum.CREATE_POST_LOADING:
      return {...state, createPostLoading: action.payload};

    case PostActionEnum.CREATE_POST_ERROR:
      return {...state, createPostError: action.payload};

    case PostActionEnum.ADD_POST_TO_STORE:
      return {...state, posts: [...state.posts, action.payload]};

    case PostActionEnum.REMOVE_POST:
      return {...state, posts: state.posts.filter(post => post.id !== action.payload)};

    case PostActionEnum.REMOVE_POST_MESSAGE:
      return {...state, removePostMessage: action.payload};

    default:
      return state;
  }
}
