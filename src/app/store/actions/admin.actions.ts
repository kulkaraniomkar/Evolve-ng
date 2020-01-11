import { Action } from '@ngrx/store';
import { DataServiceError } from '../services';
import { DataAction, DataErrorAction } from './data.actions';
import { MSubscription } from '../../core/model/m-subscriptions';
import { MentorMatch, SavedMatch, MentorMatchInfo } from '../../core/model/mentor-match';
import { MentorMentee, MentorMenteeIds, MatchCreate, ManualMatch, Comments } from '../../core/model/mentor-mentee';


export const GET_MSUBSCRIPTIONS = '[M Subcriptions] GET_MSUBSCRIPTIONS';
export const GET_MSUBSCRIPTIONS_SUCCESS = '[M Subcriptions] GET_MSUBSCRIPTIONS_SUCCESS';
export const GET_MSUBSCRIPTIONS_ERROR = '[M Subcriptions] GET_MSUBSCRIPTIONS_ERROR';

export const NAVIGATE_TO_SEARCH = '[Navigate to mentee search] NAVIGATE_TO_SEARCH';
export const GET_SEARCH_MSUBSCRIPTIONS = '[Mentee search] GET_SEARCH_MSUBSCRIPTIONS';
export const GET_SEARCH_MSUBSCRIPTIONS_SUCCESS = '[Mentee search] GET_SEARCH_MSUBSCRIPTIONS_SUCCESS';
export const GET_SEARCH_MSUBSCRIPTIONS_ERROR = '[Mentee search] GET_SEARCH_MSUBSCRIPTIONS_ERROR';

export const GET_MENTORS_MATCH = '[Mentor Match] GET_MENTOR_MATCH';
export const GET_MENTORS_MATCH_SUCCESS = '[Mentor Match] GET_MENTOR_MATCH_SUCCESS';
export const GET_MENTORS_MATCH_ERROR = '[Mentor Match] GET_MENTOR_MATCH_ERROR';

export const EXTRACT_SAVED_MENTORS_MATCH = '[Extract Saved Mentor Match] EXTRACT_SAVED_MENTOR_MATCH';
export const EXTRACT_SAVED_MENTORS_MATCH_SUCCESS = '[Extract Saved Mentor Match] EXTRACT_SAVED_MENTORS_MATCH_SUCCESS';
export const EXTRACT_SAVED_MENTORS_MATCH_ERROR = '[Extract Saved Mentor Match] EXTRACT_SAVED_MENTORS_MATCH_ERROR';

export const SAVE_MENTORS_MATCH = '[Save Mentor Match] SAVE_MENTOR_MATCH';
export const SAVE_MENTORS_MATCH_SUCCESS = '[Save Mentor Match] SAVE_MMENTOR_MATCH_SUCCESS';
export const SAVE_MENTORS_MATCH_ERROR = '[Save Mentor Match] SAVE_MENTOR_MATCH_ERROR';

export const REMOVE_MENTORS_MATCH = '[Remove Mentors Match] REMOVE_MENTORS_MATCH';
export const REMOVE_MENTORS_MATCH_SUCCESS = '[Remove Mentors Match] REMOVE_MENTORS_MATCH_SUCCESS';
export const REMOVE_MENTORS_MATCH_ERROR = '[Remove Mentors Match] REMOVE_MENTORS_MATCH_ERROR';

export const GET_MENTOR_INFO = '[Mentor Info] GET_MENTOR_INFO';
export const GET_MENTOR_INFO_SUCCESS = '[Mentor Info] GET_MENTOR_INFO_SUCCESS';
export const GET_MENTOR_INFO_ERROR = '[Mentor Info] GET_MENTOR_INFO_ERROR';

export const GET_MENTOR_MENTEE = '[Mentor Mentee] GET_MENTOR_MENTEE';
export const GET_MENTOR_MENTEE_SUCCESS = '[Mentor Mentee] GET_MENTOR_MENTEE_SUCCESS';
export const GET_MENTOR_MENTEE_ERROR = '[Mentor Mentee] GET_MENTOR_MENTEE_ERROR';

export const GET_MANUAL_MENTORS = '[Manual mentors] GET_MANUAL_MENTORS';
export const GET_MANUAL_MENTORS_SUCCESS = '[Manual mentors] GET_MANUAL_MENTORS_SUCCESS';
export const GET_MANUAL_MENTORS_ERROR = '[Manual mentors] GET_MANUAL_MENTORS_ERROR';

export const CREATE_MATCH = '[Create Match] CREATE_MATCH';
export const CREATE_MATCH_SUCCESS = '[Create Match] CREATE_MATCH_SUCCESS';
export const CREATE_MATCH_ERROR = '[Create Match] CREATE_MATCH_ERROR';

export const UPDATE_MATCH = '[Update Match] UPDATE_MATCH';
export const UPDATE_MATCH_SUCCESS = '[Update Match] UPDATE_MATCH_SUCCESS';
export const UPDATE_MATCH_ERROR = '[Update Match] UPDATE_MATCH_ERROR';

export const REMOVE_COMMENT = '[Remove comment] REMOVE_COMMENT';
export const REMOVE_COMMENT_SUCCESS = '[Remove comment] REMOVE_COMMENT_SUCCESS';
export const REMOVE_COMMENT_ERROR = '[Remove comment] REMOVE_COMMENT_ERROR';



export const SET_MSUBSCRIPTION_LOADING = '[M Subcription] SET_MSUBSCRIPTIONS_LOADING';

export abstract class CreateMatchAction implements DataAction<MatchCreate> {
  readonly type: string;
  constructor(public readonly payload: MatchCreate) {}
}
// export abstract class ManualMatchAction implements DataAction<number> {
//   readonly type: string;
//   constructor(public readonly payload: number) {}
// }
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
export abstract class MentorMenteeAction implements DataAction<MentorMentee> {
  readonly type: string;
  constructor(public readonly payload: MentorMentee) {}
  
}
export abstract class MentorMenteeErrorAction implements DataErrorAction<MentorMentee> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<MentorMentee>) {}
}
export abstract class ManualMatchErrorAction implements DataErrorAction<ManualMatch> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<ManualMatch>) {}
}
export abstract class SavedMentorMatchErrorAction implements DataErrorAction<SavedMatch> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<SavedMatch>) {}
}
export abstract class CreateMatchErrorAction implements DataErrorAction<MatchCreate> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<MatchCreate>) {}
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
export class NavigateToSearch implements Action {
  readonly type = NAVIGATE_TO_SEARCH;
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

export class GetManualMatchError implements Action {
  readonly type = GET_MANUAL_MENTORS_ERROR;
  constructor(public readonly payload: any) {}
}

export class GetManualMatch implements Action {
  readonly type = GET_MANUAL_MENTORS;
  constructor(public readonly payload: number) {}
}
export class GetSearchMentee implements Action {
  readonly type = GET_SEARCH_MSUBSCRIPTIONS;
  constructor(public readonly payload: string) {}
}
export class GetSearchMenteeError implements Action {
  readonly type = GET_SEARCH_MSUBSCRIPTIONS_ERROR;
  constructor(public readonly payload: any) {}
}

export class GetSearchMenteeSuccess implements Action {
  readonly type = GET_SEARCH_MSUBSCRIPTIONS_SUCCESS;
  constructor(public readonly payload: MSubscription[]) {}
}


export class GetManualMatchSuccess implements Action {
  readonly type = GET_MANUAL_MENTORS_SUCCESS;
  constructor(public readonly payload: ManualMatch[]) {}
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
/** Extract saved mentor match */
export class ExtractSavedMentorMatch implements Action {
  readonly type = EXTRACT_SAVED_MENTORS_MATCH;
  constructor(public readonly payload: number) {}
}

export class ExtractSavedMentorMatchSuccess implements Action {
  readonly type = EXTRACT_SAVED_MENTORS_MATCH_SUCCESS;
 constructor(public readonly payload: MentorMatch[]) {}
}

export class ExtractSavedMentorMatchError implements Action {
  readonly type = EXTRACT_SAVED_MENTORS_MATCH_ERROR;
  constructor(public readonly payload: any) {}
}
/** End */

/** remove comment match */
export class RemoveComment implements Action {
  readonly type = REMOVE_COMMENT;
  constructor(public readonly payload: Comments) {}
}

export class RemoveCommentSuccess implements Action {
  readonly type = REMOVE_COMMENT_SUCCESS;
 constructor(public readonly payload: Comments) {}
}

export class  RemoveCommentError implements Action {
  readonly type = REMOVE_COMMENT_ERROR;
  constructor(public readonly payload: any) {}
}
/** End */
export class GetMentorMentee implements Action {
  readonly type = GET_MENTOR_MENTEE;
  constructor(public readonly payload: MentorMenteeIds) {}
}

export class GetMentorMenteeSuccess implements Action {
  readonly type = GET_MENTOR_MENTEE_SUCCESS;
 constructor(public readonly payload: MentorMentee) {}
}

export class GetMentorMenteeError extends MentorMenteeErrorAction {
  readonly type = GET_MENTOR_MENTEE_ERROR;
}


export class CreateMatch extends CreateMatchAction {
  readonly type = CREATE_MATCH;
}

export class CreateMatchSuccess extends CreateMatchAction {
  readonly type = CREATE_MATCH_SUCCESS;
}

export class UpdateMatchError extends CreateMatchErrorAction {
  readonly type = UPDATE_MATCH_ERROR;
}
export class UpdateMatch extends CreateMatchAction {
  readonly type = UPDATE_MATCH;
}

export class UpdateMatchSuccess extends CreateMatchAction {
  readonly type = UPDATE_MATCH_SUCCESS;
}

export class CreateMatchError extends CreateMatchErrorAction {
  readonly type = CREATE_MATCH_ERROR;
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
  | GetMentorInfoError
  | GetMentorMentee
  | GetMentorMenteeSuccess
  | GetMentorMenteeError
  | GetManualMatch
  | GetManualMatchSuccess
  | GetManualMatchError
  | GetSearchMentee
  | GetSearchMenteeSuccess
  | GetSearchMenteeError
  | NavigateToSearch
  | UpdateMatch
  | UpdateMatchSuccess
  | UpdateMatchError
  | ExtractSavedMentorMatch
  | ExtractSavedMentorMatchSuccess
  | ExtractSavedMentorMatchError
  | RemoveComment
  | RemoveCommentSuccess
  | RemoveCommentError;
