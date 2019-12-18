import { Action } from '@ngrx/store';
import { DataServiceError } from '../services';
import { DataAction, DataErrorAction } from './data.actions';
import { MSubscription } from '../../core/model/m-subscriptions';
import { MentorMatch } from '../../core/model/mentor-match';


export const GET_MSUBSCRIPTIONS = '[M Subcriptions] GET_MSUBSCRIPTIONS';
export const GET_MSUBSCRIPTIONS_SUCCESS = '[M Subcriptions] GET_MSUBSCRIPTIONS_SUCCESS';
export const GET_MSUBSCRIPTIONS_ERROR = '[M Subcriptions] GET_MSUBSCRIPTIONS_ERROR';

export const GET_MENTORS_MATCH = '[Mentor Match] GET_MENTOR_MATCH';
export const GET_MENTORS_MATCH_SUCCESS = '[Mentor Match] GET_MMENTOR_MATCH_SUCCESS';
export const GET_MENTORS_MATCH_ERROR = '[Mentor Match] GET_MENTOR_MATCH_ERROR';


export const SET_MSUBSCRIPTION_LOADING = '[M Subcription] SET_MSUBSCRIPTIONS_LOADING';

export abstract class MSubscriptionAction implements DataAction<MSubscription> {
  readonly type: string;
  constructor(public readonly payload: MSubscription) {}
}
export abstract class MentorMatchAction implements DataAction<MentorMatch> {
  readonly type: string;
  constructor(public readonly payload: MentorMatch) {}
}

export abstract class MSubscriptionErrorAction implements DataErrorAction<MSubscription> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<MSubscription>) {}
}
export abstract class MentorMatchErrorAction implements DataErrorAction<MentorMatch> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<MentorMatch>) {}
}

export class GetMSubscriptions implements Action {
  readonly type = GET_MSUBSCRIPTIONS;
}
export class GetMentorsMatch implements Action {
  readonly type = GET_MENTORS_MATCH;
  constructor(public readonly payload: number) {}
}

export class GetMSubscriptionsSuccess implements Action {
  readonly type = GET_MSUBSCRIPTIONS_SUCCESS;
  constructor(public readonly payload: MSubscription[]) {}
}
export class GetMentorsMatchSuccess implements Action {
  readonly type = GET_MENTORS_MATCH_SUCCESS;
  constructor(public readonly payload: MentorMatch[]) {}
}

export class GetMSubscriptionsError implements Action {
  readonly type = GET_MSUBSCRIPTIONS_ERROR;
  constructor(public readonly payload: any) {}
}


export class GetMentorsMatchError implements Action {
  readonly type = GET_MENTORS_MATCH_ERROR;
  constructor(public readonly payload: any) {}
}




export class SetMSubscriptionLoading {
  readonly type = SET_MSUBSCRIPTION_LOADING;
  constructor(public payload = true) {}
}

export type AllMSubscriptionActions =
  | GetMSubscriptions
  | GetMSubscriptionsSuccess
  | GetMSubscriptionsError
  | SetMSubscriptionLoading
  | GetMentorsMatch
  | GetMentorsMatchSuccess
  | GetMentorsMatchError;
