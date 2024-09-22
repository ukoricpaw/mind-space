import { NgModule } from '@angular/core';
import AppComponent from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import RouterAppModule from './routes/router.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import StoreAppModule from './store/store.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, RouterAppModule, StoreAppModule],
  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync()],
})
export default class AppModule {}
