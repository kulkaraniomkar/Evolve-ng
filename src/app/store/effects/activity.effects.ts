
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { switchMap, mergeMap, catchError, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import * as ActivityActions from '../actions/activity.actions';
import { EActivityActions } from '../actions/activity.actions';

import { ActivityService } from 'src/app/services/activity.service';
import { IActivityService } from 'src/app/models/http-models/activity-http.interface';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';


@Injectable()
export class ActivityEffects {
  @Effect() getActivity$: Observable<Action> = this._actions$.pipe(
    ofType<ActivityActions.GetActivity>(EActivityActions.GET_ACTIVITY),
    switchMap((action: ActivityActions.GetActivity) => this._activityService.getActivity(action.payload.mentorId, action.payload.menteeId, action.payload.matchTypeId, action.payload.activityId)
      .pipe(
        mergeMap(
          (activityService: IActivityService) => of(new ActivityActions.GetActivitySuccess(activityService))
        ),
        catchError(err => {
          return of(new ActivityActions.GetActivityError(err));
        })
      )
    ))
  @Effect({ dispatch: false })
  getActivitySuccess$: Observable<Action> = this._actions$.pipe(
    ofType(EActivityActions.GET_ACTIVITY_SUCCESS),
    tap(() => {
      return this._router.navigate(['/admin/activity']);
    })
  );

  constructor(
    private _router: Router,
    private _activityService: ActivityService,
    private _actions$: Actions) { }
}
