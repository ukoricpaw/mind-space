import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../store/store.reducer';
import { tagsSelector } from '../../store/reducers/article/article.selectors';
import { tagsLoadingAction } from '../../store/reducers/article/article.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITag } from '../../store/reducers/article/article.constants';
import { IError, Paginated } from '../../types/common.types';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.less',
})
export class CreateArticleComponent implements OnInit, OnDestroy {
  html: string = '';
  file: null | File = null;
  tagsSubscription!: Subscription;
  $tags = this.store.select(tagsSelector);
  tags!: Paginated<ITag>;
  isLoading: boolean = false;

  htmlError: null | string = null;
  chosenTags: ITag[] = [];

  form = new FormGroup({
    title: new FormControl('', {
      validators: [Validators.required, Validators.minLength(30), Validators.maxLength(100)],
    }),
  });

  constructor(
    private store: Store<TAppStore>,
    private articleService: ArticleService,
    private router: Router,
    private navigationService: NavigationService,
  ) {
    this.tagsSubscription = this.$tags.subscribe(ownTags => {
      if (ownTags) this.tags = ownTags;
    });
    this.navigationService.$navSubject.next([{ name: 'create-article', action: 'disable' }]);
  }

  ngOnInit() {
    this.store.dispatch(tagsLoadingAction());
  }

  ngOnDestroy() {
    this.navigationService.$navSubject.next([{ name: 'create-article', action: 'enable' }]);
    this.tagsSubscription?.unsubscribe();
  }

  restoreChosenTags() {
    this.chosenTags = [];
  }

  onSubmit() {
    if (this.html.length <= 100 || this.chosenTags.length === 0) {
      this.htmlError = 'Недостаточно контента для статьи';
      return;
    }
    this.htmlError = null;
    const tags = this.chosenTags.join(';');

    const formData = new FormData();

    formData.append('title', this.form.value.title as string);
    if (this.file) {
      formData.append('file', this.file);
    }
    formData.append('isPrivate', 'false');
    formData.append('tags', tags);
    formData.append('content', this.html);

    this.isLoading = true;
    this.articleService.createArticle(formData).subscribe(
      data => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      (err: IError) => {},
    );
  }
}
