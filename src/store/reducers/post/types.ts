export type PostStateType = {
  timeZoneList: string[] | null;
  timeZoneCurrent: string;
  timeZoneIsLoading: boolean;
  timeZoneListError?: string;

  signValue: string;
  signError: boolean;
};

export enum PostActionEnum {
  SET_TIMEZONE_LIST = 'SET_TIMEZONE_LIST',
  SET_CURRENT_TIMEZONE = 'SET_CURRENT_TIMEZONE',
  SET_IS_TIMEZONE_LIST_LOADING = 'SET_IS_TIMEZONE_LIST_LOADING',
  SET_TIMEZONE_LIST_ERROR = 'SET_TIMEZONE_LIST_ERROR',

  SET_SIGN_VALUE = 'SET_SIGN_VALUE',
  SET_SIGN_ERROR = 'SET_SIGN_ERROR',
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

export interface SetSignValue {
  type: PostActionEnum.SET_SIGN_VALUE;
  payload: string;
}

export interface SetSignError {
  type: PostActionEnum.SET_SIGN_ERROR;
  payload: boolean;
}

export type PostActionType =
  SetTimeZoneListAction |
  SetIsTimeZoneListLoadingAction |
  SetCurrentTimeZone |
  SetTimeZoneLostError |
  SetSignValue |
  SetSignError;
