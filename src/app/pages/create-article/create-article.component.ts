import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Store } from '@ngrx/store';
import { TAppStore } from '../../store/store.reducer';
import { tagsSelector } from '../../store/reducers/article/article.selectors';
import { tagsLoadingAction } from '../../store/reducers/article/article.actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ISingleArticleDto, ITag } from '../../store/reducers/article/article.constants';
import { IError, Paginated } from '../../types/common.types';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NavigationService } from '../../services/navigation.service';
import { API_URL } from '../../types/auth.types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrl: './create-article.component.less',
})
export class CreateArticleComponent implements OnInit, OnDestroy, OnChanges {
  html: string = '';
  file: null | File = null;
  tagsSubscription!: Subscription;
  $tags = this.store.select(tagsSelector);
  tags!: Paginated<ITag>;
  isLoading: boolean = false;
  title = 'Написать статью';
  imageUrl: string | null = null;

  @Input('article') article: null | ISingleArticleDto = null;

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
    private toastr: ToastrService,
  ) {
    this.tagsSubscription = this.$tags.subscribe(ownTags => {
      if (ownTags) this.tags = ownTags;
    });
    this.navigationService.$navSubject.next([{ name: 'create-article', action: 'disable' }]);
  }

  ngOnInit() {
    this.store.dispatch(tagsLoadingAction());
  }

  ngOnChanges() {
    if (this.article) {
      this.title = 'Изменить содержимое статьи';
      this.navigationService.$navSubject.next([{ name: 'create-article', action: 'enable' }]);
      this.form.setValue({ title: this.article.article.title });
      this.chosenTags = this.article.article.articleTypes.map(tag => tag.articleType.id as any);
      this.html = this.article.article.content;
      this.imageUrl = API_URL + '/images/' + this.article.article.thumbnail;
    }
  }

  ngOnDestroy() {
    this.navigationService.$navSubject.next([{ name: 'create-article', action: 'enable' }]);
    this.tagsSubscription?.unsubscribe();
  }

  restoreChosenTags() {
    this.chosenTags = [];
  }

  redirectToFirstPage() {
    this.router.navigate(['']);
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

    if (this.article) {
      this.articleService.modifyArticle(this.article.article.id, formData).subscribe(data => {
        this.isLoading = false;
        this.router.navigate(['/']);
        this.toastr.success('Статья была изменена и переотправлена на модерацию', 'Статья была изменена');
      });
    } else {
      this.articleService.createArticle(formData).subscribe(data => {
        this.isLoading = false;
        this.router.navigate(['/']);
        this.toastr.success('Статья была создана и отправлена на модерацию', 'Статья была создана');
      });
    }
  }
}
