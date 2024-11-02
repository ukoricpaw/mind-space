import { IUser } from '../user/user.constants';
import { Paginated } from '../../../types/common.types';
import { IArticle } from '../article/article.constants';

interface ProfileState {
  profile: IUser | null;
  articles: Paginated<IArticle> | null;
  profileIsLoading: boolean;
  profileError: null | string;
  articlesIsLoading: boolean;
  articlesError: null | string;
}

export const initialState: ProfileState = {
  profile: null,
  articles: null,
  profileIsLoading: true,
  profileError: null,
  articlesIsLoading: true,
  articlesError: null,
};

export enum ProfileActions {
  PROFILE_LOADING = '[Profile actions] profile loading',
  PROFILE_SUCCESS = '[Profile actions] profile success',
  PROFILE_FAILED = '[Profile actions] profile failed',
  ARTICLES_LOADING = '[Profile actions] articles loading',
  ARTICLES_SUCCESS = '[Profile actions] articles success',
  ARTICLES_FAILED = '[Profile actions] articles failed',
}
