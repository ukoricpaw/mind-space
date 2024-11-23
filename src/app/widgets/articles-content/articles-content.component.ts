import { Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { ITag, TPaginatedArticles } from '../../store/reducers/article/article.constants';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, Observable, Subscription } from 'rxjs';
import { ArticleService } from '../../services/article.service';
import { Paginated } from '../../types/common.types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-articles-content',
  templateUrl: './articles-content.component.html',
  styleUrl: './articles-content.component.less',
})
export class ArticlesContentComponent implements OnDestroy, OnChanges {
  @Input('toModerate') toModerate!: boolean;

  $searchObs!: Subscription;
  isLoadingOtherContent: boolean = true;
  isLoadingContentArticles: boolean = false;
  page = 1;
  limit = 10;
  search = new FormControl<string>('');
  chosenTags: ITag[] = [];
  searchedTitles!: Paginated<{ title: string; id: number }>;
  title = 'Новые статьи';

  $tags = this.articleService.getTags();

  @ViewChild('contentSection')
  contentSection!: ElementRef<HTMLDivElement>;

  contentArticles!: TPaginatedArticles;

  changePage(page: PageEvent) {
    this.page = page.pageIndex + 1;
    this.limit = page.pageSize;
    this.searchArticles();
  }

  getObserverOfSearching(toModerate?: boolean) {
    return this.search.valueChanges.pipe(debounceTime(250)).subscribe(search => {
      this.articleService.getSearchedTitles(search as string, toModerate).subscribe(data => {
        this.searchedTitles = data;
      });
    });
  }

  constructor(private articleService: ArticleService) {
    this.$searchObs = this.getObserverOfSearching();
  }

  searchByTag(tag: ITag) {
    this.chosenTags = [tag];
    this.searchArticles();
  }

  searchArticles() {
    this.isLoadingContentArticles = true;
    this.getContentArticles(this.toModerate);
  }

  resetTags() {
    this.chosenTags = [];
    this.searchArticles();
  }

  getContentArticles(toModerate?: boolean) {
    if (this.contentSection) {
      this.contentSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }

    const getArticles = toModerate ? this.articleService.getModerationArticles : this.articleService.getArticles;

    getArticles({
      search: this.search.value ?? '',
      sort: 'desc',
      limit: this.limit,
      page: this.page,
      tags: this.chosenTags.map(tag => String(tag.id)) || undefined,
    }).subscribe(articles => {
      this.isLoadingOtherContent = false;
      this.isLoadingContentArticles = false;
      this.contentArticles = articles as TPaginatedArticles;
    });
  }

  isTagChosen(id: number) {
    const tag = this.chosenTags.find(tag => tag.id === id);
    return !!tag;
  }

  ngOnDestroy() {
    this.$searchObs.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getContentArticles(this.toModerate);
    if (this.toModerate) {
      this.title = 'Новые статьи для модерации';
      this.$searchObs.unsubscribe();
      this.$searchObs = this.getObserverOfSearching(true);
    }
  }
}
