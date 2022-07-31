import { composeWithDevTools } from '@redux-devtools/extension';
import { applyMiddleware, bindActionCreators, combineReducers, createStore } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import thunk from 'redux-thunk';
import { PostActions } from 'store/reducers/post/action-creator';
import PostReducer from 'store/reducers/post/post';

const rootReducer = combineReducers({
  post: PostReducer,
});

const allActionCreators = {
  ...PostActions,
};

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(allActionCreators, dispatch);
};
