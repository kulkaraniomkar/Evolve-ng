import { Action } from '@ngrx/store';
import { IUser } from 'src/app/models/user.interface';

export enum EUserActions {
  GET_USER = '[User] GET_USER',
  GET_USER_ERROR = '[User] GET_USER_ERROR',
  GET_USER_SUCCESS = '[User] GET_USER_SUCCESS',

  SET_LOADING = '[User] SET_LOADING'
}
/** User */
export class GetUser implements Action {
  public readonly type = EUserActions.GET_USER;
  // constructor(public readonly payload: { mentorId: number, menteeId: number, matchTypeId: number, UserId: number }) { }
}

export class GetUserError implements Action {
  public readonly type = EUserActions.GET_USER_ERROR;
  constructor(public readonly payload: any) { }
}
export class GetUserSuccess implements Action {
  public readonly type = EUserActions.GET_USER_SUCCESS;
  constructor(public payload: { user: IUser }) { }
}


export type UserActions = GetUser | GetUserError | GetUserSuccess;
