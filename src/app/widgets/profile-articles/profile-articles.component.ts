import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { IUser } from '../../store/reducers/user/user.constants';
import { ArticleService } from '../../services/article.service';
import { FormControl } from '@angular/forms';
import { PaginatedReq } from '../../types/article.types';
import { debounceTime } from 'rxjs';
import { IArticle } from '../../store/reducers/article/article.constants';
import { Paginated } from '../../types/common.types';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrl: './profile-articles.component.less',
})
export class ProfileArticlesComponent implements OnChanges, AfterViewInit {
  @Input('user') user!: IUser;
  @Input('isAuthenticatedUser') isAuthenticatedUser!: boolean;
  @ViewChild('root') rootElement!: ElementRef<HTMLDivElement>;

  articlesPage: number = 1;
  articles: Paginated<IArticle> | null = null;
  isLoading = false;

  selectedStatus: null | number = null;
  searchControl = new FormControl<string>('');

  constructor(private articleService: ArticleService) {
    this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe(search => {
      this.fetchArticles(this.selectedStatus, search || '');
    });
  }

  statuses: { value: null | number; label: string; isDisabled?: boolean }[] = [
    { value: null, label: 'Все', isDisabled: true },
    {
      value: 1,
      label: 'Активные',
    },
    { value: 0, label: 'На модерации' },
    { value: 2, label: 'Неодобренные' },
  ];

  trackStatusBy(index: number, status: { value: number | null; label: string }) {
    return status.value;
  }

  changePage(page: PageEvent) {
    this.articlesPage = page.pageIndex + 1;
    this.fetchArticles(this.selectedStatus, '');
  }

  selectBtnHandler(value: null | number) {
    this.statuses = this.statuses.map(val => {
      if (val.value === value) return { ...val, isDisabled: true };
      return { ...val, isDisabled: false };
    });

    this.articlesPage = 1;

    this.selectedStatus = value;
    this.searchControl.reset();

    this.fetchArticles(value, '');
  }

  trackArticleBy(index: number, article: IArticle) {
    return article.id;
  }

  fetchArticles(status: number | null, search: string) {
    const query: Partial<PaginatedReq> = {
      page: this.articlesPage,
      limit: 8,
      search: this.searchControl.value || '',
    };

    if (status !== null) {
      query['status'] = status;
    }

    this.isLoading = true;
    this.articleService.getUserArticles(this.user.id, query).subscribe(data => {
      this.articles = data as any;
      this.isLoading = false;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.isAuthenticatedUser) {
      this.statuses = [
        {
          value: 1,
          label: 'Активные',
          isDisabled: true,
        },
      ];
    }

    this.fetchArticles(this.isAuthenticatedUser ? null : 1, '');
  }

  protected readonly Boolean = Boolean;

  ngAfterViewInit(): void {
    console.log(this.rootElement);
  }
}
