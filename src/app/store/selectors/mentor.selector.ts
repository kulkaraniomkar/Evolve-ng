import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { IMentorState } from '../state/mentor.state';

const selectMentor = (state: IAppState) => state.mentor;

export const selectSuggestedMentor = createSelector(
  selectMentor,
  (state: IMentorState) => state.mentorSearch
);
export const selectLoadingSearchMentor = createSelector(
  selectMentor,
  (state: IMentorState) => state.loadingSearch
);
export const selectMentorState = createSelector(
  selectMentor,
  (state: IMentorState) => state.mentor
);
export const selectMentorSubscriptionState = createSelector(
  selectMentor,
  (state: IMentorState) => state.mentorSubscription
);
export const selectMentorExtraState = createSelector(
  selectMentor,
  (state: IMentorState) => state.mentorExtra
);
export const selectMentorPagingState = createSelector(
  selectMentor,
  (state: IMentorState) => state.page
);
export const selectLoadingMentorSubscription = createSelector(
  selectMentor,
  (state: IMentorState) => state.loading
);
export const selectSignupStatusMentor = createSelector(
  selectMentor,
  (state: IMentorState) => state.signupStatus
);


export const selectLoadingMentor = createSelector(
  selectMentor,
  (state: IMentorState) => state.loading
);
