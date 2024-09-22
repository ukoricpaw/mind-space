import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store.reducer';

@NgModule({
  imports: [StoreModule.forRoot(reducer), EffectsModule.forRoot([])],
  exports: [StoreModule, EffectsModule],
})
export default class StoreAppModule {}
