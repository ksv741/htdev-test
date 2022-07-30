import { PostActionType, PostStateType } from 'store/reducers/post/types';

const initialState = {};

export default function PostReducer(state: PostStateType = initialState, action: PostActionType) {
  switch (action.type) {
    default:
      return state;
  }
}
