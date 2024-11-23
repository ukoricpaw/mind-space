import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleArticleComponent } from './single-article.component';
import { RouterModule } from '@angular/router';
import { ToHtmlDirective } from '../../directives/to-html.directive';
import { ThumbnailContainerModule } from '../../widgets/thumbnail-container/thumbnail-container.module';
import { ToArticleInfoPipe } from '../../pipes/to-article-info.pipe';
import { SkeletonModule } from 'primeng/skeleton';
import { AvatarModule } from '../../common/avatar/avatar.module';
import AppSvgModule from '../../common/app-svg-icon/app-svg-icon.module';
import ModerateArticleComponent from '../moderate-article/moderate-article.component';
import { IsUserModeratorGuard } from '../../guards/is-user-moderator.guard';
import { Button } from 'primeng/button';
import { MatButton } from '@angular/material/button';

@NgModule({
  declarations: [SingleArticleComponent, ToHtmlDirective, ToArticleInfoPipe, ModerateArticleComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: SingleArticleComponent,
      },
      {
        path: 'moderate',
        component: ModerateArticleComponent,
        canActivate: [IsUserModeratorGuard],
      },
    ]),
    ThumbnailContainerModule,
    SkeletonModule,
    AvatarModule,
    AppSvgModule,
    Button,
    MatButton,
  ],
})
export default class SingleArticleModule {}
