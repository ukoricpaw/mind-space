import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../store/store.reducer';
import { tagsLoadingSelector, tagsSelector } from '../../store/reducers/article/article.selectors';
import { tagsLoadingAction } from '../../store/reducers/article/article.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITag } from '../../store/reducers/article/article.constants';
import { Paginated } from '../../types/common.types';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.less',
})
export class CreateArticleComponent implements OnInit, OnDestroy {
  html: string = '';
  file: null | File = null;

  $tagsIsLoading = this.store.select(tagsLoadingSelector);
  tagsSubscription!: Subscription;
  $tags = this.store.select(tagsSelector);
  tags!: Paginated<ITag>;

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
  ) {
    this.tagsSubscription = this.$tags.subscribe(ownTags => {
      if (ownTags) this.tags = ownTags;
    });
  }

  ngOnInit() {
    this.store.dispatch(tagsLoadingAction());
  }

  ngOnDestroy() {
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

    this.articleService.createArticle(formData).subscribe(data => {
      this.router.navigate(['/']);
    });
  }
}
