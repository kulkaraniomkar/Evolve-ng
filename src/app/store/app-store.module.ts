import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { MenteeEffects} from './effects/mentee.effects';
import { MentorEffects} from './effects/mentor.effects';
import { SearchMentorEffects } from './effects/search-mentor.effects';
import { MenteeDataService, MenteeSelectors, SearchMentorSelectors, SearchMentorDataService, MentorSelectors, MentorDataService } from './services';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('entityCache', reducers),
    EffectsModule.forFeature([ MenteeEffects, MentorEffects, SearchMentorEffects ])
  ],
  providers: [
    MenteeDataService,
    MentorDataService,
    SearchMentorDataService,
    MenteeSelectors,
    MentorSelectors,
    SearchMentorSelectors
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
