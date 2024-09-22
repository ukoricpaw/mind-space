import { NgModule } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './routes';

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterLink, RouterOutlet],
  exports: [RouterModule, RouterLink, RouterOutlet],
})
export default class RouterAppModule {}
