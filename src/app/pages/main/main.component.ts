import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { delay, Observable, tap } from 'rxjs';
import { TPaginatedArticles } from '../../store/reducers/article/article.constants';

@Component({
  templateUrl: 'main.component.html',
  styleUrl: 'main.component.less',
  selector: 'main-page',
})
export class MainPageComponent implements AfterViewInit {
  isLoadingMainArticles: boolean = true;

  @ViewChild('mainSection')
  mainSection!: ElementRef<HTMLDivElement>;

  $mainArticles: Observable<TPaginatedArticles> = this.articleService
    .getArticles({ search: '', sort: 'desc', limit: 4, page: 1 })
    .pipe(
      delay(200) as any,
      tap(() => {
        this.isLoadingMainArticles = false;
      }),
    );

  constructor(private articleService: ArticleService) {}

  ngAfterViewInit(): void {
    this.mainSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
