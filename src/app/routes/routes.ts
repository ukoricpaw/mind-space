import { Routes } from '@angular/router';
import { AuthPageComponent } from '../pages/auth/auth.component';
import { MainPageComponent } from '../pages/main/main.component';
import { NotFoundPageComponent } from '../pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../pages/main/main.module').then((mod) => mod.default),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../pages/auth/auth.module').then((mod) => mod.default),
  },
  {
    path: '**',
    loadChildren: () =>
      import('../pages/not-found/not-found.module').then((mod) => mod.default),
  },
];
