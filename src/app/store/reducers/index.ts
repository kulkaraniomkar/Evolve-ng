import { ActionReducerMap } from '@ngrx/store';

import * as actions from '../actions';
import * as menteesReducers from './mentee.reducer';
import * as searchMentorsReducers from './search-mentor.reducer';

export type Action = actions.MenteeAction;

export interface EntityState {
  mentees: menteesReducers.MenteeState;
  mentee: menteesReducers.MenteeState;
  searchResults: searchMentorsReducers.SearchMentorState;
}

export const reducers: ActionReducerMap<EntityState> = {
  mentees: menteesReducers.reducer,
  mentee: menteesReducers.reducer,
  searchResults: searchMentorsReducers.reducer
};
