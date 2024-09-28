import { Routes } from '@angular/router';
import {IsUserAuthGuard} from "../guards/is-user-auth.guard";

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../pages/main/main.module').then((mod) => mod.default),
  },
  {
    path: 'auth/:auth-type',
    loadChildren: () =>
      import('../pages/auth/auth.module').then((mod) => mod.default),
  },
  {
    path: "create-article",
    canActivate: [IsUserAuthGuard],
    loadChildren: () => import("../pages/create-article/create-article.module").then(mod => mod.default),
  },
  {
    path: '**',
    loadChildren: () =>
      import('../pages/not-found/not-found.module').then((mod) => mod.default),
  },
];
