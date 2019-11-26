import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { MenteeEffects} from './effects/mentee.effects';
import { SearchMentorEffects } from './effects/search-mentor.effects';
import { MenteeDataService, MenteeSelectors, SearchMentorSelectors, SearchMentorDataService } from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('entityCache', reducers),
    EffectsModule.forFeature([ MenteeEffects, SearchMentorEffects ])
  ],
  providers: [
    MenteeDataService,
    SearchMentorDataService,
    MenteeSelectors,
    SearchMentorSelectors
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
