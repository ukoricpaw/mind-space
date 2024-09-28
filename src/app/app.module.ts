import { NgModule, isDevMode } from '@angular/core';
import AppComponent from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import RouterAppModule from './routes/router.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import StoreAppModule from './store/store.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import HeaderModule from './widgets/header/header.module';
import FooterModule from './widgets/footer/footer.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterAppModule,
    HeaderModule,
    StoreAppModule,
    HttpClientModule,
    FooterModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  bootstrap: [AppComponent],
  providers: [provideAnimationsAsync(), { multi: true, provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor }],
})
export default class AppModule {}
