import { Action } from '@ngrx/store';

import { MenteeDisplayData } from '../../core/model/mentee-display-data';
import { DataServiceError } from '../services';
import { DataAction, DataErrorAction } from './data.actions';


export const GET_MENTEE_DISPLAY_DATA = '[MenteeDisplayData] GET_MENTEE_DISPLAY_DATA';
export const GET_MENTEE_DISPLAY_DATA_SUCCESS = '[MenteeDisplayData] GET_MENTEE_DISPLAY_DATA_SUCCESS';
export const GET_MENTEE_DISPLAY_DATA_ERROR = '[MenteeDisplayData] GET_MENTEE_DISPLAY_DATA_ERROR';


export const SET_MENTEE_DISPLAY_DATA_LOADING = '[MenteeDisplayData] SET_MENTEE_DISPLAY_DATA_LOADING';

export abstract class MenteeDisplayDataAction implements DataAction<MenteeDisplayData> {
  readonly type: string;
  constructor(public readonly payload: MenteeDisplayData) {}
}

export abstract class MenteeDisplayDataErrorAction implements DataErrorAction<MenteeDisplayData> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<MenteeDisplayData>) {}
}

export class GetMenteeDisplayData implements Action {
  readonly type = GET_MENTEE_DISPLAY_DATA;
  constructor(public readonly payload: number) {}
}

export class GetMenteeDisplayDataSuccess implements Action {
  readonly type = GET_MENTEE_DISPLAY_DATA_SUCCESS;
  constructor(public readonly payload: MenteeDisplayData) {}
}

export class GetMenteeDisplayDataError extends MenteeDisplayDataErrorAction {
  readonly type = GET_MENTEE_DISPLAY_DATA_ERROR;
}


export class SetMenteeDisplayDataLoading {
  readonly type = SET_MENTEE_DISPLAY_DATA_LOADING;
  constructor(public payload = true) {}
}

export type AllMenteeDisplayDataActions =
  | GetMenteeDisplayData
  | GetMenteeDisplayDataSuccess
  | GetMenteeDisplayDataError ;
