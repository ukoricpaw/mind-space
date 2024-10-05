import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
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
export class ArticlesContentComponent implements OnDestroy {
  $searchObs!: Subscription;
  isLoadingOtherContent: boolean = true;
  isLoadingContentArticles: boolean = false;
  page = 1;
  limit = 10;
  search = new FormControl<string>('');
  chosenTags: ITag[] = [];
  searchedTitles!: Paginated<{ title: string; id: number }>;

  $tags = this.articleService.getTags();

  @ViewChild('contentSection')
  contentSection!: ElementRef<HTMLDivElement>;

  contentArticles!: TPaginatedArticles;

  changePage(page: PageEvent) {
    this.page = page.pageIndex + 1;
    this.limit = page.pageSize;
    this.searchArticles();
  }

  constructor(private articleService: ArticleService) {
    this.getContentArticles();
    this.$searchObs = this.search.valueChanges.pipe(debounceTime(250)).subscribe(search => {
      this.articleService.getSearchedTitles(search as string).subscribe(data => {
        this.searchedTitles = data;
      });
    });
  }

  searchByTag(tag: ITag) {
    this.chosenTags = [tag];
    this.searchArticles();
  }

  searchArticles() {
    this.isLoadingContentArticles = true;
    this.getContentArticles();
  }

  resetTags() {
    this.chosenTags = [];
    this.searchArticles();
  }

  getContentArticles() {
    if (this.contentSection) {
      this.contentSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
    (
      this.articleService.getArticles({
        search: this.search.value ?? '',
        sort: 'desc',
        limit: this.limit,
        page: this.page,
        tags: this.chosenTags.map(tag => String(tag.id)) || undefined,
      }) as Observable<TPaginatedArticles>
    ).subscribe(articles => {
      this.isLoadingOtherContent = false;
      this.isLoadingContentArticles = false;
      this.contentArticles = articles;
    });
  }

  isTagChosen(id: number) {
    const tag = this.chosenTags.find(tag => tag.id === id);
    return !!tag;
  }

  ngOnDestroy() {
    this.$searchObs.unsubscribe();
  }
}
