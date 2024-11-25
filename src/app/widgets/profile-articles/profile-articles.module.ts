import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ArticleCardModule } from '../article-card/article-card.module';
import { SkeletonModule } from 'primeng/skeleton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonDirective } from 'primeng/button';
import { MatPaginator } from '@angular/material/paginator';

@NgModule({
  declarations: [ProfileArticlesComponent],
  imports: [
    CommonModule,
    ArticleCardModule,
    SkeletonModule,
    FormsModule,
    InputTextModule,
    ButtonDirective,
    ReactiveFormsModule,
    MatPaginator,
  ],
  exports: [ProfileArticlesComponent],
})
export class ProfileArticlesModule {}
