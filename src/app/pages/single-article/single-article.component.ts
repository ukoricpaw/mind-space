import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TAppStore } from '../../store/store.reducer';
import { Store } from '@ngrx/store';
import {
  articleLoadingAction,
  clearCommentsStateAction,
  commentsLoadingAction,
} from '../../store/reducers/article/article.actions';
import { articleLoadingSelector, articleSelector } from '../../store/reducers/article/article.selectors';
import { SafeHtml } from '@angular/platform-browser';
import {
  commentsCountSelector,
  commentsLoadingSelector,
  commentsSelector,
} from '../../store/reducers/comments/comments.selectors';
import { IComment } from '../../store/reducers/article/article.constants';
import { PageEvent } from '@angular/material/paginator';
import { ArticleService } from '../../services/article.service';
import { isUserAuthSelector, userDataSelector } from '../../store/reducers/user/user.selectors';
import { ToastrService } from 'ngx-toastr';

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
  $commentsLoading = this.store.select(commentsLoadingSelector);
  $comments = this.store.select(commentsSelector);
  $commentsCount = this.store.select(commentsCountSelector);
  commentWhichWillBeDeleted: null | number = null;
  $isUserAuthSelector = this.store.select(isUserAuthSelector);
  $userDataSelector = this.store.select(userDataSelector);

  commentsPageSize = 10;
  page = 1;

  isDeleteCommentModalOpened = false;

  safeHtml: SafeHtml = '';

  @Input('toModerate') toModerate!: boolean;

  @ViewChild('root')
  rootElement!: ElementRef<HTMLDivElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<TAppStore>,
    private articleService: ArticleService,
    private toastr: ToastrService,
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

  commentsTrackBy: (index: number, el: IComment) => number = (index, el) => {
    return el.id;
  };

  fetchComments() {
    this.store.dispatch(commentsLoadingAction({ articleId: Number(this.articleId), page: this.page }));
  }

  changeCommentsPage(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.fetchComments();
  }

  triggerView() {
    this.articleService.addViewToArticle(Number(this.articleId)).subscribe();
  }

  ngOnDestroy() {
    this.store.dispatch(clearCommentsStateAction());
    this.paramSubscription.unsubscribe();
  }

  closeDeleteCommentModal() {
    this.isDeleteCommentModalOpened = false;
    this.commentWhichWillBeDeleted = null;
  }

  deleteComment() {
    if (this.commentWhichWillBeDeleted) {
      this.articleService.deleteComment(Number(this.articleId), this.commentWhichWillBeDeleted).subscribe(() => {
        this.page = 1;
        this.fetchComments();
        this.closeDeleteCommentModal();
        this.toastr.success('Комментарий был успешно удалён', 'Комментарий удалён');
      });
    }
  }

  createComment(content: string) {
    this.articleService.createComment(Number(this.articleId), content).subscribe(() => {
      this.page = 1;
      this.fetchComments();
      this.toastr.success('Ваш комментарий был добавлен', 'Комментарий создан');
    });
  }

  openDeleteCommentModal(commentId: number) {
    this.commentWhichWillBeDeleted = commentId;
    this.isDeleteCommentModalOpened = true;
  }
}
