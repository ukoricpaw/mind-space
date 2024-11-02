import { NgModule } from '@angular/core';
import { Header } from './header.component';
import { MindSpaceLogoComponent } from '../../common/mind-space-logo/mind-space-logo.component';
import { CommonModule } from '@angular/common';
import RouterAppModule from '../../routes/router.module';
import AppSvgModule from '../../common/app-svg-icon/app-svg-icon.module';
import { RouterLink } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonDirective } from 'primeng/button';
import { BanIcon } from 'primeng/icons/ban';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { AvatarModule } from '../../common/avatar/avatar.module';

@NgModule({
  declarations: [Header, MindSpaceLogoComponent],
  imports: [
    CommonModule,
    RouterAppModule,
    AppSvgModule,
    SkeletonModule,
    ButtonDirective,
    BanIcon,
    ConfirmPopupModule,
    AvatarModule,
  ],
  exports: [Header],
})
export default class HeaderModule {}
