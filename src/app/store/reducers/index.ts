import { ActionReducerMap } from '@ngrx/store';

import * as actions from '../actions';
import * as menteesReducers from './mentee.reducer';

export type Action = actions.MenteeAction;

export interface EntityState {
  mentees: menteesReducers.MenteeState;
  mentee: menteesReducers.MenteeState;
}

export const reducers: ActionReducerMap<EntityState> = {
  mentees: menteesReducers.reducer,
  mentee: menteesReducers.reducer
};
