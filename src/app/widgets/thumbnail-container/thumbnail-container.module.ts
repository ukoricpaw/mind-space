import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailContainerComponent } from './thumbnail-container.component';
import { InjectImgDirective } from '../../directives/inject-img.directive';
import { MatChip } from '@angular/material/chips';

@NgModule({
  declarations: [ThumbnailContainerComponent, InjectImgDirective],
  imports: [CommonModule, MatChip],
  exports: [ThumbnailContainerComponent, InjectImgDirective],
})
export class ThumbnailContainerModule {}
