
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, mergeMap, catchError, tap, map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import * as UserActions from '../actions/user.actions';
import { EUserActions } from '../actions/user.actions';

import { IdentityService } from 'src/app/services/identity.service';
import { IActivityService } from 'src/app/models/http-models/activity-http.interface';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user.interface';


@Injectable()
export class UserEffects {

  @Effect()
  getUser$: Observable<Action> = this._actions$.pipe(
    ofType<UserActions.GetUser>(EUserActions.GET_USER),
    switchMap((action: UserActions.GetUser) => this._userService.getIdentity()
      .pipe(
        mergeMap(
          (user: IUser) => of(new UserActions.GetUserSuccess({ user: user }))
        ),
        catchError(error => of(new UserActions.GetUserError({ error }))
        )
      )))

  // @Effect() getMenteeSubscription$: Observable<Action> = this._actions$.pipe(
  //   ofType<UserActions.GetUser>(EUserActions.GET_USER),
  //   switchMap((action: UserActions.GetUser) => this._userService.getIdentity()
  //     .pipe(
  //       mergeMap(
  //         (user : IUser) => of(new UserActions.GetUserSuccess({user}))
  //       ),
  //       catchError(err => {
  //         return of(new UserActions.GetUserError({ err }));
  //       })
  //     )
  //   ))

  constructor(
    private _userService: IdentityService,
    private _actions$: Actions) { }
}
