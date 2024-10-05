import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleCardComponent } from './article-card.component';
import { ThumbnailContainerModule } from '../thumbnail-container/thumbnail-container.module';
import { SkeletonModule } from 'primeng/skeleton';
import { RouterLink } from '@angular/router';
import { CalendarIcon } from 'primeng/icons/calendar';
import { BlankIcon } from 'primeng/icons/blank';
import { MatChip } from '@angular/material/chips';
import { AvatarModule } from '../../common/avatar/avatar.module';

@NgModule({
  declarations: [ArticleCardComponent],
  imports: [
    CommonModule,
    ThumbnailContainerModule,
    SkeletonModule,
    RouterLink,
    CalendarIcon,
    BlankIcon,
    MatChip,
    AvatarModule,
  ],
  exports: [ArticleCardComponent],
})
export class ArticleCardModule {}
