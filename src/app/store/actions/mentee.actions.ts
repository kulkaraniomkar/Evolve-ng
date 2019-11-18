import { Action } from '@ngrx/store';

import { Mentee } from '../../core/model/mentee';
import { DataServiceError } from '../services';
import { DataAction, DataErrorAction } from './data.actions';

export const GET_MENTEE = '[Mentee] GET_MENTEE';
export const GET_MENTEE_SUCCESS = '[Mentee] GET_MENTEE_SUCCESS';
export const GET_MENTEE_ERROR = '[Mentee] GET_MENTEE_ERROR';


export const GET_MENTEES = '[Mentees] GET_MENTEES';
export const GET_MENTEES_SUCCESS = '[Mentees] GET_MENTEES_SUCCESS';
export const GET_MENTEES_ERROR = '[Mentees] GET_MENTEES_ERROR';


export const SET_MENTEE_LOADING = '[Mentee] SET_MENTEE_LOADING';

export abstract class MenteeAction implements DataAction<Mentee> {
  readonly type: string;
  constructor(public readonly payload: Mentee) { }
}

export abstract class MenteeErrorAction implements DataErrorAction<Mentee> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<Mentee>) { }
}
export class GetMentee implements Action {
  readonly type = GET_MENTEE;
  constructor(public readonly payload: number) { }
}

export class GetMenteeSuccess implements Action {
  readonly type = GET_MENTEE_SUCCESS;
  constructor(public readonly payload: Mentee) { }
}

export class GetMenteeError extends MenteeErrorAction {
  readonly type = GET_MENTEE_ERROR;
}


export class GetMentees implements Action {
  readonly type = GET_MENTEES;
}

export class GetMenteesSuccess implements Action {
  readonly type = GET_MENTEES_SUCCESS;
  constructor(public readonly payload: Mentee[]) { }
}

export class GetMenteesError implements Action {
  readonly type = GET_MENTEES_ERROR;
  constructor(public readonly payload: any) { }
}


export class SetMenteeLoading {
  readonly type = SET_MENTEE_LOADING;
  constructor(public payload = true) { }
}

export type AllMenteeActions =
  | GetMentee
  | GetMenteeSuccess
  | GetMenteeError
  | GetMentees
  | GetMenteesSuccess
  | GetMenteesError
  | SetMenteeLoading;
