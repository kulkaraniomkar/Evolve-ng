import { ISubscription, IAllocatedMentor, IMentorMentees } from 'src/app/models/subscription.interface';
import { Action } from '@ngrx/store';
import { IPage } from 'src/app/models/page.interface';
import { IAllocatedMentorService } from 'src/app/models/http-models/subscription-http.interface';

export enum ESubscriptionActions {
  GET_PENDING_SUBSCRIPTIONS = '[Subscriptions] GET_PENDING_SUBSCRIPTIONS',
  GET_PENDING_SUBSCRIPTIONS_ERROR = '[Subscriptions] GET_PENDING_SUBSCRIPTIONS_ERROR',
  GET_PENDING_SUBSCRIPTIONS_SUCCESS = '[Subscriptions] GET_PENDING_SUBSCRIPTIONS_SUCCESS ',

  GET_ALLOCATED_MENTORS_SUBSCRIPTIONS = '[Subscriptions] GET_ALLOCATED_MENTORS_SUBSCRIPTIONS',
  GET_ALLOCATED_MENTORS_ERROR_SUBSCRIPTIONS = '[Subscriptions]  GET_ALLOCATED_MENTORS_ERROR_SUBSCRIPTIONS',
  GET_ALLOCATED_MENTORS_SUCCESS_SUBSCRIPTIONS = '[Subscriptions]  GET_ALLOCATED_MENTORS_SUCCESS_SUBSCRIPTIONS',
    
  GET_UNALLOCATED_SUBSCRIPTIONS = '[Subscriptions] GET_UNALLOCATED_SUBSCRIPTIONS',
  GET_UNALLOCATED_SUBSCRIPTIONS_ERROR = '[Subscriptions] GET_UNALLOCATED_SUBSCRIPTIONS_ERROR',
  GET_UNALLOCATED_SUBSCRIPTIONS_SUCCESS = '[Subscriptions] GET_UNALLOCATED_SUBSCRIPTIONS_SUCCESS',

  SEARCH_UNALLOCATED_SUBSCRIPTIONS = '[Subscriptions] SEARCH_UNALLOCATED_SUBSCRIPTIONS',
  SEARCH_UNALLOCATED_SUBSCRIPTIONS_ERROR = '[Subscriptions] SEARCH_UNALLOCATED_SUBSCRIPTIONS_ERROR',
  SEARCH_UNALLOCATED_SUBSCRIPTIONS_SUCCESS = '[Subscriptions] SEARCH_UNALLOCATED_SUBSCRIPTIONS_SUCCESS',

  SEARCH_ALLOCATED_SUBSCRIPTIONS = '[Subscriptions] SEARCH_ALLOCATED_SUBSCRIPTIONS',
  SEARCH_ALLOCATED_SUBSCRIPTIONS_ERROR = '[Subscriptions] SEARCH_ALLOCATED_SUBSCRIPTIONS_ERROR',
  SEARCH_ALLOCATED_SUBSCRIPTIONS_SUCCESS = '[Subscriptions] SEARCH_ALLOCATED_SUBSCRIPTIONS_SUCCESS',

  SEARCH_EXPLORATORY_SUBSCRIPTIONS = '[Subscriptions] SEARCH_EXPLORATORY_SUBSCRIPTIONS',
  SEARCH_EXPLORATORY_SUBSCRIPTIONS_ERROR = '[Subscriptions] SEARCH_EXPLORATORY_SUBSCRIPTIONS_ERROR',
  SEARCH_EXPLORATORY_SUBSCRIPTIONS_SUCCESS = '[Subscriptions] SEARCH_EXPLORATORY_SUBSCRIPTIONS_SUCCESS',


  GET_EXPLORATORY_SUBSCRIPTIONS = '[Subscriptions] GET_EXPLORATORY_SUBSCRIPTIONS',
  GET_EXPLORATORY_SUBSCRIPTIONS_ERROR = '[Subscriptions] GET_EXPLORATORY_SUBSCRIPTIONS_ERROR',
  GET_EXPLORATORY_SUBSCRIPTIONS_SUCCESS = '[Subscriptions] GET_EXPLORATORY_SUBSCRIPTIONS_SUCCESS',

  SET_ALLOCATED_MENTORS_EXPAND = '[Expand] SET_ALLOCATED_MENTORS_EXPAND',
  
  GET_MENTEES_PER_MENTOR = '[MenteesPerMentor] GET_MENTEES_PER_MENTORS',
  GET_MENTEES_PER_MENTOR_ERROR = '[MenteesPerMentor] GET_MENTEES_PER_MENTOR_ERROR',
  GET_MENTEES_PER_MENTOR_SUCCESS = '[MenteesPerMentor] GET_MENTEES_PER_MENTOR_SUCCESS',

  GET_MENTEE_SEARCH = '[Search] GET_MENTEE_SEARCH',
  GET_MENTEE_SEARCH_ERROR = '[Search] GET_MENTEE_SEARCH_ERROR',
  GET_MENTEE_SEARCH_SUCCESS = '[Search] GET_MENTEE_SEARCH_SUCCESS',
}
/** Pending Subscriptions */
export class GetPendingSubscriptions implements Action {
  public readonly type = ESubscriptionActions.GET_PENDING_SUBSCRIPTIONS;
  constructor(public readonly payload: IPage) { }
}


export class GetPendingSubscriptionsError implements Action {
  public readonly type = ESubscriptionActions.GET_PENDING_SUBSCRIPTIONS_ERROR;
  constructor(public readonly payload: any) { }
}
export class GetPendingSubscriptionsSuccess implements Action {
  public readonly type = ESubscriptionActions.GET_PENDING_SUBSCRIPTIONS_SUCCESS;
  constructor(public payload: { pendingMentees: ISubscription[], pagePending?: IPage }) { }
}

/** Allocated mentors */
export class GetAllocatedMentors implements Action {
  public readonly type = ESubscriptionActions.GET_ALLOCATED_MENTORS_SUBSCRIPTIONS;
  constructor(public readonly payload: IPage) { }
}

export class GetAllocatedMentorsError implements Action {
  public readonly type = ESubscriptionActions.GET_ALLOCATED_MENTORS_ERROR_SUBSCRIPTIONS;
  constructor(public readonly payload: any) { }
}
export class GetAllocatedMentorsSuccess implements Action {
  public readonly type = ESubscriptionActions.GET_ALLOCATED_MENTORS_SUCCESS_SUBSCRIPTIONS;
  constructor(public payload: { allocatedMentors: IAllocatedMentor[], pageAllocated: IPage }) { }
}

/** MenteesPerMentor */
export class GetMenteesPerMentor implements Action {
  public readonly type = ESubscriptionActions.GET_MENTEES_PER_MENTOR;
  constructor(public readonly payload: { mentorId: number, paging: IPage }) {}
}

export class GetMenteesPerMentorError implements Action {
  public readonly type = ESubscriptionActions.GET_MENTEES_PER_MENTOR_ERROR;
  constructor(public readonly payload: any) {}
}
export class GetMenteesPerMentorSuccess implements Action {
  public readonly type = ESubscriptionActions.GET_MENTEES_PER_MENTOR_SUCCESS;
  constructor(public payload: {menteesPerMentor: IMentorMentees[],  pageNested: IPage}) {}
}

export class SetAllocatedMentorsExpand implements Action {
  public readonly type = ESubscriptionActions.SET_ALLOCATED_MENTORS_EXPAND;
  constructor(public readonly payload: { mentorId: number, expand: boolean }) {}
}

/** Unallocated Subscriptions */
export class GetUnallocatedSubscriptions implements Action {
  public readonly type = ESubscriptionActions.GET_UNALLOCATED_SUBSCRIPTIONS;
  constructor(public readonly payload: IPage) {}
}

export class GetUnallocatedSubscriptionsError implements Action {
  public readonly type = ESubscriptionActions.GET_UNALLOCATED_SUBSCRIPTIONS_ERROR;
  constructor(public readonly payload: any) {}
}
export class GetUnallocatedSubscriptionsSuccess implements Action {
  public readonly type = ESubscriptionActions.GET_UNALLOCATED_SUBSCRIPTIONS_SUCCESS;
  constructor(public payload: { unallocatedMentors: ISubscription[], pageUnallocated?: IPage}) {}
}
/** Search Unallocated Subscriptions */
export class SearchUnallocatedSubscriptions implements Action {
  public readonly type = ESubscriptionActions.SEARCH_UNALLOCATED_SUBSCRIPTIONS;
  constructor(public readonly payload:  { searchParam: string, paging: IPage }) {}
}

export class SearchUnallocatedSubscriptionsError implements Action {
  public readonly type = ESubscriptionActions.SEARCH_UNALLOCATED_SUBSCRIPTIONS_ERROR;
  constructor(public readonly payload: any) {}
}
export class SearchUnallocatedSubscriptionsSuccess implements Action {
  public readonly type = ESubscriptionActions.SEARCH_UNALLOCATED_SUBSCRIPTIONS_SUCCESS;
  constructor(public payload: { unallocatedMentors: ISubscription[], pageUnallocated?: IPage}) {}
}
/** Search Exploratory Subscriptions */
export class SearchExploratorySubscriptions implements Action {
  public readonly type = ESubscriptionActions.SEARCH_EXPLORATORY_SUBSCRIPTIONS;
  constructor(public readonly payload:  { searchParam: string, paging: IPage }) {}
}

export class SearchExploratorySubscriptionsError implements Action {
  public readonly type = ESubscriptionActions.SEARCH_EXPLORATORY_SUBSCRIPTIONS_ERROR;
  constructor(public readonly payload: any) {}
}
export class SearchExploratorySubscriptionsSuccess implements Action {
  public readonly type = ESubscriptionActions.SEARCH_EXPLORATORY_SUBSCRIPTIONS_SUCCESS;
  constructor(public payload: { exploratoryMentorship: ISubscription[], pageExploratory?: IPage}) {}
}
/** Search Exploratory Subscriptions */
export class SearchAllocatedSubscriptions implements Action {
  public readonly type = ESubscriptionActions.SEARCH_ALLOCATED_SUBSCRIPTIONS;
  constructor(public readonly payload:  { searchParam: string, paging: IPage }) {}
}

export class SearchAllocatedSubscriptionsError implements Action {
  public readonly type = ESubscriptionActions.SEARCH_ALLOCATED_SUBSCRIPTIONS_ERROR;
  constructor(public readonly payload: any) {}
}
export class SearchAllocatedSubscriptionsSuccess implements Action {
  public readonly type = ESubscriptionActions.SEARCH_ALLOCATED_SUBSCRIPTIONS_SUCCESS;
  constructor(public payload: { allocatedMentors: IAllocatedMentor[], pageAllocated?: IPage}) {}
}
/** Exploratory Subscriptions */
export class GetExploratorySubscriptions implements Action {
  public readonly type = ESubscriptionActions.GET_EXPLORATORY_SUBSCRIPTIONS;
  constructor(public readonly payload: IPage) {}
}

export class GetExploratorySubscriptionsError implements Action {
  public readonly type = ESubscriptionActions.GET_EXPLORATORY_SUBSCRIPTIONS_ERROR;
  constructor(public readonly payload: any) {}
}
export class GetExploratorySubscriptionsSuccess implements Action {
  public readonly type = ESubscriptionActions.GET_EXPLORATORY_SUBSCRIPTIONS_SUCCESS;
  constructor(public payload: { exploratoryMentorship: ISubscription[], pageExploratory?: IPage}) {}
}
/** Search mentee*/
export class GetMenteeSearch implements Action {
  public readonly type = ESubscriptionActions.GET_MENTEE_SEARCH;
  constructor(public readonly payload: { searchParam: string, paging: IPage }) {}
}

export class GetMenteeSearchError implements Action {
  public readonly type = ESubscriptionActions.GET_MENTEE_SEARCH_ERROR;
  constructor(public readonly payload: any) {}
}
export class GetMenteeSearchSuccess implements Action {
  public readonly type = ESubscriptionActions.GET_MENTEE_SEARCH_SUCCESS;
  constructor(public payload: {subscriptions: ISubscription[], page: IPage}) {}
}


export type SubscriptionActions =
  GetPendingSubscriptions | GetPendingSubscriptionsError | GetPendingSubscriptionsSuccess |
  GetAllocatedMentors | GetAllocatedMentorsError | GetAllocatedMentorsSuccess |
  GetMenteesPerMentor | GetMenteesPerMentorError | GetMenteesPerMentorSuccess |
  SetAllocatedMentorsExpand |
  GetUnallocatedSubscriptions | GetUnallocatedSubscriptionsError | GetUnallocatedSubscriptionsSuccess |
  GetExploratorySubscriptions | GetExploratorySubscriptionsError | GetExploratorySubscriptionsSuccess |
  GetMenteeSearch | GetMenteeSearchError | GetMenteeSearchSuccess |
  SearchUnallocatedSubscriptions | SearchUnallocatedSubscriptionsError | SearchUnallocatedSubscriptionsSuccess |
  SearchExploratorySubscriptions | SearchExploratorySubscriptionsError | SearchExploratorySubscriptionsSuccess |
  SearchAllocatedSubscriptions | SearchAllocatedSubscriptionsError | SearchAllocatedSubscriptionsSuccess;