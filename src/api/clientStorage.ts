import { getFromLS, saveToLS } from 'src/utils/localStorage';
import { PaginationActionEnum, PaginationActionType } from 'store/reducers/pagintaion/types';
import { PostActionEnum, PostActionType, PostInStoreType, PostType } from 'store/reducers/post/types';
import { v4 as uuidv4 } from 'uuid';

export function clientStorage(action: PostActionType | PaginationActionType) {
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

    case PaginationActionEnum.POST_PER_PAGE:
      saveToLS('postPerPage', action.payload);
      break;

    case PostActionEnum.REMOVE_POST: {
      const posts: PostInStoreType[] = getFromLS('posts');
      saveToLS('posts', posts.filter(post => post.id !== action.payload));
      break;
    }

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
