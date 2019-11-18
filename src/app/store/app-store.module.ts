import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './reducers';
import { MenteeDisplayDataService, MenteeDisplayDataSelectors, MenteeDataService, MenteeSelectors } from './services';
import { MenteeDisplayDataEffects } from './effects/mentee-display-data.effects';
import { MenteeEffects } from './effects/mentee.effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('entityCache', reducers),
    EffectsModule.forFeature([ MenteeDisplayDataEffects, MenteeEffects])
  ],
  providers: [
    MenteeDisplayDataService,
    MenteeDisplayDataSelectors,
    MenteeDataService,
    MenteeSelectors,
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}

// import { NgModule } from '@angular/core';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule } from '@ngrx/store';
// import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// import { environment } from '../../environments/environment';

// import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
// import { entityConfig } from './entity-metadata';

// const apiRoot = environment.apiUrl + '/';
// const defaultDataServiceConfig: DefaultDataServiceConfig = {
//   root: apiRoot,
//   entityHttpResourceUrls: {
//     Mentor: { entityResourceUrl: apiRoot + 'mentors/', collectionResourceUrl: apiRoot + 'mentors/' },
//     Mentee: { entityResourceUrl: apiRoot + 'mentees/', collectionResourceUrl: apiRoot + 'mentees/' },
//     MenteeDisplayData: { entityResourceUrl: apiRoot + 'mentee/get/', collectionResourceUrl: apiRoot + 'mentee/get/0' },
//     DisplayData: { entityResourceUrl: apiRoot + 'mentor1/', collectionResourceUrl: apiRoot + 'mentees1/' },
//   }
// };

// @NgModule({
//   imports: [
//     StoreModule.forRoot({}),
//     EffectsModule.forRoot([]),
//     EntityDataModule.forRoot(entityConfig),
//     environment.production ? [] : StoreDevtoolsModule.instrument()
//   ],
//   providers: [ { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig } ]
// })
// export class AppStoreModule {}