import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';

import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';

const apiRoot = environment.apiUrlBase + '/';
const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: apiRoot,
  entityHttpResourceUrls: {
    Mentor: { entityResourceUrl: apiRoot + 'mentors/', collectionResourceUrl: apiRoot + 'mentors/' },
    Mentee: { entityResourceUrl: apiRoot + 'mentees/', collectionResourceUrl: apiRoot + 'mentees/' },
  }
};

@NgModule({
  imports: [
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    environment.production ? [] : StoreDevtoolsModule.instrument()
  ],
  providers: [ { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig } ]
})
export class AppStoreModule {}