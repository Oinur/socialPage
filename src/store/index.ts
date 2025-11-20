import { createStore, combineReducers } from 'redux';
import { usersReducer } from './users/usersReducer';
import { postsReducer } from './posts/postsReducers';

const rootReducer = combineReducers({
  users: usersReducer,
  posts: postsReducer, 
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
