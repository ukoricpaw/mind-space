import { NgModule } from '@angular/core';
import { Header } from './header.component';
import { MindSpaceLogoComponent } from '../../common/mind-space-logo/mind-space-logo.component';
import { CommonModule } from '@angular/common';
import RouterAppModule from '../../routes/router.module';
import AppSvgModule from '../../common/app-svg-icon/app-svg-icon.module';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [Header, MindSpaceLogoComponent],
  imports: [CommonModule, RouterAppModule, AppSvgModule],
  exports: [Header],
})
export default class HeaderModule {}
