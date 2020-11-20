import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IMenteeState } from '../state/mentee.state';

const selectMentee = (state: IAppState) => state.mentee;

export const selectMenteeState = createSelector(
  selectMentee,
  (state: IMenteeState) => state.mentee
);

export const selectLoadingMentee = createSelector(
  selectMentee,
  (state: IMenteeState) => state.loading
);

export const selectMenteeSubscriptionState = createSelector(
  selectMentee,
  (state: IMenteeState) => state.menteeSubscription
);

export const selectMenteePagingState = createSelector(
  selectMentee,
  (state: IMenteeState) => state.page
);

export const selectSignupStatusMentee = createSelector(
  selectMentee,
  (state: IMenteeState) => state.signupStatus
);
