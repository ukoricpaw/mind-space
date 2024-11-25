import { Component, Input, OnChanges } from '@angular/core';
import { IArticle } from '../../store/reducers/article/article.constants';
import { ActiveTypes } from '../../types/article.types';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.less',
})
export class ArticleCardComponent implements OnChanges {
  @Input('article')
  article!: Omit<IArticle, 'inviteLink' | 'content'>;
  disabledMessage: string | null = null;

  @Input('toModerate') toModerate!: boolean;

  ngOnChanges() {
    switch (this.article.articleActiveType) {
      case ActiveTypes.ACTIVE:
        return;
      case ActiveTypes.BANNED:
        this.disabledMessage = 'Статья недоступна';
        return;
      case ActiveTypes.MODERATION:
        this.disabledMessage = 'Статья на модерации';
        return;
    }
  }
}
