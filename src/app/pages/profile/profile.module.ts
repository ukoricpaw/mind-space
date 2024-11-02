import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { ProfileModule as ProfileWidgetModule } from '../../widgets/profile/profile.module';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: ProfileComponent }]),
    NgClass,
    ProfileWidgetModule,
    SkeletonModule,
    NgIf,
  ],
})
export default class ProfileModule {}
