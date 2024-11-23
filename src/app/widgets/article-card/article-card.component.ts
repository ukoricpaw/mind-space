import { Component, Input } from '@angular/core';
import { IArticle } from '../../store/reducers/article/article.constants';

@Component({
  selector: 'app-article-card',
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.less',
})
export class ArticleCardComponent {
  @Input('article')
  article!: Omit<IArticle, 'inviteLink' | 'content'>;

  @Input('toModerate') toModerate!: boolean;
}
