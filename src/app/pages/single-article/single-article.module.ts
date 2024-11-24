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
import { Button, ButtonDirective } from 'primeng/button';
import { MatButton } from '@angular/material/button';
import { IntersectionObserverDirective } from '../../directives/intersection-observer';
import { CommentCardModule } from '../../widgets/comment-card/comment-card.module';
import { CreateCommentModule } from '../../widgets/create-comment/create-comment.module';
import { MatPaginator } from '@angular/material/paginator';
import { ModalModule } from '../../widgets/modal/modal.module';

@NgModule({
  declarations: [
    SingleArticleComponent,
    IntersectionObserverDirective,
    ToHtmlDirective,
    ToArticleInfoPipe,
    ModerateArticleComponent,
  ],
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
    CommentCardModule,
    CreateCommentModule,
    ThumbnailContainerModule,
    SkeletonModule,
    AvatarModule,
    AppSvgModule,
    Button,
    MatButton,
    MatPaginator,
    ModalModule,
    ButtonDirective,
  ],
})
export default class SingleArticleModule {}
