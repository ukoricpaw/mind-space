import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCommentComponent } from './create-comment.component';
import { CardModule } from 'primeng/card';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from 'primeng/button';

@NgModule({
  declarations: [CreateCommentComponent],
  imports: [CommonModule, CardModule, ReactiveFormsModule, ButtonDirective],
  exports: [CreateCommentComponent],
})
export class CreateCommentModule {}
