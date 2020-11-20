import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IActivityState } from '../state/activity.state';

const selectActivity = (state: IAppState) => state.activity;

export const selectActivityState = createSelector(
  selectActivity,
  (state: IActivityState) => state.activity
);
export const selectMatchTypeState = createSelector(
  selectActivity,
  (state: IActivityState) => state.matchType
);

export const selectLoadingActivity = createSelector(
  selectActivity,
  (state: IActivityState) => state.loading
);
