import { ActionReducerMap } from '@ngrx/store';

import * as actions from '../actions';
import * as menteeDisplayDataReducers from './mentee-display-data.reducer';

export type Action = actions.MenteeDisplayDataAction;

export interface EntityState {
  menteeDisplayData: menteeDisplayDataReducers.MenteeDisplayDataState;
}

export const reducers: ActionReducerMap<EntityState> = {
  menteeDisplayData: menteeDisplayDataReducers.reducer,
};
