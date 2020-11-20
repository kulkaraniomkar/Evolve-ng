import { Action } from '@ngrx/store';

import { IMentor, IMentorInfo, IMentorEdit, IMentorExtra, ISuggestedMentor, ISuggestedMentorParams } from 'src/app/models/mentor.interface';
import { IPage } from 'src/app/models/page.interface';
import { ISubscription } from 'src/app/models/subscription.interface';

export enum EMentorActions {
  SUGGEST_MENTOR = '[Suggest mentor] SUGGEST_MENTOR',
  SUGGEST_MENTOR_ERROR = '[Suggest mentor] SUGGEST_MENTOR_ERROR',
  SUGGEST_MENTOR_SUCCESS = '[Suggest mentor] SUGGEST_MENTOR_SUCCESS',

  GET_MENTOR = '[Mentor] GET_MENTOR',
  GET_MENTOR_ERROR = '[Mentor] GET_MENTOR_ERROR',
  GET_MENTOR_SUCCESS = '[Mentor] GET_MENTOR_SUCCESS',

  GET_MENTOR_EXTRA_DETAILS = '[Mentor] GET_MENTOR_EXTRA_DETAILS',
  GET_MENTOR_EXTRA_DETAILS_ERROR = '[Mentor] GET_MENTOR_EXTRA_DETAILS_ERROR',
  GET_MENTOR_EXTRA_DETAILS_SUCCESS = '[Mentor] GET_MENTOR_EXTRA_DETAILS_SUCCESS',

  CREATE_MENTOR = '[Mentor] CREATE_MENTOR',
  CREATE_MENTOR_ERROR = '[Mentor] CREATE_MENTOR_ERROR',
  CREATE_MENTOR_SUCCESS = '[Mentor] CREATE_MENTOR_SUCCESS',

  UPDATE_MENTOR = '[Mentor] UPDATE_MENTOR',
  UPDATE_MENTOR_ERROR = '[Mentor] UPDATE_MENTOR_ERROR',
  UPDATE_MENTOR_SUCCESS = '[Mentor] UPDATE_MENTOR_SUCCESS',

  GET_MENTOR_SUBSCRIPTION = '[Mentor Subs] GET_MENTOR_SUBSCRIPTION',
  GET_MENTOR_SUBSCRIPTION_ERROR = '[Mentor Subs] GET_MENTOR_SUBSCRIPTION_ERROR',
  GET_MENTOR_SUBSCRIPTION_SUCCESS = '[Mentor Subs] GET_MENTOR_SUBSCRIPTION_SUCCESS',
}
/** suggest mentor */
export class SuggestMentorByStr implements Action {
  public readonly type = EMentorActions.SUGGEST_MENTOR;
  constructor(public readonly payload: ISuggestedMentorParams) { }
}

export class SuggestMentorByStrError implements Action {
  public readonly type = EMentorActions.SUGGEST_MENTOR_ERROR;
  constructor(public readonly payload: any) { }
}
export class SuggestMentorByStrSuccess implements Action {
  public readonly type = EMentorActions.SUGGEST_MENTOR_SUCCESS;
  constructor(public payload: { suggestedMentors: ISuggestedMentor[] }) { }
}
/** mentor */
export class GetMentorById implements Action {
  public readonly type = EMentorActions.GET_MENTOR;
  constructor(public readonly payload: number) { }
}

export class GetMentorByIdError implements Action {
  public readonly type = EMentorActions.GET_MENTOR_ERROR;
  constructor(public readonly payload: any) { }
}
export class GetMentorByIdSuccess implements Action {
  public readonly type = EMentorActions.GET_MENTOR_SUCCESS;
  constructor(public payload: { mentor: IMentor }) { }
}

/** mentor extra details*/
export class GetMentorDetailsById implements Action {
  public readonly type = EMentorActions.GET_MENTOR_EXTRA_DETAILS;
  constructor(public readonly payload: number) { }
}

export class GetMentorDetailsByIdError implements Action {
  public readonly type = EMentorActions.GET_MENTOR_EXTRA_DETAILS_ERROR;
  constructor(public readonly payload: any) { }
}
export class GetMentorDetailsByIdSuccess implements Action {
  public readonly type = EMentorActions.GET_MENTOR_EXTRA_DETAILS_SUCCESS;
  constructor(public payload: { mentor: IMentor, mentorExtra: IMentorExtra }) { }
}


/** mentor subs */
export class GetMentorSubscription implements Action {
  public readonly type = EMentorActions.GET_MENTOR_SUBSCRIPTION;
  constructor(public readonly payload: IPage) { }
}

export class GetMentorSubscriptionError implements Action {
  public readonly type = EMentorActions.GET_MENTOR_SUBSCRIPTION_ERROR;
  constructor(public readonly payload: any) { }
}
export class GetMentorSubscriptionSuccess implements Action {
  public readonly type = EMentorActions.GET_MENTOR_SUBSCRIPTION_SUCCESS;
  constructor(public payload: { mentorSubscription: ISubscription[], signupStatus: boolean, page: IPage }) { }
}

/** mentor create */
export class CreateMentor implements Action {
  public readonly type = EMentorActions.CREATE_MENTOR;
  constructor(public readonly payload: IMentorEdit) { }
}

export class CreateMentorError implements Action {
  public readonly type = EMentorActions.CREATE_MENTOR_ERROR;
  constructor(public readonly payload: any) { }
}
export class CreateMentorSuccess implements Action {
  public readonly type = EMentorActions.CREATE_MENTOR_SUCCESS;
  constructor(public payload: { signupStatus }) { }
}

/** mentor update */
export class UpdateMentor implements Action {
  public readonly type = EMentorActions.UPDATE_MENTOR;
  constructor(public readonly payload: IMentorEdit) { }
}

export class UpdateMentorError implements Action {
  public readonly type = EMentorActions.UPDATE_MENTOR_ERROR;
  constructor(public readonly payload: any) { }
}
export class UpdateMentorSuccess implements Action {
  public readonly type = EMentorActions.UPDATE_MENTOR_SUCCESS;
  constructor(public payload: { signupStatus }) { }
}

export type MentorActions =
  GetMentorById |  GetMentorByIdError |  GetMentorByIdSuccess |
  GetMentorSubscription |  GetMentorSubscriptionError |  GetMentorSubscriptionSuccess |
  CreateMentor |  CreateMentorError |  CreateMentorSuccess |
  UpdateMentor |  UpdateMentorError |  UpdateMentorSuccess |
  GetMentorDetailsById |  GetMentorDetailsByIdError |  GetMentorDetailsByIdSuccess |
  SuggestMentorByStr | SuggestMentorByStrError | SuggestMentorByStrSuccess;
