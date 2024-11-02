import { createAction, props } from '@ngrx/store';
import { ProfileActions } from './profile.constants';
import { IUser } from '../user/user.constants';
import { IError, Paginated } from '../../../types/common.types';
import { IArticle } from '../article/article.constants';
import { PaginatedReq } from '../../../types/article.types';

export const profileSuccessAction = createAction(ProfileActions.PROFILE_SUCCESS, props<{ profile: IUser }>());

export const profileLoadingAction = createAction(ProfileActions.PROFILE_LOADING, props<{ profileId: number }>());

export const profileFailedAction = createAction(ProfileActions.PROFILE_FAILED, props<{ error: IError }>());

export const articlesSuccessAction = createAction(
  ProfileActions.ARTICLES_SUCCESS,
  props<{ articles: Paginated<IArticle> }>(),
);

export const articlesLoadingAction = createAction(
  ProfileActions.ARTICLES_LOADING,
  props<{ profileId: number; params: Partial<PaginatedReq> }>(),
);

export const articlesFailedAction = createAction(ProfileActions.ARTICLES_FAILED, props<{ error: IError }>());
