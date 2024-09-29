import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailContainerComponent } from './thumbnail-container.component';
import { InjectImgDirective } from '../../directives/inject-img.directive';

@NgModule({
  declarations: [ThumbnailContainerComponent, InjectImgDirective],
  imports: [CommonModule],
  exports: [ThumbnailContainerComponent],
})
export class ThumbnailContainerModule {}
