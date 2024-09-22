import { NgModule } from '@angular/core';
import { NotFoundPageComponent } from './not-found.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NotFoundPageComponent],
  imports: [
    MatFormFieldModule,
    RouterModule.forChild([{ path: '', component: NotFoundPageComponent }]),
  ],
})
export default class NotFoundPageModule {}
