import { createAction, props } from '@ngrx/store';
import {
  ArticleActions,
  CommentRateRequest,
  IArticle,
  IComment,
  ICommentRate,
  ISingleArticleDto,
  ITag,
} from './article.constants';
import { IError, Paginated } from '../../../types/common.types';

export const articleLoadingAction = createAction(ArticleActions.ARTICLE_LOADING, props<{ articleId: number }>());

export const articleFailedAction = createAction(ArticleActions.ARTICLE_FAILED, props<{ error: IError }>());

export const articleSuccessAction = createAction(
  ArticleActions.ARTICLE_SUCCESS,
  props<{ article: ISingleArticleDto }>(),
);

export const tagsLoadingAction = createAction(ArticleActions.TAGS_LOADING);

export const tagsFailedAction = createAction(ArticleActions.TAGS_FAILED, props<{ error: IError }>());

export const tagsSuccessAction = createAction(ArticleActions.TAGS_SUCCESS, props<{ tags: Paginated<ITag> }>());

export const commentsLoadingAction = createAction(
  ArticleActions.COMMENTS_LOADING,
  props<{ articleId: number; page: number }>(),
);

export const commentsSuccessAction = createAction(
  ArticleActions.COMMENTS_SUCCESS,
  props<{ comments: Paginated<IComment> }>(),
);

export const commentsFailedAction = createAction(ArticleActions.COMMENTS_FAILED, props<{ error: IError }>());

export const commentUpdateLoadingAction = createAction(
  ArticleActions.COMMENT_UPDATE_LOADING,
  props<{ articleId: number; commentId: number; content: string }>(),
);

export const commentUpdateSuccessAction = createAction(
  ArticleActions.COMMENTS_UPDATE_SUCCESS,
  props<{ comment: IComment }>(),
);

export const commentUpdateFailedAction = createAction(
  ArticleActions.COMMENTS_UPDATE_FAILED,
  props<{ error: IError; commentId: number }>(),
);

export const commentRateLoadingAction = createAction(
  ArticleActions.COMMENTS_RATE_LOADING,
  props<{ commentId: number; rate: CommentRateRequest }>(),
);

export const commentRateSuccessAction = createAction(
  ArticleActions.COMMENTS_RATE_SUCCESS,
  props<{ rate: ICommentRate & { message?: string }; commentId: number }>(),
);

export const commentRateFailedAction = createAction(
  ArticleActions.COMMENTS_RATE_FAILED,
  props<{ error: IError; commentId: number }>(),
);

export const clearCommentsStateAction = createAction(ArticleActions.CLEAR_COMMENTS);
