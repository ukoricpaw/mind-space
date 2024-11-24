import { Routes } from '@angular/router';
import { IsUserAuthGuard } from '../guards/is-user-auth.guard';
import { IsUserModeratorGuard } from '../guards/is-user-moderator.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../pages/main/main.module').then(mod => mod.default),
  },
  {
    path: 'auth/:auth-type',
    loadChildren: () => import('../pages/auth/auth.module').then(mod => mod.default),
  },
  {
    path: 'create-article',
    canActivate: [IsUserAuthGuard],
    loadChildren: () => import('../pages/create-article/create-article.module').then(mod => mod.default),
  },
  {
    path: 'articles/:articleId',
    loadChildren: () => import('../pages/single-article/single-article.module').then(mod => mod.default),
  },
  {
    path: 'profile/:profileId',
    loadChildren: () => import('../pages/profile/profile.module').then(mod => mod.default),
  },
  {
    path: 'moderation',
    canActivate: [IsUserModeratorGuard],
    loadChildren: () => import('../pages/moderation/moderation.module').then(mod => mod.default),
  },
  {
    path: 'edit-article',
    canActivate: [IsUserAuthGuard],
    loadChildren: () => import('../pages/edit-article/edit-article.module').then(mod => mod.default),
  },
  {
    path: '**',
    loadChildren: () => import('../pages/not-found/not-found.module').then(mod => mod.default),
  },
];
