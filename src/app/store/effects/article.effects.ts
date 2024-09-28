import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ArticleService } from '../../services/article.service';
import {
  articleFailedAction,
  articleLoadingAction,
  articleSuccessAction,
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
