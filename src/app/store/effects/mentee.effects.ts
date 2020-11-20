
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import * as MenteeActions from 'src/app/store/actions/mentee.action';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { EMenteeActions } from 'src/app/store/actions/mentee.action';
import { MenteeService } from 'src/app/services/mentee.service';
import { IMenteeService, IMenteeSubscriptionService } from 'src/app/models/http-models/mentee-http.interface';


@Injectable()
export class MenteeEffects {
  @Effect() getMenteeById$: Observable<Action> = this._actions$.pipe(
    ofType<MenteeActions.GetMenteeById>(EMenteeActions.GET_MENTEE),
    switchMap((action: MenteeActions.GetMenteeById) => this._menteeService.getMenteeById(action.payload)
      .pipe(
        mergeMap(
          (menteeService: IMenteeService) => of(new MenteeActions.GetMenteeByIdSuccess(menteeService))
        ),
        catchError(err => {
          return of(new MenteeActions.GetMenteeByIdError(err));
        })
      )
    ))
  // @Effect({ dispatch: false })
  // getMenteeByIdSuccess$: Observable<Action> = this._actions$.pipe(
  //   ofType(EMenteeActions.GET_MENTEE_SUCCESS),
  //   tap((action: MenteeActions.GetMenteeByIdSuccess) => {
  //     if(action.payload['mentee']){
  //       this._router.navigate(['mentorship-mentee/signup']);
  //     }
  //   })
  // );
  @Effect() addMentee$: Observable<Action> = this._actions$.pipe(
    ofType<MenteeActions.AddMentee>(EMenteeActions.ADD_MENTEE),
    switchMap((action: MenteeActions.AddMentee) => this._menteeService.addMentee(action.payload)
      .pipe(
        mergeMap(
          (menteeService: IMenteeService) => of(new MenteeActions.AddMenteeSuccess(menteeService))
        ),
        catchError(err => {
          return of(new MenteeActions.AddMenteeError(err));
        })
      )
    ))
  @Effect({ dispatch: false })
  addMenteeSuccess$: Observable<Action> = this._actions$.pipe(
    ofType(EMenteeActions.ADD_MENTEE_SUCCESS),
    tap(() => {
      this._router.navigate(['mentee/my-subscriptions'])

    })
  );
  @Effect() updateMentee$: Observable<Action> = this._actions$.pipe(
    ofType<MenteeActions.UpdateMentee>(EMenteeActions.UPDATE_MENTEE),
    switchMap((action: MenteeActions.UpdateMentee) => this._menteeService.updateMentee(action.payload)
      .pipe(
        mergeMap(
          (menteeService: IMenteeService) => of(new MenteeActions.UpdateMenteeSuccess(menteeService))
        ),
        catchError(err => {
          return of(new MenteeActions.UpdateMenteeError(err));
        })
      )
    ))
  @Effect({ dispatch: false })
  updateMenteeSuccess$: Observable<Action> = this._actions$.pipe(
    ofType(EMenteeActions.UPDATE_MENTEE_SUCCESS),
    tap(() => {
      this._router.navigate(['mentee/my-subscriptions'])

    })
  );

  @Effect() getMenteeSubscription$: Observable<Action> = this._actions$.pipe(
    ofType<MenteeActions.GetMenteeSubscription>(EMenteeActions.GET_MENTEE_SUBSCRIPTION),
    switchMap((action: MenteeActions.GetMenteeSubscription) => this._menteeService.getMenteeSubscription(action.payload)
      .pipe(
        mergeMap(
          (subscriptionService: IMenteeSubscriptionService) => of(new MenteeActions.GetMenteeSubscriptionSuccess(subscriptionService))
        ),
        catchError(err => {
          return of(new MenteeActions.GetMenteeSubscriptionError(err));
        })
      )
    ))

  constructor(
    private _router: Router,
    private _menteeService: MenteeService,
    private _actions$: Actions) { }
}
