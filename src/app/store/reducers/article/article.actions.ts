import { createAction, props } from '@ngrx/store';
import { ArticleActions, IArticle, ISingleArticleDto, ITag } from './article.constants';
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
