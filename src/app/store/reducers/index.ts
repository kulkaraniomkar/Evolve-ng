import { ActionReducerMap } from '@ngrx/store';

import * as actions from '../actions';
import * as menteeDisplayDataReducers from './mentee-display-data.reducer';
import * as menteesReducers from './mentee.reducer';

export type Action = actions.MenteeDisplayDataAction;

export interface EntityState {
  menteeDisplayData: menteeDisplayDataReducers.MenteeDisplayDataState;
  mentee: menteesReducers.MenteeState;
  mentees: menteesReducers.MenteeState;
}

export const reducers: ActionReducerMap<EntityState> = {
  menteeDisplayData: menteeDisplayDataReducers.reducer,
  mentee: menteesReducers.reducer,
  mentees: menteesReducers.reducer,
};
