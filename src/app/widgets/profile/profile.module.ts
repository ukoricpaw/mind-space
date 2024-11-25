import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { AvatarModule } from '../../common/avatar/avatar.module';
import { NgForOf } from '@angular/common';

@NgModule({
  declarations: [ProfileComponent],
  imports: [AvatarModule, NgForOf],
  exports: [ProfileComponent],
})
export class ProfileModule {}
