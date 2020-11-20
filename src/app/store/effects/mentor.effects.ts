
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, mergeMap, catchError, tap, debounceTime, map, skip, takeUntil } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import * as MentorActions from 'src/app/store/actions/mentor.action';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { EMentorActions } from 'src/app/store/actions/mentor.action';
import { MentorService } from 'src/app/services/mentor.service';
import { IMentorService, IMentorSubscriptionService, IMentorEditService, IMentorExtraDetailsService } from 'src/app/models/http-models/mentor-http.interface';
import { query } from '@angular/animations';


@Injectable()
export class MentorEffects {
  @Effect() getMentorById$: Observable<Action> = this._actions$.pipe(
    ofType<MentorActions.GetMentorById>(EMentorActions.GET_MENTOR),
    switchMap((action: MentorActions.GetMentorById) => this._mentorService.getMentorById(action.payload)
      .pipe(
        mergeMap(
          (mentorService: IMentorService) => of(new MentorActions.GetMentorByIdSuccess(mentorService))
        ),
        catchError(err => {
          return of(new MentorActions.GetMentorByIdError(err));
        })
      )
    ))
  @Effect() getMentorDetailsById$: Observable<Action> = this._actions$.pipe(
    ofType<MentorActions.GetMentorDetailsById>(EMentorActions.GET_MENTOR_EXTRA_DETAILS),
    tap(c => console.log(c)),
    switchMap((action: MentorActions.GetMentorDetailsById) => this._mentorService.getMentorDetailsById(action.payload)
      .pipe(
        tap(c => console.log(c)),
        mergeMap(
          (mentorService: IMentorExtraDetailsService) => of(new MentorActions.GetMentorDetailsByIdSuccess(mentorService))
        ),
        catchError(err => {
          return of(new MentorActions.GetMentorDetailsByIdError(err));
        })
      )
    ))

  @Effect() getMentorSubscription$: Observable<Action> = this._actions$.pipe(
    ofType<MentorActions.GetMentorSubscription>(EMentorActions.GET_MENTOR_SUBSCRIPTION),
    switchMap((action: MentorActions.GetMentorSubscription) => this._mentorService.getMentorSubscription(action.payload)
      .pipe(
        mergeMap(
          (subscriptionService: IMentorSubscriptionService) => of(new MentorActions.GetMentorSubscriptionSuccess(subscriptionService))
        ),
        catchError(err => {
          return of(new MentorActions.GetMentorSubscriptionError(err));
        })
      )
    ))

  @Effect() createMentor$: Observable<Action> = this._actions$.pipe(
    ofType<MentorActions.CreateMentor>(EMentorActions.CREATE_MENTOR),
    switchMap((action: MentorActions.CreateMentor) => this._mentorService.addMentor(action.payload)
      .pipe(
        mergeMap(
          (menteeService: IMentorEditService) => of(new MentorActions.CreateMentorSuccess(menteeService))
        ),
        catchError(err => {
          return of(new MentorActions.CreateMentorError(err));
        })
      )
    ))

  @Effect() updateMentor$: Observable<Action> = this._actions$.pipe(
    ofType<MentorActions.UpdateMentor>(EMentorActions.UPDATE_MENTOR),
    switchMap((action: MentorActions.UpdateMentor) => this._mentorService.updateMentor(action.payload)
      .pipe(
        mergeMap(
          (menteeService: IMentorEditService) => of(new MentorActions.UpdateMentorSuccess(menteeService))
        ),
        catchError(err => {
          return of(new MentorActions.UpdateMentorError(err));
        })
      )
    ))
  @Effect()
  suggestedMentor$: Observable<Action>
    = this._actions$.pipe(
      ofType<MentorActions.SuggestMentorByStr>(EMentorActions.SUGGEST_MENTOR),
      debounceTime(300),
      map((action: MentorActions.SuggestMentorByStr) => action.payload),
      tap(d => console.log(d)),
      switchMap(query => {
        const nextSuggest$ = this._actions$.pipe(
          ofType<MentorActions.SuggestMentorByStr>(EMentorActions.SUGGEST_MENTOR),
          tap(d => console.log(d)),
          skip(1)
        );

        return this._mentorService.searchMentor(query).pipe(
          tap(d => console.log(d)),
          takeUntil(nextSuggest$),
          tap(d => console.log(d)),
          map(response => {
            console.log(response);
            return new MentorActions.SuggestMentorByStrSuccess(response)
          }),
          catchError(err => {
            return of(new MentorActions.SuggestMentorByStrError(err));
          })
        )
      }
      )
    )


  @Effect({ dispatch: false })
  emptySubscriptionUnregistered$: Observable<Action> = this._actions$.pipe(
    ofType(EMentorActions.GET_MENTOR_SUBSCRIPTION_SUCCESS),
    tap((action: MentorActions.GetMentorSubscriptionSuccess) => {
      if (!action.payload.signupStatus && !action.payload.mentorSubscription) {
        this._router.navigate(['mentor/signup'])
      }
    })
  );

  @Effect({ dispatch: false })
  updateMentorSuccess$: Observable<Action> = this._actions$.pipe(
    ofType(EMentorActions.UPDATE_MENTOR_SUCCESS),
    tap((action: MentorActions.UpdateMentorSuccess) => {
      if (action.payload.signupStatus) {
        this._router.navigate(['mentor/my-mentees'])
      }
    })
  );
  @Effect({ dispatch: false })
  createMentorSuccess$: Observable<Action> = this._actions$.pipe(
    ofType(EMentorActions.CREATE_MENTOR_SUCCESS),
    tap((action: MentorActions.CreateMentorSuccess) => {
      if (action.payload.signupStatus) {
        this._router.navigate(['mentor/my-mentees'])
      }
    })
  );
  constructor(
    private _router: Router,
    private _mentorService: MentorService,
    private _actions$: Actions) { }
}
