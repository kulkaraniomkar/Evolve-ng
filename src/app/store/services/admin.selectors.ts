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
const getManualMatch = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.manualmatch
);
const getAllSavedMatch = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.savedmatches
);
const getMentorInfo = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.mentormenteeinfo
);
const getMentorMentee = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.mentormentee
);

const getMSubscriptionsLoading = createSelector(
  getMSubscriptionState,
  (state: MSubscriptionState) => state.loading
);

@Injectable()
export class MSubscriptionSelectors {

  constructor(private store: Store<EntityState>) {}

  manualmatch$ = this.store.pipe(select(getManualMatch));
  msubscriptions$ = this.store.pipe(select(getAllMSubscriptions));
  mentorMentee$ = this.store.pipe(select(getMentorMentee));
  mentorinfo$ = this.store.pipe(select(getMentorInfo));
  mentorsmatch$ = this.store.pipe(select(getAllMentorsMatch));
  savedmatches$ = this.store.pipe(select(getAllSavedMatch));
  msubscriptionState$ = this.store.pipe(select(getMSubscriptionState));
  loading$ = this.store.pipe(select(getMSubscriptionsLoading));

}
