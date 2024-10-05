import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { ThumbnailContainerModule } from '../../widgets/thumbnail-container/thumbnail-container.module';

@NgModule({
  declarations: [AvatarComponent],
  imports: [CommonModule, ThumbnailContainerModule],
  exports: [AvatarComponent],
})
export class AvatarModule {}
