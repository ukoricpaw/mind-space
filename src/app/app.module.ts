import { NgModule } from '@angular/core';
import AppComponent from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import RouterAppModule from './routes/router.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import StoreAppModule from './store/store.module';
import { HttpClientModule } from '@angular/common/http';
import HeaderModule from './widgets/header/header.module';
import FooterModule from './widgets/footer/footer.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterAppModule,
    HeaderModule,
    StoreAppModule,
    HttpClientModule,
    FooterModule,
  ],
  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync()],
})
export default class AppModule {}
