import { Action } from '@ngrx/store';
import { DataServiceError } from '../services';
import { DataAction, DataErrorAction } from './data.actions';
import { MSubscription } from '../../core/model/m-subscriptions';
import { MentorMatch, SavedMatch, MentorMatchInfo } from '../../core/model/mentor-match';


export const GET_MSUBSCRIPTIONS = '[M Subcriptions] GET_MSUBSCRIPTIONS';
export const GET_MSUBSCRIPTIONS_SUCCESS = '[M Subcriptions] GET_MSUBSCRIPTIONS_SUCCESS';
export const GET_MSUBSCRIPTIONS_ERROR = '[M Subcriptions] GET_MSUBSCRIPTIONS_ERROR';

export const GET_MENTORS_MATCH = '[Mentor Match] GET_MENTOR_MATCH';
export const GET_MENTORS_MATCH_SUCCESS = '[Mentor Match] GET_MMENTOR_MATCH_SUCCESS';
export const GET_MENTORS_MATCH_ERROR = '[Mentor Match] GET_MENTOR_MATCH_ERROR';

export const SAVE_MENTORS_MATCH = '[Save Mentor Match] SAVE_MENTOR_MATCH';
export const SAVE_MENTORS_MATCH_SUCCESS = '[Save Mentor Match] SAVE_MMENTOR_MATCH_SUCCESS';
export const SAVE_MENTORS_MATCH_ERROR = '[Save Mentor Match] SAVE_MENTOR_MATCH_ERROR';

export const REMOVE_MENTORS_MATCH = '[Remove Mentors Match] REMOVE_MENTORS_MATCH';
export const REMOVE_MENTORS_MATCH_SUCCESS = '[Remove Mentors Match] REMOVE_MENTORS_MATCH_SUCCESS';
export const REMOVE_MENTORS_MATCH_ERROR = '[Remove Mentors Match] REMOVE_MENTORS_MATCH_ERROR';

export const GET_MENTOR_INFO = '[Mentor Info] GET_MENTOR_INFO';
export const GET_MENTOR_INFO_SUCCESS = '[Mentor Info] GET_MENTOR_INFO_SUCCESS';
export const GET_MENTOR_INFO_ERROR = '[Mentor Info] GET_MENTOR_INFO_ERROR';

export const SET_MSUBSCRIPTION_LOADING = '[M Subcription] SET_MSUBSCRIPTIONS_LOADING';

export abstract class MSubscriptionAction implements DataAction<MSubscription> {
  readonly type: string;
  constructor(public readonly payload: MSubscription) {}
}
export abstract class MentorMatchAction implements DataAction<MentorMatch> {
  readonly type: string;
  constructor(public readonly payload: MentorMatch) {}
}
export abstract class SavedMentorMatchAction implements DataAction<SavedMatch> {
  readonly type: string;
  constructor(public readonly payload: SavedMatch) {}
  
}
export abstract class MentorInfoAction implements DataAction<MentorMatchInfo> {
  readonly type: string;
  constructor(public readonly payload: MentorMatchInfo) {}
  
}
export abstract class SavedMentorMatchErrorAction implements DataErrorAction<SavedMatch> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<SavedMatch>) {}
}

export abstract class MSubscriptionErrorAction implements DataErrorAction<MSubscription> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<MSubscription>) {}
}
export abstract class MentorMatchErrorAction implements DataErrorAction<MentorMatch> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<MentorMatch>) {}
}

export abstract class MentorInfoErrorAction implements DataErrorAction<MentorMatchInfo> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<MentorMatchInfo>) {}
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
export class AddSavedMatch extends SavedMentorMatchAction {
  readonly type = SAVE_MENTORS_MATCH;
}

export class AddSavedMatchSuccess extends SavedMentorMatchAction {
  readonly type = SAVE_MENTORS_MATCH_SUCCESS;
}

export class AddSavedMatchError extends SavedMentorMatchErrorAction {
  readonly type = SAVE_MENTORS_MATCH_ERROR;
}

export class RemoveSavedMatch extends SavedMentorMatchAction {
  readonly type = REMOVE_MENTORS_MATCH;
}

export class RemoveSavedMatchSuccess extends SavedMentorMatchAction {
  readonly type = REMOVE_MENTORS_MATCH_SUCCESS;
}

export class RemoveSavedMatchError extends SavedMentorMatchErrorAction {
  readonly type = REMOVE_MENTORS_MATCH_ERROR;
}

export class GetMentorInfo implements Action {
  readonly type = GET_MENTOR_INFO;
  constructor(public readonly payload: number) {}
}

export class GetMentorInfoSuccess implements Action {
  readonly type = GET_MENTOR_INFO_SUCCESS;
 constructor(public readonly payload: MentorMatchInfo) {}
}

export class GetMentorInfoError extends MentorInfoErrorAction {
  readonly type = GET_MENTOR_INFO_ERROR;
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
  | GetMentorsMatchError
  | AddSavedMatch 
  | AddSavedMatchSuccess 
  | AddSavedMatchError
  | RemoveSavedMatch 
  | RemoveSavedMatchSuccess 
  | RemoveSavedMatchError
  | GetMentorInfo
  | GetMentorInfoSuccess
  | GetMentorInfoError;
