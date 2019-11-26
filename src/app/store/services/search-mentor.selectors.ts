import { Injectable } from '@angular/core';
import { Store, createSelector, createFeatureSelector, select } from '@ngrx/store';

import { EntityState } from '../reducers';
import { SearchMentorState } from '../reducers/search-mentor.reducer';

const getEntityState = createFeatureSelector<EntityState>('entityCache');

const getSearchMentorsState = createSelector(
  getEntityState,
  (state: EntityState) => state.searchResults
);
const getAllSearchMentors = createSelector(
  getSearchMentorsState,
  (state: SearchMentorState) => state.searchResults
);

const getSearchMentorsLoading = createSelector(
  getSearchMentorsState,
  (state: SearchMentorState) => state.loading
);

@Injectable()
export class SearchMentorSelectors {

  constructor(private store: Store<EntityState>) {}

  searchResults$ = this.store.pipe(select(getAllSearchMentors));
  searchMentorState$ = this.store.pipe(select(getSearchMentorsState));
  loading$ = this.store.pipe(select(getSearchMentorsLoading));

}
