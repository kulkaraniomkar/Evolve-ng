import { Action } from '@ngrx/store';

import { IMentee } from 'src/app/models/mentee.interface';
import { ISubscription } from 'src/app/models/subscription.interface';
import { IPage } from 'src/app/models/page.interface';

export enum EMenteeActions {
  GET_MENTEE = '[Mentee] GET_MENTEE',
  GET_MENTEE_ERROR = '[Mentee] GET_MENTEE_ERROR',
  GET_MENTEE_SUCCESS = '[Mentee] GET_MENTEE_SUCCESS',

  ADD_MENTEE = '[Mentee] ADD_MENTEE',
  ADD_MENTEE_ERROR = '[Mentee] ADD_MENTEE_ERROR',
  ADD_MENTEE_SUCCESS = '[Mentee] ADD_MENTEE_SUCCESS',

  UPDATE_MENTEE = '[Mentee] UPDATE_MENTEE',
  UPDATE_MENTEE_ERROR = '[Mentee] UPDATE_MENTEE_ERROR',
  UPDATE_MENTEE_SUCCESS = '[Mentee] UPDATE_MENTEE_SUCCESS',

  GET_MENTEE_SUBSCRIPTION = '[Mentee Subs] GET_MENTEE_SUBSCRIPTION',
  GET_MENTEE_SUBSCRIPTION_ERROR = '[Mentee Subs] GET_MENTEE_SUBSCRIPTION_ERROR',
  GET_MENTEE_SUBSCRIPTION_SUCCESS = '[Mentee Subs] GET_MENTEE_SUBSCRIPTION_SUCCESS',
}
/** mentee bby id */
export class GetMenteeById implements Action {
  public readonly type = EMenteeActions.GET_MENTEE;
  constructor(public readonly payload: number) { }
}

export class GetMenteeByIdError implements Action {
  public readonly type = EMenteeActions.GET_MENTEE_ERROR;
  constructor(public readonly payload: any) { }
}
export class GetMenteeByIdSuccess implements Action {
  public readonly type = EMenteeActions.GET_MENTEE_SUCCESS;
  constructor(public payload: { mentee: IMentee }) { }
}

export class AddMentee implements Action {
  public readonly type = EMenteeActions.ADD_MENTEE;
  constructor(public readonly payload: IMentee) { }
}

export class AddMenteeSuccess implements Action {
  public readonly type = EMenteeActions.ADD_MENTEE_SUCCESS
  constructor(public readonly payload: { mentee: IMentee }) { }
}

export class AddMenteeError implements Action {
  public readonly type = EMenteeActions.ADD_MENTEE_ERROR
  constructor(public readonly payload: any) { }
}
/** update mentee */

export class UpdateMentee implements Action {
  public readonly type = EMenteeActions.UPDATE_MENTEE;
  constructor(public readonly payload: IMentee) { }
}

export class UpdateMenteeSuccess implements Action {
  public readonly type = EMenteeActions.UPDATE_MENTEE_SUCCESS;
  constructor(public readonly payload: { mentee: IMentee }) { }
}

export class UpdateMenteeError implements Action {
  public readonly type = EMenteeActions.UPDATE_MENTEE_ERROR;
  constructor(public readonly payload: any) { }
}
/** mentee subs */
export class GetMenteeSubscription implements Action {
  public readonly type = EMenteeActions.GET_MENTEE_SUBSCRIPTION;
  constructor(public readonly payload: IPage) { }
}

export class GetMenteeSubscriptionError implements Action {
  public readonly type = EMenteeActions.GET_MENTEE_SUBSCRIPTION_ERROR;
  constructor(public readonly payload: any) { }
}
export class GetMenteeSubscriptionSuccess implements Action {
  public readonly type = EMenteeActions.GET_MENTEE_SUBSCRIPTION_SUCCESS;
  constructor(public payload: { menteeSubscription: ISubscription[], signupStatus: boolean, page: IPage }) { }
}

export type MenteeActions = GetMenteeById | GetMenteeByIdError | GetMenteeByIdSuccess |
AddMentee | AddMenteeError | AddMenteeSuccess |
GetMenteeSubscription | GetMenteeSubscriptionError | GetMenteeSubscriptionSuccess |
UpdateMentee | UpdateMenteeError | UpdateMenteeSuccess;
