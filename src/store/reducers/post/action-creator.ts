import { getTimeZoneListFromApi } from 'src/api/timezones';
import { AppDispatch } from 'src/store';
import {
  PostActionEnum,
  SetCurrentTimeZone,
  SetIsTimeZoneListLoadingAction,
  SetSignError,
  SetSignValue,
  SetTimeZoneListAction,
  SetTimeZoneLostError,
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
};
