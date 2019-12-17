import { ActionReducerMap } from '@ngrx/store';

import * as actions from '../actions';
import * as menteesReducers from './mentee.reducer';
import * as mentorsReducers from './mentor.reducer';
import * as msubscriptionsReducers from './admin.reducer';
import * as searchMentorsReducers from './search-mentor.reducer';

export type Action = actions.MenteeAction;

export interface EntityState {
  mentees: menteesReducers.MenteeState;
  mentee: menteesReducers.MenteeState;
  mentors: mentorsReducers.MentorState,
  mentor: mentorsReducers.MentorState;
  msubscription: msubscriptionsReducers.MSubscriptionState;
  searchResults: searchMentorsReducers.SearchMentorState;
}

export const reducers: ActionReducerMap<EntityState> = {
  mentees: menteesReducers.reducer,
  mentee: menteesReducers.reducer,
  mentors: mentorsReducers.reducer,
  mentor: mentorsReducers.reducer,
  msubscription: msubscriptionsReducers.reducer,
  searchResults: searchMentorsReducers.reducer
};
