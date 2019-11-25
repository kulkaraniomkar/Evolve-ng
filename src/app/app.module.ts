import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BreadcrumbModule} from 'angular-crumbs';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppStoreModule } from './store/app-store.module';
import { AuthenticationInterceptor } from './shared/authentication.interceptor.service';
import { CoreModule } from './core/core.module';

export const metaReducers: MetaReducer<any>[] = environment.production ? [] : [];
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BreadcrumbModule,
    CoreModule,
    HttpClientModule,
    AppRoutingModule,
    AppStoreModule,
    StoreModule.forRoot({}, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument(): []
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
