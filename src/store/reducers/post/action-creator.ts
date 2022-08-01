import { savePostToLS } from 'src/api/clientStorage';
import { getTimeZoneListFromApi, getTimeZoneObject } from 'src/api/timezones';
import { AppDispatch } from 'src/store';
import {
  AddPostToStore,
  CreatePostError,
  CreatePostLoading,
  PostActionEnum,
  PostInStoreType,
  PostType,
  RemovePost,
  RemovePostMessage,
  SetCurrentTimeZone,
  SetIsTimeZoneListLoadingAction,
  SetSignError,
  SetSignValue,
  SetTextValue,
  SetTimeZoneListAction,
  SetTimeZoneLostError,
  SetTimeZoneObject,
  TimeZoneObject,
} from 'store/reducers/post/types';

export const PostActions = {
  getTimeZones: () => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(PostActions.setTimeZoneListLoading(true));
        const response = await getTimeZoneListFromApi;
        dispatch(PostActions.setTimeZoneList(response));
      } catch (e) {
        dispatch(PostActions.setTimeZoneListError(e.message));
      }
    };
  },
  setTimeZoneList(timeZoneList: string[]): SetTimeZoneListAction {
    return {
      type: PostActionEnum.SET_TIMEZONE_LIST,
      payload: timeZoneList,
    };
  },
  setCurrentTimeZone(timeZone: string): SetCurrentTimeZone {
    return {
      type: PostActionEnum.SET_CURRENT_TIMEZONE,
      payload: timeZone,
    };
  },
  setTimeZoneListLoading(isLoading: boolean): SetIsTimeZoneListLoadingAction {
    return {
      type: PostActionEnum.SET_IS_TIMEZONE_LIST_LOADING,
      payload: isLoading,
    };
  },
  setTimeZoneListError(error: string): SetTimeZoneLostError {
    return {
      type: PostActionEnum.SET_TIMEZONE_LIST_ERROR,
      payload: error,
    };
  },
  getTimeZoneObject: (timeZone: string) => {
    return (dispatch: AppDispatch): Promise<TimeZoneObject> => {
      return new Promise((res, rej) => {
        try {
          dispatch(PostActions.setTimeZoneListLoading(true));
          getTimeZoneObject(timeZone).then(data => {
            dispatch(PostActions.setTimeZoneObject(data));
            res(data);
          });
        } catch (e) {
          dispatch(PostActions.setTimeZoneListError(e.message));
          rej(e);
        }
      });
    };
  },
  setTimeZoneObject: (zoneObject: TimeZoneObject): SetTimeZoneObject => {
    return {
      type: PostActionEnum.SET_TIMEZONE_OBJECT,
      payload: zoneObject,
    };
  },

  setSignValue(value: string): SetSignValue {
    return {
      type: PostActionEnum.SET_SIGN_VALUE,
      payload: value,
    };
  },
  setSignError(value: boolean): SetSignError {
    return {
      type: PostActionEnum.SET_SIGN_ERROR,
      payload: value,
    };
  },

  setTextValue(value: string): SetTextValue {
    return {
      type: PostActionEnum.SET_TEXT_VALUE,
      payload: value,
    };
  },

  createPostLoading: (value: boolean): CreatePostLoading => {
    return {
      type: PostActionEnum.CREATE_POST_LOADING,
      payload: value,
    };
  },
  setCreatePostError: (value: string): CreatePostError => {
    return {
      type: PostActionEnum.CREATE_POST_ERROR,
      payload: value,
    };
  },
  createPost: (post: PostType) => {
    return async (dispatch: AppDispatch) => {
      try {
        dispatch(PostActions.createPostLoading(true));

        // @ts-ignore
        const date = await (dispatch(PostActions.getTimeZoneObject(post.tz)) as Promise<TimeZoneObject>);
        const {id: newPostId} = await savePostToLS({...post, date: {[post.tz]: date}});

        dispatch(PostActions.addPostToStore({...post, date: {[post.tz]: date}, id: newPostId}));
        dispatch(PostActions.setTextValue(''));
      } catch (e) {
        dispatch(PostActions.setCreatePostError(e));
      } finally {
        dispatch(PostActions.createPostLoading(false));
        dispatch(PostActions.setTimeZoneListLoading(false));
      }
    };
  },

  addPostToStore: (post: PostInStoreType): AddPostToStore => {
    return {
      type: PostActionEnum.ADD_POST_TO_STORE,
      payload: post,
    };
  },

  removePost: (id: string): RemovePost => {
    return {
      type: PostActionEnum.REMOVE_POST,
      payload: id,
    };
  },
  removePostMessage: (text: string): RemovePostMessage => {
    return {
      type: PostActionEnum.REMOVE_POST_MESSAGE,
      payload: text,
    };
  },
};
