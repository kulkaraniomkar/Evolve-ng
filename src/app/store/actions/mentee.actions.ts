import { Action } from '@ngrx/store';

import { Mentee } from '../../core/model/mentee';
import { DataServiceError } from '../services';
import { DataAction, DataErrorAction } from './data.actions';

export const ADD_MENTEE = '[Mentee] ADD_MENTEE';
export const ADD_MENTEE_ERROR = '[Mentee] ADD_MENTEE_ERROR';
export const ADD_MENTEE_SUCCESS = '[Mentee] ADD_MENTEE_SUCCESS';

export const GET_MENTEE = '[Mentee] GET_MENTEE';
export const GET_MENTEE_SUCCESS = '[Mentee] GET_MENTEE_SUCCESS';
export const GET_MENTEE_ERROR = '[Mentee] GET_MENTEE_ERROR';

export const UPDATE_MENTEE = '[Mentee] UPDATE_MENTEE';
export const UPDATE_MENTEE_SUCCESS = '[Mentee] UPDATE_MENTEE_SUCCESS';
export const UPDATE_MENTEE_ERROR = '[Mentee] UPDATE_MENTEE_ERROR';

export const GET_MENTEES = '[Mentee] GET_MENTEEES';
export const GET_MENTEES_SUCCESS = '[Mentee] GET_MENTEEES_SUCCESS';
export const GET_MENTEES_ERROR = '[Mentee] GET_MENTEEES_ERROR';

export const DELETE_MENTEE = '[Mentee] DELETE_MENTEE';
export const DELETE_MENTEE_SUCCESS = '[Mentee] DELETE_MENTEE_SUCCESS';
export const DELETE_MENTEE_ERROR = '[Mentee] DELETE_MENTEE_ERROR';

export const SET_MENTEE_LOADING = '[Mentee] SET_MENTEE_LOADING';

export abstract class MenteeAction implements DataAction<Mentee> {
  readonly type: string;
  constructor(public readonly payload: Mentee) {}
}

export abstract class MenteeErrorAction implements DataErrorAction<Mentee> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<Mentee>) {}
}

export class GetMentees implements Action {
  readonly type = GET_MENTEES;
}

export class GetMenteesSuccess implements Action {
  readonly type = GET_MENTEES_SUCCESS;
  constructor(public readonly payload: Mentee[]) {}
}

export class GetMenteesError implements Action {
  readonly type = GET_MENTEES_ERROR;
  constructor(public readonly payload: any) {}
}

export class GetMentee implements Action {
  readonly type = GET_MENTEE;
  constructor(public readonly payload: number) {}
}

export class GetMenteeSuccess implements Action {
  readonly type = GET_MENTEE_SUCCESS;
  constructor(public readonly payload: Mentee) {}
}

export class GetMenteeError extends MenteeErrorAction {
  readonly type = GET_MENTEE_ERROR;
}

export class AddMentee extends MenteeAction {
  readonly type = ADD_MENTEE;
}

export class AddMenteeSuccess extends MenteeAction {
  readonly type = ADD_MENTEE_SUCCESS;
}

export class AddMenteeError extends MenteeErrorAction {
  readonly type = ADD_MENTEE_ERROR;
}

export class UpdateMentee extends MenteeAction {
  readonly type = UPDATE_MENTEE;
}

export class UpdateMenteeSuccess extends MenteeAction {
  readonly type = UPDATE_MENTEE_SUCCESS;
}

export class UpdateMenteeError extends MenteeErrorAction {
  readonly type = UPDATE_MENTEE_ERROR;
}

export class DeleteMentee extends MenteeAction {
  readonly type = DELETE_MENTEE;
}

export class DeleteMenteeSuccess extends MenteeAction {
  readonly type = DELETE_MENTEE_SUCCESS;
}

export class DeleteMenteeError extends MenteeErrorAction {
  readonly type = DELETE_MENTEE_ERROR;
}

export class SetMenteeLoading {
  readonly type = SET_MENTEE_LOADING;
  constructor(public payload = true) {}
}

export type AllMenteeActions =
  | GetMentee
  | GetMenteeSuccess
  | GetMenteeError
  | UpdateMentee
  | UpdateMenteeSuccess
  | UpdateMenteeError
  | GetMentees
  | GetMenteesSuccess
  | GetMenteesError
  | AddMentee
  | AddMenteeSuccess
  | AddMenteeError
  | DeleteMentee
  | DeleteMenteeSuccess
  | DeleteMenteeError
  | SetMenteeLoading;
