import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ISingleArticleDto } from '../../store/reducers/article/article.constants';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.less',
})
export class EditArticleComponent implements OnInit {
  isLoading = true;
  article: null | ISingleArticleDto = null;

  constructor(
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.articleService
        .getSingleArticle(Number(params.get('articleId')), true)
        .pipe(
          catchError(err => {
            this.router.navigate(['']);
            return throwError(err);
          }),
        )
        .subscribe(data => {
          this.isLoading = false;
          this.article = data;
        });
    });
  }
}
