import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, switchMap, tap } from 'rxjs/operators';
import * as MSubscriptionActions from '../actions';
import { MSubscriptionDataService } from '../services';
import { Router } from '@angular/router';
// import { SavedMentorMatchAction } from '../actions';

const toAction = MSubscriptionActions.toAction();
type MSubscriptionAction = MSubscriptionActions.MSubscriptionAction;

type GetMSubscriptionAction = MSubscriptionActions.GetMSubscriptions;
type GetMentorsMatchAction = MSubscriptionActions.GetMentorsMatch;
type AddSavedMatchAction = MSubscriptionActions.AddSavedMatch;

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
    @Effect()
    getMentorsMatch$: Observable<Action> = this.actions$
      .pipe(
        ofType(MSubscriptionActions.GET_MENTORS_MATCH),
        switchMap((action: GetMentorsMatchAction) =>
          toAction(
            this.msubscriptionDataService.getAutomatch(action.payload),
            MSubscriptionActions.GetMentorsMatchSuccess,
            MSubscriptionActions.GetMentorsError
          )
        )
      );
      @Effect()
      addSavedMatch$: Observable<Action> = this.actions$
        .pipe(
          ofType(MSubscriptionActions.SAVE_MENTORS_MATCH),
          concatMap((action: AddSavedMatchAction) =>
            toAction(
              this.msubscriptionDataService.addSavedMatch(action.payload),
              MSubscriptionActions.AddSavedMatchSuccess,
              MSubscriptionActions.AddSavedMatchError
            )
          )
        );

 

  constructor(
    private router: Router,
    private actions$: Actions,
    private msubscriptionDataService: MSubscriptionDataService
  ) { }

}
