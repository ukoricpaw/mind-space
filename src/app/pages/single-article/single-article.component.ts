import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TAppStore } from '../../store/store.reducer';
import { Store } from '@ngrx/store';
import { articleLoadingAction } from '../../store/reducers/article/article.actions';
import { articleLoadingSelector, articleSelector } from '../../store/reducers/article/article.selectors';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrl: './single-article.component.less',
})
export class SingleArticleComponent implements OnDestroy, OnInit, AfterViewInit {
  articleId!: string;
  paramSubscription!: Subscription;
  $articleLoading = this.store.select(articleLoadingSelector);
  $article = this.store.select(articleSelector);
  safeHtml: SafeHtml = '';

  @ViewChild('root')
  rootElement!: ElementRef<HTMLDivElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<TAppStore>,
  ) {}

  ngAfterViewInit() {
    this.rootElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

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
