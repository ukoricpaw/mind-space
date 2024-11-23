import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModerationComponent } from './moderation.component';
import { Route, RouterModule } from '@angular/router';
import { ArticlesContentModule } from '../../widgets/articles-content/articles-content.module';

const routes: Route[] = [
  {
    path: '',
    component: ModerationComponent,
  },
];

@NgModule({
  declarations: [ModerationComponent],
  imports: [CommonModule, RouterModule.forChild(routes), ArticlesContentModule],
})
export default class ModerationModule {}
