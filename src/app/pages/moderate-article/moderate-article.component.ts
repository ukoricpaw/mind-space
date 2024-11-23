import { Component, OnDestroy } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  styleUrl: 'moderate-article.component.less',
  templateUrl: 'moderate-article.component.html',
})
export default class ModerateArticleComponent implements OnDestroy {
  articleId!: number;
  $paramMapObsSubscription!: Subscription;
  areButtonsDisabled = false;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.$paramMapObsSubscription = this.route.paramMap.subscribe(param => {
      this.articleId = Number(param.get('articleId'));
    });
  }

  ngOnDestroy(): void {
    this.$paramMapObsSubscription.unsubscribe();
  }

  confirmArticle() {
    this.areButtonsDisabled = true;
    this.articleService.moderateArticle(this.articleId, 'CONFIRMED').subscribe(_ => {
      this.areButtonsDisabled = false;
      this.router.navigate(['/moderation']);
      this.toastr.success('Одобрено', 'Статья была одобрена');
    });
  }

  rejectArticle() {
    this.areButtonsDisabled = true;
    this.articleService.moderateArticle(this.articleId, 'DENIED').subscribe(_ => {
      this.areButtonsDisabled = false;
      this.router.navigate(['/moderation']);
      this.toastr.error('Отклонено', 'Статья была отклонена');
    });
  }
}
