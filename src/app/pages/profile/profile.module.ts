import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { ProfileModule as ProfileWidgetModule } from '../../widgets/profile/profile.module';
import { SkeletonModule } from 'primeng/skeleton';
import { ProfileArticlesModule } from '../../widgets/profile-articles/profile-articles.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    NgClass,
    ProfileWidgetModule,
    SkeletonModule,
    NgIf,
    ProfileArticlesModule,
  ],
})
export default class ProfileModule {}
