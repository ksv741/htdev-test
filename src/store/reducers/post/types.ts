export type PostStateType = {
  timeZoneList: string[] | null;
  currentTimeZone: string;
  isTimeZoneListLoading: boolean;
  timeZoneListError?: string;
};

export enum PostActionEnum {
  SET_TIMEZONE_LIST = 'SET_TIMEZONE_LIST',
  SET_CURRENT_TIMEZONE = 'SET_CURRENT_TIMEZONE',
  SET_IS_TIMEZONE_LIST_LOADING = 'SET_IS_TIMEZONE_LIST_LOADING',
  SET_TIMEZONE_LIST_ERROR = 'SET_TIMEZONE_LIST_ERROR',
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

export type PostActionType =
  SetTimeZoneListAction |
  SetIsTimeZoneListLoadingAction |
  SetCurrentTimeZone |
  SetTimeZoneLostError;
