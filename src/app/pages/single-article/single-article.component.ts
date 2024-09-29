import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TAppStore } from '../../store/store.reducer';
import { Store } from '@ngrx/store';
import { articleLoadingAction } from '../../store/reducers/article/article.actions';
import {
  articleFailedSelector,
  articleLoadingSelector,
  articleSelector,
} from '../../store/reducers/article/article.selectors';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrl: './single-article.component.less',
})
export class SingleArticleComponent implements OnDestroy, OnInit {
  articleId!: string;
  paramSubscription!: Subscription;
  $articleLoading = this.store.select(articleLoadingSelector);
  $articleError = this.store.select(articleFailedSelector);
  $article = this.store.select(articleSelector);
  safeHtml: SafeHtml = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<TAppStore>,
  ) {}

  ngOnInit() {
    this.paramSubscription = this.activatedRoute.paramMap.subscribe(params => {
      this.articleId = params.get('articleId') as string;
      this.store.dispatch(articleLoadingAction({ articleId: Number(this.articleId) }));
    });
  }

  setSafeHtml($event: SafeHtml) {
    this.safeHtml = $event;
  }

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }
}
