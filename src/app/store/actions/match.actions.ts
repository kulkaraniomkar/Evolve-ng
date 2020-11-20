import { Action } from '@ngrx/store';
import { IMatch, IMatchesCreate, IManualMatchesPayload, IManualSearchPayload } from 'src/app/models/match.interface';
import { IManualMatch } from 'src/app/models/manual-match.interface';
import { IPage } from 'src/app/models/page.interface';
import { IMatchRegister } from 'src/app/models/match-register.interface';
import { IComment } from 'src/app/models/comment.interface';

export enum EMatchActions {
  GET_AUTO_MATCHES = '[Matches] GET_AUTO_MATCHES',
  GET_AUTO_MATCHES_ERROR = '[Matches] GET_AUTO_MATCHES_ERROR',
  GET_AUTO_MATCHES_SUCCESS = '[Matches] GET_AUTO_MATCHES_SUCCESS',

  GET_MANUAL_MATCHES = '[Matches] GET_MANUAL_MATCHES',
  GET_MANUAL_MATCHES_ERROR = '[Matches] GET_MANUAL_MATCHES_ERROR',
  GET_MANUAL_MATCHES_SUCCESS = '[Matches] GET_MANUAL_MATCHES_SUCCESS',

  SEARCH_MANUAL_MATCHES = '[Matches] SEARCH_MANUAL_MATCHES',
  SEARCH_MANUAL_MATCHES_ERROR = '[Matches] SEARCH_MANUAL_MATCHES_ERROR',
  SEARCH_MANUAL_MATCHES_SUCCESS = '[Matches] SEARCH_MANUAL_MATCHES_SUCCESS',

  GET_SAVED_MATCHES = '[Matches] GET_SAVED_MATCHES',
  GET_SAVED_MATCHES_ERROR = '[Matches] GET_SAVED_MATCHES_ERROR',
  GET_SAVED_MATCHES_SUCCESS = '[Matches] GET_SAVED_MATCHES_SUCCESS',

  DELETE_SAVED_MATCHES = '[Matches] DELETE_SAVED_MATCHES',
  DELETE_SAVED_MATCHES_ERROR = '[Matches] DELETE_SAVED_MATCHES_ERROR',
  DELETE_SAVED_MATCHES_SUCCESS = '[Matches] DELETE_SAVED_MATCHES_SUCCESS',

  SAVE_AUTO_MATCHES = '[Matches] SAVE_AUTO_MATCHES',
  SAVE_AUTO_MATCHES_ERROR = '[Matches] SAVE_AUTO_MATCHES_ERROR',
  SAVE_AUTO_MATCHES_SUCCESS = '[Matches] SAVE_AUTO_MATCHES_SUCCESS',

  SAVE_MATCH = '[Matches] SAVE_MATCH',
  SAVE_MATCH_ERROR = '[Matches] SAVE_MATCH_ERROR',
  SAVE_MATCH_SUCCESS = '[Matches] SAVE_MATCH_SUCCESS',

  UPDATE_MENTORSHIP_ACTIVITY = '[Activity] SAVE_MENTORSHIP_ACTIVITY',
  UPDATE_MENTORSHIP_ACTIVITY_ERROR = '[Activity] SAVE_MENTORSHIP_ACTIVITY_ERROR',
  UPDATE_MENTORSHIP_ACTIVITY_SUCCESS = '[Activity] SAVE_MENTORSHIP_ACTIVITY_SUCCESS',

  SAVE_MENTORSHIP_COMMENTS = '[Comments] SAVE_MENTORSHIP_COMMENTS',
  SAVE_MENTORSHIP_COMMENTS_ERROR = '[Comments] SAVE_MENTORSHIP_ACOMMENTS_ERROR',
  SAVE_MENTORSHIP_COMMENTS_SUCCESS = '[Comments] SAVE_MENTORSHIP_COMMENTS_SUCCESS',
}
/** Get Matches */
export class GetAutoMatches implements Action {
  public readonly type = EMatchActions.GET_AUTO_MATCHES;
  constructor(public readonly payload: number) { }
}

export class GetAutoMatchesError implements Action {
  public readonly type = EMatchActions.GET_AUTO_MATCHES_ERROR;
  constructor(public readonly payload: any) { }
}
export class GetAutoMatchesSuccess implements Action {
  public readonly type = EMatchActions.GET_AUTO_MATCHES_SUCCESS;
  constructor(public payload: { matches: IMatch[], error: string }) { }
}
/** Get saved matches */
export class GetSavedMatches implements Action {
  public readonly type = EMatchActions.GET_SAVED_MATCHES;
  constructor(public readonly payload: number) { }
}

export class GetSavedMatchesError implements Action {
  public readonly type = EMatchActions.GET_SAVED_MATCHES_ERROR;
  constructor(public readonly payload: any) { }
}
export class GetSavedMatchesSuccess implements Action {
  public readonly type = EMatchActions.GET_SAVED_MATCHES_SUCCESS;
  constructor(public payload: { matches: IMatch[], error: string }) { }
}
/** Delete saved matches */
export class DeleteSavedMatches implements Action {
  public readonly type = EMatchActions.DELETE_SAVED_MATCHES;
  constructor(public readonly payload: number) { }
}

export class DeleteSavedMatchesError implements Action {
  public readonly type = EMatchActions.DELETE_SAVED_MATCHES_ERROR;
  constructor(public readonly payload: any) { }
}
export class DeleteSavedMatchesSuccess implements Action {
  public readonly type = EMatchActions.DELETE_SAVED_MATCHES_SUCCESS;
  //constructor(public payload: { matches: IMatch[] }) { }
}


/** get manual matches */
export class GetManualMatches implements Action {
  public readonly type = EMatchActions.GET_MANUAL_MATCHES;
  constructor(public readonly payload: IManualMatchesPayload) { }
}

export class GetManualMatchesError implements Action {
  public readonly type = EMatchActions.GET_MANUAL_MATCHES_ERROR;
  constructor(public readonly payload: any) { }
}
export class GetManualMatchesSuccess implements Action {
  public readonly type = EMatchActions.GET_MANUAL_MATCHES_SUCCESS;
  constructor(public payload:  {manualMenteeMatches: IManualMatch[], page: IPage}) { }
}

/** search manual matches */
export class SearchManualMatches implements Action {
  public readonly type = EMatchActions.SEARCH_MANUAL_MATCHES;
  constructor(public readonly payload: IManualSearchPayload) { }
}

export class SearchManualMatchesError implements Action {
  public readonly type = EMatchActions.SEARCH_MANUAL_MATCHES_ERROR;
  constructor(public readonly payload: any) { }
}
export class SearchManualMatchesSuccess implements Action {
  public readonly type = EMatchActions.SEARCH_MANUAL_MATCHES_SUCCESS;
  constructor(public payload:  {manualMenteeMatches: IManualMatch[], page: IPage}) { }
}
/** Save Matches */
export class SaveAutoMatches implements Action {
  public readonly type = EMatchActions.SAVE_AUTO_MATCHES;
  constructor(public readonly payload: IMatchesCreate) { }
}

export class SaveAutoMatchesError implements Action {
  public readonly type = EMatchActions.SAVE_AUTO_MATCHES_ERROR;
  constructor(public readonly payload: any) { }
}
export class SaveAutoMatchesSuccess implements Action {
  public readonly type = EMatchActions.SAVE_AUTO_MATCHES_SUCCESS;
  constructor(public payload: any) { }
}

/** Save Match */
export class SaveMatch implements Action {
  public readonly type = EMatchActions.SAVE_MATCH;
  constructor(public readonly payload: IMatchRegister) { }
}

export class SaveMatchError implements Action {
  public readonly type = EMatchActions.SAVE_MATCH_ERROR;
  constructor(public readonly payload: any) { }
}
export class SaveMatchSuccess implements Action {
  public readonly type = EMatchActions.SAVE_MATCH_SUCCESS;
  constructor(public payload: IMatchRegister) { }
}
/** activity */
export class UpdateMentorshipActivity implements Action {
  public readonly type = EMatchActions.UPDATE_MENTORSHIP_ACTIVITY;
  constructor(public readonly payload: IMatchRegister) { }
}

export class UpdateMentorshipActivityError implements Action {
  public readonly type = EMatchActions.UPDATE_MENTORSHIP_ACTIVITY_ERROR;
  constructor(public readonly payload: any) { }
}
export class UpdateMentorshipActivitySuccess implements Action {
  public readonly type = EMatchActions.UPDATE_MENTORSHIP_ACTIVITY_SUCCESS;
  constructor(public payload: IMatchRegister) { }
}

/** comments */
export class UpdateMentorshipComments implements Action {
  public readonly type = EMatchActions.SAVE_MENTORSHIP_COMMENTS;
  constructor(public readonly payload: IComment) { }
}

export class UpdateMentorshipCommentsError implements Action {
  public readonly type = EMatchActions.SAVE_MENTORSHIP_COMMENTS_ERROR;
  constructor(public readonly payload: any) { }
}
export class UpdateMentorshipCommentsSuccess implements Action {
  public readonly type = EMatchActions.SAVE_MENTORSHIP_COMMENTS_SUCCESS;
  constructor(public payload: IMatchRegister) { }
}

export type MatchActions =
  GetAutoMatches |
  GetAutoMatchesError |
  GetAutoMatchesSuccess |
  SaveAutoMatches |
  SaveAutoMatchesError |
  SaveAutoMatchesSuccess |
  SaveMatch |
  SaveMatchError |
  SaveMatchSuccess |
  GetManualMatches |
  GetManualMatchesError |
  GetManualMatchesSuccess |
  GetSavedMatches |
  GetSavedMatchesError |
  GetSavedMatchesSuccess |
  DeleteSavedMatches |
  DeleteSavedMatchesError |
  DeleteSavedMatchesSuccess |
  UpdateMentorshipActivity |
  UpdateMentorshipActivityError |
  UpdateMentorshipActivitySuccess |
  UpdateMentorshipComments |
  UpdateMentorshipCommentsError |
  UpdateMentorshipCommentsSuccess |
  SearchManualMatches | SearchManualMatchesError | SearchManualMatchesSuccess;
