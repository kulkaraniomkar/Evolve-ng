import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector, select } from '@ngrx/store';

import { EntityState } from '../reducers';
import { MentorState } from '../reducers/mentor.reducer';

const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getMentorState = createSelector(
  getEntityState,
  (state: EntityState) => state.mentors
);

const getAllMentors = createSelector(
  getMentorState,
  (state: MentorState) => state.mentors
);

 const getMentor = createSelector(
  getMentorState,
  (state: MentorState) => state.mentor
);
export const getRegisteredStatus = createSelector(
  getMentorState,
  (state: MentorState) => state.registered
);

export const getMentorsLoading = createSelector(
  getMentorState,
  (state: MentorState) => state.loading
);

@Injectable()
export class MentorSelectors {

  constructor(private store: Store<EntityState>) {}

  mentors$ = this.store.pipe(select(getAllMentors));
  mentorRegistered$ = this.store.pipe(select(getRegisteredStatus));
  mentor$ = this.store.pipe(select(getMentor));
  mentorState$ = this.store.pipe(select(getMentorState));
  loading$ = this.store.pipe(select(getMentorsLoading));

}
