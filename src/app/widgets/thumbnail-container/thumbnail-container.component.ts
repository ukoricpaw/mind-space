import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IArticle } from '../../store/reducers/article/article.constants';

@Component({
  selector: 'app-thumbnail-container',
  templateUrl: './thumbnail-container.component.html',
  styleUrl: './thumbnail-container.component.less',
})
export class ThumbnailContainerComponent {
  @Input('articleInfo')
  articleInfo!: Omit<IArticle, 'content'>;
}
