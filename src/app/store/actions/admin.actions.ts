import { Action } from '@ngrx/store';
import { DataServiceError } from '../services';
import { DataAction, DataErrorAction } from './data.actions';
import { MSubscription } from '../../core/model/m-subscriptions';


export const GET_MSUBSCRIPTIONS = '[M Subcriptions] GET_MSUBSCRIPTIONS';
export const GET_MSUBSCRIPTIONS_SUCCESS = '[M Subcriptions] GET_MSUBSCRIPTIONS_SUCCESS';
export const GET_MSUBSCRIPTIONS_ERROR = '[M Subcriptions] GET_MSUBSCRIPTIONS_ERROR';


export const SET_MSUBSCRIPTION_LOADING = '[M Subcription] SET_MSUBSCRIPTIONS_LOADING';

export abstract class MSubscriptionAction implements DataAction<MSubscription> {
  readonly type: string;
  constructor(public readonly payload: MSubscription) {}
}

export abstract class MSubscriptionErrorAction implements DataErrorAction<MSubscription> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<MSubscription>) {}
}

export class GetMSubscriptions implements Action {
  readonly type = GET_MSUBSCRIPTIONS;
}

export class GetMSubscriptionsSuccess implements Action {
  readonly type = GET_MSUBSCRIPTIONS_SUCCESS;
  constructor(public readonly payload: MSubscription[]) {}
}

export class GetMSubscriptionsError implements Action {
  readonly type = GET_MSUBSCRIPTIONS_ERROR;
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
  | SetMSubscriptionLoading;
