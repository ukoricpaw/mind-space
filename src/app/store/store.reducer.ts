import { ActionReducer } from '@ngrx/store';
import { userReducer, articleReducer, profileReducer, commentsReducer } from './reducers';

export const reducer = {
  userReducer,
  articleReducer,
  profileReducer,
  commentsReducer,
};

type TReducer<T extends ActionReducer<any>> = T extends ActionReducer<infer R> ? R : never;
type TStore<T extends Record<string, ActionReducer<any>>> = {
  [Key in keyof T]: TReducer<T[Key]>;
};
export type TAppStore = TStore<typeof reducer>;
