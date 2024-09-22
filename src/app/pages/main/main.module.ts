import { NgModule } from '@angular/core';
import { MainPageComponent } from './main.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    RouterModule.forChild([{ path: '', component: MainPageComponent }]),
  ],
})
export default class MainPageModule {}
