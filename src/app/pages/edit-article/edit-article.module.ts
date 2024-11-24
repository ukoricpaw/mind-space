import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './edit-article.component';
import CreateArticleModule from '../create-article/create-article.module';
import { RouterModule } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    CreateArticleModule,
    RouterModule.forChild([
      {
        path: ':articleId',
        component: EditArticleComponent,
      },
    ]),
    SkeletonModule,
  ],
})
export default class EditArticleModule {}
