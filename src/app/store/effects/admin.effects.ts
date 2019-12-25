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

type SavedMatchAction = MSubscriptionActions.SavedMentorMatchAction;
type AddSavedMatchAction = MSubscriptionActions.AddSavedMatch;

type MentorInfoAction = MSubscriptionActions.MentorInfoAction;
type GetMentorInfoAction = MSubscriptionActions.GetMentorInfo;

type MentorMenteeAction = MSubscriptionActions.MentorMenteeAction;
type GetMentorMenteeAction = MSubscriptionActions.GetMentorMentee;

type MatchCreateAction = MSubscriptionActions.CreateMatchAction;
type AddMatchCreateAction = MSubscriptionActions.CreateMatch;

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

        @Effect()
        addCreateMatch$: Observable<Action> = this.actions$
          .pipe(
            ofType(MSubscriptionActions.CREATE_MATCH),
            concatMap((action: AddMatchCreateAction) =>
              toAction(
                this.msubscriptionDataService.addCreateMatch(action.payload),
                MSubscriptionActions.CreateMatchSuccess,
                MSubscriptionActions.CreateMatchError
              )
            )
          );
  

        @Effect()
        removeSavedMatch$: Observable<Action> = this.actions$
          .pipe(
            ofType(MSubscriptionActions.REMOVE_MENTORS_MATCH),
            concatMap((action: SavedMatchAction) =>
              toAction(
                this.msubscriptionDataService.removeSavedMatch(action.payload),
                MSubscriptionActions.RemoveSavedMatchSuccess,
                MSubscriptionActions.RemoveSavedMatchError
              )
            )
          );

          @Effect()
          getMentorInfo$: Observable<Action> = this.actions$
            .pipe(
              ofType(MSubscriptionActions.GET_MENTOR_INFO),
              switchMap((action: GetMentorInfoAction) =>
                toAction(
                  this.msubscriptionDataService.getMentorMatchInfo(action.payload),
                  MSubscriptionActions.GetMentorInfoSuccess,
                  MSubscriptionActions.GetMentorInfoError
                )
              )
            );
            @Effect()
            getMentorMentee$: Observable<Action> = this.actions$
              .pipe(
                ofType(MSubscriptionActions.GET_MENTOR_MENTEE),
                switchMap((action: GetMentorMenteeAction) =>
                  toAction(
                    this.msubscriptionDataService.getMentorMentee(action.payload),
                    MSubscriptionActions.GetMentorMenteeSuccess,
                    MSubscriptionActions.GetMentorMenteeError
                  )
                )
              );

 

  constructor(
    private router: Router,
    private actions$: Actions,
    private msubscriptionDataService: MSubscriptionDataService
  ) { }

}
