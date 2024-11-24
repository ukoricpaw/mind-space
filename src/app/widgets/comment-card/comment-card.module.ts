import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentCardComponent } from './comment-card.component';
import { CardModule } from 'primeng/card';
import { AvatarModule } from '../../common/avatar/avatar.module';
import AppSvgModule from '../../common/app-svg-icon/app-svg-icon.module';

@NgModule({
  declarations: [CommentCardComponent],
  imports: [CommonModule, CardModule, AvatarModule, AppSvgModule],
  exports: [CommentCardComponent],
})
export class CommentCardModule {}
