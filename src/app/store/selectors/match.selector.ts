import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IMatchState } from '../state/match.state';

const selectMatch = (state: IAppState) => state.match;

export const selectMatchList = createSelector(
  selectMatch,
  (state: IMatchState) => state.matches
);
export const selectManualMatchList = createSelector(
  selectMatch,
  (state: IMatchState) => state.manual_matches
);

export const selectMatchPage = createSelector(
  selectMatch,
  (state: IMatchState) => state.page
);

export const selectLoadingMatch = createSelector(
  selectMatch,
  (state: IMatchState) => state.loading
);

export const selectErrorMatch = createSelector(
  selectMatch,
  (state: IMatchState) => state.error
);
