import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector, select } from '@ngrx/store';

import { EntityState } from '../reducers';
import { MenteeState } from '../reducers/mentee.reducer';

const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getMenteeState = createSelector(
  getEntityState,
  (state: EntityState) => state.mentees
);

const getAllMentees = createSelector(
  getMenteeState,
  (state: MenteeState) => state.mentees
);

const getMentee = createSelector(
  getMenteeState,
  (state: MenteeState) => state.mentee
);

const getMenteesLoading = createSelector(
  getMenteeState,
  (state: MenteeState) => state.loading
);

@Injectable()
export class MenteeSelectors {

  constructor(private store: Store<EntityState>) {}

  mentees$ = this.store.pipe(select(getAllMentees));
  mentee$ = this.store.pipe(select(getMentee));
  menteeState$ = this.store.pipe(select(getMenteeState));
  loading$ = this.store.pipe(select(getMenteesLoading));

}
