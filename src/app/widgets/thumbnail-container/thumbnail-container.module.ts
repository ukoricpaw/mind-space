import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThumbnailContainerComponent } from './thumbnail-container.component';
import { InjectImgDirective } from '../../directives/inject-img.directive';
import { MatChip } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import AppSvgModule from '../../common/app-svg-icon/app-svg-icon.module';

@NgModule({
  declarations: [ThumbnailContainerComponent, InjectImgDirective],
  imports: [CommonModule, MatChip, RouterLink, AppSvgModule],
  exports: [ThumbnailContainerComponent, InjectImgDirective],
})
export class ThumbnailContainerModule {}
