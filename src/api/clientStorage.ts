import { v4 as uuidv4 } from 'uuid';
import { getFromLS, saveToLS } from 'src/utils/localStorage';
import { PostActionEnum, PostActionType, PostType } from 'store/reducers/post/types';

export function clientStorage(action: PostActionType) {
  switch (action.type) {
    case PostActionEnum.SET_CURRENT_TIMEZONE:
      saveToLS('currentTimeZone', action.payload);
      break;

    case PostActionEnum.SET_SIGN_VALUE:
      saveToLS('currentSignValue', action.payload);
      break;

    case PostActionEnum.SET_SIGN_ERROR:
      saveToLS('currentSignError', action.payload);
      break;

    default: break;
  }
}

type CreatePostResponse = {
  id: string;
};

export function savePostToLS(post: Required<PostType>) {
  return new Promise<CreatePostResponse>((res, rej) => {
    try {
      setTimeout(() => {
        const id = uuidv4() as string;
        const postToSave = {...post, id};
        const posts = getFromLS('posts') || [];
        posts.push(postToSave);

        saveToLS('posts', posts);
        res({id});
      }, 2000);
    } catch (e) {
      rej(e);
    }
  });
}
