import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArticleService } from '../../services/article.service';
import {
  articleFailedAction,
  articleLoadingAction,
  articleSuccessAction,
  commentRateFailedAction,
  commentRateLoadingAction,
  commentRateSuccessAction,
  commentsFailedAction,
  commentsLoadingAction,
  commentsSuccessAction,
  commentUpdateFailedAction,
  commentUpdateLoadingAction,
  commentUpdateSuccessAction,
  tagsFailedAction,
  tagsLoadingAction,
  tagsSuccessAction,
} from '../reducers/article/article.actions';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleEffects {
  constructor(
    private $actions: Actions,
    private articleService: ArticleService,
  ) {}

  $fetchTags = createEffect(() =>
    this.$actions.pipe(
      ofType(tagsLoadingAction),
      exhaustMap(() => {
        return this.articleService.getTags().pipe(
          map(tags => tagsSuccessAction({ tags })),
          catchError(error => of(tagsFailedAction(error))),
        );
      }),
    ),
  );

  $fetchComments = createEffect(() =>
    this.$actions.pipe(
      ofType(commentsLoadingAction),
      exhaustMap(({ articleId, page }) => {
        return this.articleService.getArticleComments(articleId, { page: page ?? 1 }).pipe(
          map(comments => commentsSuccessAction({ comments })),
          catchError(error => of(commentsFailedAction({ error }))),
        );
      }),
    ),
  );

  $updateComment = createEffect(() =>
    this.$actions.pipe(
      ofType(commentUpdateLoadingAction),
      exhaustMap(({ articleId, content, commentId }) => {
        return this.articleService.updateComment(articleId, commentId, content).pipe(
          map(comment => commentUpdateSuccessAction({ comment })),
          catchError(error => of(commentUpdateFailedAction({ error, commentId }))),
        );
      }),
    ),
  );

  $rateComment = createEffect(() =>
    this.$actions.pipe(
      ofType(commentRateLoadingAction),
      exhaustMap(({ commentId, rate }) => {
        return this.articleService.rateComment(commentId, rate).pipe(
          map(commentRate => commentRateSuccessAction({ rate: commentRate, commentId })),
          catchError(error => of(commentRateFailedAction({ error, commentId }))),
        );
      }),
    ),
  );

  $fetchArticles = createEffect(() =>
    this.$actions.pipe(ofType(articleLoadingAction)).pipe(
      ofType(articleLoadingAction),
      exhaustMap(action => {
        return this.articleService.getSingleArticle(action.articleId).pipe(
          map(article => articleSuccessAction({ article })),
          catchError(error => of(articleFailedAction(error))),
        );
      }),
    ),
  );
}
