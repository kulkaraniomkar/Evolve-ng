import { createSelector } from '@ngrx/store';

import { IAppState } from '../state/app.state';
import { ISubscriptionState } from '../state/subscription.state';

const selectSubscriptions = (state: IAppState) => state.subscription;

export const selectSubscriptionList = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.subscriptions
);
export const selectSubscriptionPage = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.page
);
export const selectPendingSubscriptions = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.pendingMentees
);
export const selectAllocatedMentors = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.allocatedMentors
);
export const selectAllocatedMentorsPage = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.pageAllocated
);
export const selectUnAllocatedMentors = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.unallocatedMentors
);
export const selectUnAllocatedMentorsPage = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.pageUnallocated
);
export const selectMenteesPerMentor = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.menteesPerMentor
);
export const selectMenteesPerMentorPage = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.pagePerMentor
);

export const selectPendingPage = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.pagePending
);
export const selectExploratory = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.exploratoryMentorship
);
export const selectExploratoryPage = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.pageExploratory
);
export const selectUnallocatedPage = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.pageUnallocated
);

export const selectSelectedSubscription = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.selectedSubscription
);
export const selectLoadingSubscription = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.loading
);
export const selectLoadingMenteesPerMentor = createSelector(
  selectSubscriptions,
  (state: ISubscriptionState) => state.loadingMenteesPerMentor
);

