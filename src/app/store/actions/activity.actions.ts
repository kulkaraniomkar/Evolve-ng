import { Action } from '@ngrx/store';
import { IActivity } from 'src/app/models/activity.interface';

export enum EActivityActions {
  GET_ACTIVITY = '[Activity] GET_ACTIVITY',
  GET_ACTIVITY_ERROR = '[Activity] GET_ACTIVITY_ERROR',
  GET_ACTIVITY_SUCCESS = '[Activity] GET_ACTIVITY_SUCCESS',

  SET_LOADING = '[Activity] SET_LOADING'
}
/** activity */
export class GetActivity implements Action {
  public readonly type = EActivityActions.GET_ACTIVITY;
  constructor(public readonly payload: {mentorId: number, menteeId: number, matchTypeId: number, activityId: number}) {}
}

export class GetActivityError implements Action {
  public readonly type = EActivityActions.GET_ACTIVITY_ERROR;
  constructor(public readonly payload: any) {}
}
export class GetActivitySuccess implements Action {
  public readonly type = EActivityActions.GET_ACTIVITY_SUCCESS;
  constructor(public payload: {activity: IActivity, matchType: number}) {}
}


export type ActivityActions = GetActivity | GetActivityError |  GetActivitySuccess;
