import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { delay, Observable, tap } from 'rxjs';
import { TPaginatedArticles } from '../../store/reducers/article/article.constants';
import { NavigationService } from '../../services/navigation.service';

@Component({
  templateUrl: 'main.component.html',
  styleUrl: 'main.component.less',
  selector: 'main-page',
})
export class MainPageComponent implements AfterViewInit, OnDestroy {
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

  constructor(
    private articleService: ArticleService,
    private navigationService: NavigationService,
  ) {
    this.navigationService.$navSubject.next([{ name: 'main', action: 'disable' }]);
  }

  ngOnDestroy() {
    this.navigationService.$navSubject.next([{ name: 'main', action: 'enable' }]);
  }

  ngAfterViewInit(): void {
    this.mainSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
}
