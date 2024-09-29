import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleArticleComponent } from './single-article.component';
import { RouterModule } from '@angular/router';
import { ToHtmlDirective } from '../../directives/to-html.directive';
import { ThumbnailContainerModule } from '../../widgets/thumbnail-container/thumbnail-container.module';
import { ToArticleInfoPipe } from '../../pipes/to-article-info.pipe';

@NgModule({
  declarations: [SingleArticleComponent, ToHtmlDirective, ToArticleInfoPipe],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SingleArticleComponent,
      },
    ]),
    ThumbnailContainerModule,
  ],
})
export default class SingleArticleModule {}
