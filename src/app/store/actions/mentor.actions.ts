import { Action } from '@ngrx/store';

import { Mentor } from '../../core/model/mentor';
import { DataServiceError } from '../services';
import { DataAction, DataErrorAction } from './data.actions';
import { MSubscription } from '../../core/model/m-subscriptions';

export const ADD_MENTOR = '[Mentor] ADD_MENTOR';
export const ADD_MENTOR_ERROR = '[Mentor] ADD_MENTOR_ERROR';
export const ADD_MENTOR_SUCCESS = '[Mentor] ADD_MENTOR_SUCCESS';

export const GET_MENTOR = '[Mentor] GET_MENTOR';
export const GET_MENTOR_SUCCESS = '[Mentor] GET_MENTOR_SUCCESS';
export const GET_MENTOR_ERROR = '[Mentor] GET_MENTOR_ERROR';

export const UPDATE_MENTOR = '[Mentor] UPDATE_MENTOR';
export const UPDATE_MENTOR_SUCCESS = '[Mentor] UPDATE_MENTOR_SUCCESS';
export const UPDATE_MENTOR_ERROR = '[Mentor] UPDATE_MENTOR_ERROR';

export const GET_MENTORS = '[Mentor Subcriptions] GET_MENTORS';
export const GET_MENTORS_SUCCESS = '[Mentor Subcriptions] GET_MENTORS_SUCCESS';
export const GET_MENTORS_ERROR = '[Mentor Subcriptions] GET_MENTORS_ERROR';

export const DELETE_MENTOR = '[Mentor] DELETE_MENTOR';
export const DELETE_MENTOR_SUCCESS = '[Mentor] DELETE_MENTOR_SUCCESS';
export const DELETE_MENTOR_ERROR = '[Mentor] DELETE_MENTOR_ERROR';

export const REGISTERED = '[Mentor registered] REGISTERED';

export const SET_MENTOR_LOADING = '[Mentor] SET_MENTOR_LOADING';

export abstract class MentorAction implements DataAction<Mentor> {
  readonly type: string;
  constructor(public readonly payload: Mentor) {}
}

export abstract class MentorErrorAction implements DataErrorAction<Mentor> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<Mentor>) {}
}

export class GetMentors implements Action {
  readonly type = GET_MENTORS;
}

export class GetMentorsSuccess implements Action {
  readonly type = GET_MENTORS_SUCCESS;
  constructor(public readonly payload: MSubscription[]) {}
}

export class GetMentorsError implements Action {
  readonly type = GET_MENTORS_ERROR;
  constructor(public readonly payload: any) {}
}

export class GetMentor implements Action {
  readonly type = GET_MENTOR;
  constructor(public readonly payload: number) {}
}

export class GetMentorSuccess implements Action {
  readonly type = GET_MENTOR_SUCCESS;
  constructor(public readonly payload: Mentor) {}
}

export class GetMentorError extends MentorErrorAction {
  readonly type = GET_MENTOR_ERROR;
}

export class AddMentor extends MentorAction {
  readonly type = ADD_MENTOR;
}

export class AddMentorSuccess extends MentorAction {
  readonly type = ADD_MENTOR_SUCCESS;
}

export class AddMentorError extends MentorErrorAction {
  readonly type = ADD_MENTOR_ERROR;
}

export class UpdateMentor extends MentorAction {
  readonly type = UPDATE_MENTOR;
}

export class UpdateMentorSuccess extends MentorAction {
  readonly type = UPDATE_MENTOR_SUCCESS;
}

export class UpdateMentorError extends MentorErrorAction {
  readonly type = UPDATE_MENTOR_ERROR;
}

export class DeleteMentor extends MentorAction {
  readonly type = DELETE_MENTOR;
}

export class DeleteMentorSuccess extends MentorAction {
  readonly type = DELETE_MENTOR_SUCCESS;
}

export class DeleteMentorError extends MentorErrorAction {
  readonly type = DELETE_MENTOR_ERROR;
}

export class SetRegistered implements Action {
  readonly type = REGISTERED;
}
export class SetMentorLoading {
  readonly type = SET_MENTOR_LOADING;
  constructor(public payload = true) {}
}

export type AllMentorActions =
  | GetMentor
  | GetMentorSuccess
  | GetMentorError
  | UpdateMentor
  | UpdateMentorSuccess
  | UpdateMentorError
  | GetMentors
  | GetMentorsSuccess
  | GetMentorsError
  | AddMentor
  | AddMentorSuccess
  | AddMentorError
  | DeleteMentor
  | DeleteMentorSuccess
  | DeleteMentorError
  | SetMentorLoading
  | SetRegistered;
