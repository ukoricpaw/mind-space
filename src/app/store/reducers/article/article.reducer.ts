import { createReducer, on } from '@ngrx/store';
import { ArticleActions, initialState } from './article.constants';
import {
  articleFailedAction,
  articleLoadingAction,
  articleSuccessAction,
  tagsFailedAction,
  tagsSuccessAction,
} from './article.actions';
import { ActionStatus } from '../../../types/common.types';

export const articleReducer = createReducer(
  initialState,
  on(articleLoadingAction, state => ({
    ...state,
    articleStatus: ActionStatus.IN_PROGRESS,
    articleError: null,
    article: undefined,
  })),
  on(articleFailedAction, (state, { error }) => ({
    ...state,
    articleStatus: ActionStatus.FAILED,
    articleError: error,
  })),
  on(articleSuccessAction, (state, { article }) => ({
    ...state,
    articleStatus: ActionStatus.SUCCESS,
    article,
  })),
  on(tagsSuccessAction, state => ({
    ...state,
    tagStatus: ActionStatus.IN_PROGRESS,
    tags: undefined,
    tagsError: null,
  })),
  on(tagsFailedAction, (state, { error }) => ({
    ...state,
    tagStatus: ActionStatus.FAILED,
    tagsError: error,
  })),
  on(tagsSuccessAction, (state, { tags }) => ({
    ...state,
    tagStatus: ActionStatus.SUCCESS,
    tags,
  })),
);
