import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesContentComponent } from './articles-content.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ArticleCardModule } from '../article-card/article-card.module';
import { MatPaginator } from '@angular/material/paginator';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonDirective } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [ArticlesContentComponent],
  imports: [
    CommonModule,
    SkeletonModule,
    ArticleCardModule,
    MatPaginator,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonDirective,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  exports: [ArticlesContentComponent],
})
export class ArticlesContentModule {}
