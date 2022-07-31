export type PostStateType = {
  timeZoneList: string[] | null;
  timeZoneCurrent: string;
  timeZoneIsLoading: boolean;
  timeZoneListError?: string;
  timeZoneObject: TimeZoneObject;

  signValue: string;
  signError: boolean;

  textValue: string;

  createPostLoading: boolean;
  createPostError: string;

  posts: Required<PostType>[];
};

export type TimeZoneObject = {
  abbreviation?: string;
  client_ip?: string;
  datetime?: string;
  day_of_week?: number;
  day_of_year?: number;
  dst?: boolean;
  dst_from?: null;
  dst_offset?: number;
  dst_until?: null;
  raw_offset?: number;
  timezone?: string;
  unixtime?: number;
  utc_datetime?: string;
  utc_offset?: string;
  week_number?: number;
};

export interface PostType {
  text: string;
  sign: string;
  tz: string;
  date?: Record<string, TimeZoneObject>
}

export interface PostInStoreType extends Required<PostType> {
  id: string;
}

export enum PostActionEnum {
  SET_TIMEZONE_LIST = 'SET_TIMEZONE_LIST',
  SET_CURRENT_TIMEZONE = 'SET_CURRENT_TIMEZONE',
  SET_IS_TIMEZONE_LIST_LOADING = 'SET_IS_TIMEZONE_LIST_LOADING',
  SET_TIMEZONE_LIST_ERROR = 'SET_TIMEZONE_LIST_ERROR',
  SET_TIMEZONE_OBJECT = 'SET_TIMEZONE_OBJECT',

  SET_SIGN_VALUE = 'SET_SIGN_VALUE',
  SET_SIGN_ERROR = 'SET_SIGN_ERROR',

  SET_TEXT_VALUE = 'SET_TEXT_VALUE',

  CREATE_POST = 'CREATE_POST',
  CREATE_POST_LOADING = 'CREATE_POST_LOADING',
  CREATE_POST_ERROR = 'CREATE_POST_ERROR',

  ADD_POST_TO_STORE = 'ADD_POST_TO_STORE',
}

export interface SetTimeZoneLostError {
  type: PostActionEnum.SET_TIMEZONE_LIST_ERROR,
  payload: string
}

export interface SetIsTimeZoneListLoadingAction {
  type: PostActionEnum.SET_IS_TIMEZONE_LIST_LOADING;
  payload: boolean;
}

export interface SetTimeZoneListAction {
  type: PostActionEnum.SET_TIMEZONE_LIST;
  payload: string[];
}

export interface SetCurrentTimeZone {
  type: PostActionEnum.SET_CURRENT_TIMEZONE;
  payload: string;
}

export interface SetTimeZoneObject {
  type: PostActionEnum.SET_TIMEZONE_OBJECT;
  payload: TimeZoneObject;
}

export interface SetSignValue {
  type: PostActionEnum.SET_SIGN_VALUE;
  payload: string;
}

export interface SetSignError {
  type: PostActionEnum.SET_SIGN_ERROR;
  payload: boolean;
}

export interface SetTextValue {
  type: PostActionEnum.SET_TEXT_VALUE;
  payload: string;
}

export interface CreatePost {
  type: PostActionEnum.CREATE_POST,
  payload: {
    text: string;
    sign: string;
    tz: string;
  }
}

export interface CreatePostLoading {
  type: PostActionEnum.CREATE_POST_LOADING;
  payload: boolean;
}

export interface CreatePostError {
  type: PostActionEnum.CREATE_POST_ERROR;
  payload: string;
}

export interface AddPostToStore {
  type: PostActionEnum.ADD_POST_TO_STORE;
  payload: PostInStoreType;
}

export type PostActionType =
  SetTimeZoneListAction |
  SetIsTimeZoneListLoadingAction |
  SetCurrentTimeZone |
  SetTimeZoneLostError |
  SetTimeZoneObject |
  SetSignValue |
  SetSignError |
  SetTextValue |
  CreatePost |
  CreatePostLoading |
  CreatePostError |
  AddPostToStore;
