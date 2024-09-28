import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './store.reducer';
import { UserEffects, ArticleEffects } from './effects';

@NgModule({
  imports: [StoreModule.forRoot(reducer), EffectsModule.forRoot([UserEffects, ArticleEffects])],
  exports: [StoreModule, EffectsModule],
})
export default class StoreAppModule {}
