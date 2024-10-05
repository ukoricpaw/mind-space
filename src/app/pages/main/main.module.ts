import { NgModule } from '@angular/core';
import { MainPageComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { ArticleCardModule } from '../../widgets/article-card/article-card.module';
import { MatPaginator } from '@angular/material/paginator';
import { ArticlesContentModule } from '../../widgets/articles-content/articles-content.module';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: MainPageComponent }]),
    ArticleCardModule,
    CommonModule,
    SkeletonModule,
    MatPaginator,
    ArticlesContentModule,
  ],
})
export default class MainPageModule {}
