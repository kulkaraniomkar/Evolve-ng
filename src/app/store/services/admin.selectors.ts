import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector, select } from '@ngrx/store';

import { EntityState } from '../reducers';
import { MSubscriptionState } from '../reducers/admin.reducer';

const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getMSubscriptionState = createSelector(
  getEntityState,
  (state: EntityState) => state.msubscription
);

const getAllMSubscriptions = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.msubscriptions
);

const getMsubscription = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.msubscription
);

const getMSubscriptionsLoading = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.loading
);

@Injectable()
export class MSubscriptionSelectors {

  constructor(private store: Store<EntityState>) {}

  msubscriptions$ = this.store.pipe(select(getAllMSubscriptions));
  msubscription$ = this.store.pipe(select(getMsubscription));
  msubscriptionState$ = this.store.pipe(select(getMSubscriptionState));
  loading$ = this.store.pipe(select(getMSubscriptionsLoading));

}
