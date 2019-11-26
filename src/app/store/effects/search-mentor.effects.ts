import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import * as SearchMentorActions from '../actions';
import { SearchMentorDataService } from '../services';

const toAction = SearchMentorActions.toAction();
type SearchMentorAction = SearchMentorActions.SearchMentorAction;
type SearchAction = SearchMentorActions.SearchMentors;

@Injectable()
export class SearchMentorEffects {


  @Effect()
  searchMentors$: Observable<Action> = this.actions$
    .pipe(
      ofType<SearchMentorActions.SearchMentors>(SearchMentorActions.SEARCH_MENTORS),
      concatMap((action: SearchAction) =>
        toAction(
          this.searchMentorDataService.searchMentors(action.payload),
          SearchMentorActions.SearchMentorsSuccess,
          SearchMentorActions.SearchMentorsError
        )
      )
    );

  @Effect()
  getSearchMentors$: Observable<Action> = this.actions$
    .pipe(
      ofType(SearchMentorActions.SEARCH_MENTORS),
      switchMap((action: SearchAction) =>
        toAction(
          this.searchMentorDataService.searchMentors(action.payload),
          SearchMentorActions.SearchMentorsSuccess,
          SearchMentorActions.SearchMentorsError
        )
      )
    );

  constructor(
    private actions$: Actions,
    private searchMentorDataService: SearchMentorDataService
  ) { }

}
