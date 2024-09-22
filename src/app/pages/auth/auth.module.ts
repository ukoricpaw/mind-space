import { NgModule } from '@angular/core';
import { AuthPageComponent } from './auth.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: AuthPageComponent }]),
  ],
})
export default class AuthPageModule {}
