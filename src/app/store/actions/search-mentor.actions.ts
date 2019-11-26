import { Action } from '@ngrx/store';

import { SearchParams, SearchResults } from '../../core/model/mentor-search';
import { DataServiceError } from '../services';
import { DataAction, DataErrorAction } from './data.actions';



export const SEARCH_MENTORS = '[Mentor search]  SEARCH_MENTORS';
export const SEARCH_MENTORS_SUCCESS = '[Mentor search] SEARCH_MENTORS_SUCCESS';
export const SEARCH_MENTORS_ERROR = '[Mentor search] SEARCH_MENTORS_ERROR';


export const SET_SEARCH_MENTOR_LOADING = '[Mentor search] SET_SEARCH_MENTOR_LOADING';

export abstract class SearchMentorAction implements DataAction<SearchParams> {
  readonly type: string;
  constructor(public readonly payload: SearchParams) {}
}

export abstract class SearchMentorErrorAction implements DataErrorAction<SearchParams> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<SearchParams>) {}
}

export abstract class SearchMentorErrorAction2 implements DataErrorAction<SearchResults> {
  readonly type: string;
  constructor(public readonly payload: DataServiceError<SearchResults>) {}
}


export class SearchMentors implements Action {
  readonly type = SEARCH_MENTORS;
  constructor(public readonly payload: SearchParams) {}
}

export class SearchMentorsSuccess implements Action {
  readonly type = SEARCH_MENTORS_SUCCESS;
  constructor(public readonly payload: SearchResults[]) {}
}

export class SearchMentorsError implements Action {
  readonly type = SEARCH_MENTORS_ERROR;
  constructor(public readonly payload: any) {}
}
export class SetSearchMentorLoading {
  readonly type = SET_SEARCH_MENTOR_LOADING;
  constructor(public payload = true) {}
}

export type AllSearchMentorActions =
  | SearchMentors
  | SearchMentorsSuccess
  | SearchMentorsError
  | SetSearchMentorLoading;
  
