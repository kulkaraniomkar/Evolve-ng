
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, mergeMap, catchError, tap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import * as MatchActions from '../actions/match.actions';
import { EMatchActions } from '../actions/match.actions';
import { MatchService } from 'src/app/services/match.service';
import { IMatchService, IManualMatchesService } from 'src/app/models/http-models/match-http.interface';
import { Action } from '@ngrx/store';
import { IMatch } from 'src/app/models/match.interface';
import { IMatchRegister } from 'src/app/models/match-register.interface';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';


@Injectable()
export class MatchEffects {
  @Effect() getAutoMatches$: Observable<Action> = this._actions$.pipe(
    ofType<MatchActions.GetAutoMatches>(EMatchActions.GET_AUTO_MATCHES),
    switchMap((action: MatchActions.GetAutoMatches) => this._matchService.getAutoMatches(action.payload)
      .pipe(
        mergeMap(
          (matchService: IMatchService) => of(new MatchActions.GetAutoMatchesSuccess(matchService))
        ),
        catchError(err => {
          return of(new MatchActions.GetAutoMatchesError(err));
        })
      )
    ))

  @Effect() getSavedMatches$: Observable<Action> = this._actions$.pipe(
    ofType<MatchActions.GetSavedMatches>(EMatchActions.GET_SAVED_MATCHES),
    switchMap((action: MatchActions.GetSavedMatches) => this._matchService.getSavedMatches(action.payload)
      .pipe(
        mergeMap(
          (matchService: IMatchService) => of(new MatchActions.GetSavedMatchesSuccess(matchService))
        ),
        catchError(err => {
          return of(new MatchActions.GetSavedMatchesError(err));
        })
      )
    ))
  @Effect() saveAutoMatches$: Observable<Action> = this._actions$.pipe(
    ofType<MatchActions.SaveAutoMatches>(EMatchActions.SAVE_AUTO_MATCHES),
    switchMap((action: MatchActions.SaveAutoMatches) => this._matchService.saveAutoMatches(action.payload)
      .pipe(
        mergeMap(
          (matchService: IMatchService) => of(new MatchActions.SaveAutoMatchesSuccess(matchService))
        ),
        catchError(err => {
          return of(new MatchActions.SaveAutoMatchesError(err));
        })
      )
    ))
  @Effect() saveMatch$: Observable<Action> = this._actions$.pipe(
    ofType<MatchActions.SaveMatch>(EMatchActions.SAVE_MATCH),
    switchMap((action: MatchActions.SaveMatch) => this._matchService.saveMatch(action.payload)
      .pipe(
        mergeMap(
          (matchService: IMatchRegister) => of(new MatchActions.SaveMatchSuccess(matchService))
        ),
        catchError(err => {
          return of(new MatchActions.SaveMatchError(err));
        })
      )
    ))
  @Effect({ dispatch: false })
  saveAutoMatchSuccess$: Observable<Action> = this._actions$.pipe(
    ofType(EMatchActions.SAVE_AUTO_MATCHES_SUCCESS),
    tap((action) => {
      console.log(action)
    }),
    // map((result: any) => {
    //   console.log(result);
    //  return result;;
    // }),
    // tap((action) => this._router.navigate(['/admin/list']))
  );
  @Effect({ dispatch: false })
  updateMatchSuccess$: Observable<Action> = this._actions$.pipe(
    ofType(EMatchActions.UPDATE_MENTORSHIP_ACTIVITY_SUCCESS),
    tap((action) => this._router.navigate(['/admin/list']))
  );
  @Effect({ dispatch: false })
  saveMatchSuccess$: Observable<Action> = this._actions$.pipe(
    ofType(EMatchActions.SAVE_MATCH_SUCCESS),
    tap((action) => this._router.navigate(['/admin/list']))
  );
  @Effect() deleteSavedMatches$: Observable<Action> = this._actions$.pipe(
    ofType<MatchActions.DeleteSavedMatches>(EMatchActions.DELETE_SAVED_MATCHES),
    switchMap((action: MatchActions.DeleteSavedMatches) => this._matchService.deleteSavedMatches(action.payload)
      .pipe(
        mergeMap(
          () => of(new MatchActions.DeleteSavedMatchesSuccess())
        ),
        catchError(err => {
          return of(new MatchActions.DeleteSavedMatchesError(err));
        })
      )
    ))


  @Effect() getManualMatches$: Observable<Action> = this._actions$.pipe(
    ofType<MatchActions.GetManualMatches>(EMatchActions.GET_MANUAL_MATCHES),
    switchMap((action: MatchActions.GetManualMatches) => this._matchService.getManualMatches(action.payload)
      .pipe(
        mergeMap(
          (manualMatchService: IManualMatchesService) => of(new MatchActions.GetManualMatchesSuccess(manualMatchService))
        ),
        catchError(err => {
          return of(new MatchActions.GetManualMatchesError(err));
        })
      )
    ))
  @Effect() searchManualMatches$: Observable<Action> = this._actions$.pipe(
    ofType<MatchActions.SearchManualMatches>(EMatchActions.SEARCH_MANUAL_MATCHES),
    switchMap((action: MatchActions.SearchManualMatches) => this._matchService.searchManual(action.payload)
      .pipe(
        mergeMap(
          (manualMatchService: IManualMatchesService) => of(new MatchActions.GetManualMatchesSuccess(manualMatchService))
        ),
        catchError(err => {
          return of(new MatchActions.GetManualMatchesError(err));
        })
      )
    ))
  @Effect()
  updateMentorshipActivity$: Observable<Action> = this._actions$.pipe(
    ofType<MatchActions.UpdateMentorshipActivity>(EMatchActions.UPDATE_MENTORSHIP_ACTIVITY),
    switchMap((action: MatchActions.UpdateMentorshipActivity) => this._matchService.updateMentorshipActivity(action.payload)
      .pipe(
        mergeMap(
          (mentorshipService: IMatchRegister) => of(new MatchActions.UpdateMentorshipActivitySuccess(mentorshipService))
        ),
        catchError(err => {
          return of(new MatchActions.UpdateMentorshipActivityError(err));
        })
      )
    ))

  constructor(
    //private _modalService: NzModalService,
    private _router: Router,
    private _matchService: MatchService,
    private _actions$: Actions) { }
}
