import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { default as localeEn } from '@angular/common/locales/en';
import { registerLocaleData } from '@angular/common';
import { NZ_I18N, en_US as localeZorro, NZ_ICONS } from 'ng-zorro-antd';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { appReducers } from './store/reducers/app.reducers';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { SubscriptionEffects } from './store/effects/subscription.effect';
import { environment } from 'src/environments/environment';
import { AuthenticationInterceptor } from './services/authentication.interceptor.service';
import { SubscriptionService } from './services/subscription.service';
import { MenteeService } from './services/mentee.service';
import { MenteeEffects } from './store/effects/mentee.effects';
import { MatchEffects } from './store/effects/match.effects';
import { MatchService } from './services/match.service';
import { MentorEffects } from './store/effects/mentor.effects';
import { MentorService } from './services/mentor.service';
import { ActivityEffects } from './store/effects/activity.effects';
import { ActivityService } from './services/activity.service';
import { UserEffects } from './store/effects/user.effects';

const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
registerLocaleData(localeEn, 'en')
/**
 * AntDesign Icons
 */
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition
}
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(appReducers),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([SubscriptionEffects, MenteeEffects, MatchEffects, MentorEffects, ActivityEffects, UserEffects]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }) : [],
    AppRoutingModule,
  ],
  providers: [...LOCALE_PROVIDERS, { provide: NZ_ICONS, useValue: icons },
  { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    SubscriptionService, MenteeService, MatchService, MentorService, ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
