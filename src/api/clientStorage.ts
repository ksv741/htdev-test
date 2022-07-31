import { setToLS } from 'src/utils/localStorage';
import { PostActionEnum, PostActionType } from 'store/reducers/post/types';

export function clientStorage(action: PostActionType) {
  switch (action.type) {
    case PostActionEnum.SET_CURRENT_TIMEZONE:
      setToLS('currentTimeZone', action.payload);
      break;

    default: break;
  }
}
