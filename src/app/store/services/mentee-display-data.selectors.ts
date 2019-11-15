import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector, select } from '@ngrx/store';

import { EntityState } from '../reducers';
import { MenteeDisplayDataState } from '../reducers/mentee-display-data.reducer';

const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getMenteeDisplayDataState = createSelector(
  getEntityState,
  (state: EntityState) => state.menteeDisplayData
);

// const getAllCustomers = createSelector(
//   getCustomerState,
//   (state: CustomerState) => state.customers
// );

const getMenteeDisplayData = createSelector(
  getMenteeDisplayDataState,
  (state: MenteeDisplayDataState) => state.menteeDisplayData
);

const getMenteeDisplayDataLoading = createSelector(
  getMenteeDisplayDataState,
  (state: MenteeDisplayDataState) => state.loading
);

@Injectable()
export class MenteeDisplayDataSelectors {

  constructor(private store: Store<EntityState>) {}

  menteeDisplayData$ = this.store.pipe(select(getMenteeDisplayData));
  menteeDisplayDataState$ = this.store.pipe(select(getMenteeDisplayDataState));
  loading$ = this.store.pipe(select(getMenteeDisplayDataLoading));

}
