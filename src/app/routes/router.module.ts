import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './routes';

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export default class RouterAppModule {}
