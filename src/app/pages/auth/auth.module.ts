import { NgModule } from '@angular/core';
import { AuthPageComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IsUserAuthGuard } from '../../guards/is-user-auth.guard';

@NgModule({
  declarations: [AuthPageComponent],
  providers: [IsUserAuthGuard],
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthPageComponent,
        pathMatch: 'full',
      },
    ]),
  ],
})
export default class AuthPageModule {}
