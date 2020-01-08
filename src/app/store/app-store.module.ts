import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterStateSerializer, RouterState } from '@ngrx/router-store'

import { reducers } from './reducers';
import { MenteeEffects } from './effects/mentee.effects';
import { MentorEffects } from './effects/mentor.effects';
import { SearchMentorEffects } from './effects/search-mentor.effects';
import { MenteeDataService, MenteeSelectors, SearchMentorSelectors, SearchMentorDataService, MentorSelectors, MentorDataService, MSubscriptionSelectors, MSubscriptionDataService } from './services';
import { MSubscriptionEffects } from './effects/admin.effects';
import { CustomSerializer } from './reducers/router.reducer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('entityCache', reducers),
    EffectsModule.forFeature([MenteeEffects, MentorEffects, MSubscriptionEffects, SearchMentorEffects]),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
      //serializer: CustomSerializer,
      //routerState: RouterState.Minimal
    })
  ],
  providers: [
    MenteeDataService,
    MentorDataService,
    SearchMentorDataService,
    MSubscriptionDataService,
    MenteeSelectors,
    MentorSelectors,
    SearchMentorSelectors,
    MSubscriptionSelectors,
    // {
    //   provide: RouterStateSerializer,
    //   useClass: CustomSerializer
    // }
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule { }
