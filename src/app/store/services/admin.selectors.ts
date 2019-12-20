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

const getAllMentorsMatch = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.mentorsmatch
);

const getAllSavedMatch = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.savedmatches
);
const getMentorInfo = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.mentormenteeinfo
);

const getMSubscriptionsLoading = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.loading
);

@Injectable()
export class MSubscriptionSelectors {

  constructor(private store: Store<EntityState>) {}

  msubscriptions$ = this.store.pipe(select(getAllMSubscriptions));
  mentorinfo$ = this.store.pipe(select(getMentorInfo));
  mentorsmatch$ = this.store.pipe(select(getAllMentorsMatch));
  savedmatches$ = this.store.pipe(select(getAllSavedMatch));
  msubscriptionState$ = this.store.pipe(select(getMSubscriptionState));
  loading$ = this.store.pipe(select(getMSubscriptionsLoading));

}
