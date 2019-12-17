import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, switchMap, tap } from 'rxjs/operators';
import * as MSubscriptionActions from '../actions';
import { MSubscriptionDataService } from '../services';
import { Router } from '@angular/router';

const toAction = MSubscriptionActions.toAction();
type MSubscriptionAction = MSubscriptionActions.MSubscriptionAction;
type GetMSubscriptionAction = MSubscriptionActions.GetMSubscriptions;

@Injectable()
export class MSubscriptionEffects {

  @Effect()
  getMSubscriptions$: Observable<Action> = this.actions$
    .pipe(
      ofType(MSubscriptionActions.GET_MSUBSCRIPTIONS),
      switchMap(() =>
        toAction(
          this.msubscriptionDataService.getMSubscriptions(),
          MSubscriptionActions.GetMSubscriptionsSuccess,
          MSubscriptionActions.GetMSubscriptionsError
        )
      )
    );

 

  constructor(
    private router: Router,
    private actions$: Actions,
    private msubscriptionDataService: MSubscriptionDataService
  ) { }

}
