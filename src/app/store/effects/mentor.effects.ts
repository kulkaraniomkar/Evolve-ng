import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import * as MentorActions from '../actions';
import { MentorDataService } from '../services';

const toAction = MentorActions.toAction();
type MentorAction = MentorActions.MentorAction;
type GetMentorAction = MentorActions.GetMentor;

@Injectable()
export class MentorEffects {

  @Effect()
  getMentors$: Observable<Action> = this.actions$
    .pipe(
      ofType(MentorActions.GET_MENTORS),
      switchMap(() =>
        toAction(
          this.menteeDataService.getMentors(),
          MentorActions.GetMentorsSuccess,
          MentorActions.GetMentorsError
        )
      )
    );

    @Effect()
    getMentor$: Observable<Action> = this.actions$
      .pipe(
        ofType(MentorActions.GET_MENTOR),
        switchMap((action: GetMentorAction) =>
          toAction(
            this.menteeDataService.getMentor(action.payload),
            MentorActions.GetMentorSuccess,
            MentorActions.GetMentorError
          )
        )
      );

  @Effect()
  addMentor$: Observable<Action> = this.actions$
    .pipe(
      ofType(MentorActions.ADD_MENTOR),
      concatMap((action: MentorAction) =>
        toAction(
          this.menteeDataService.addMentor(action.payload),
          MentorActions.AddMentorSuccess,
          MentorActions.AddMentorError
        )
      )
    );

  @Effect()
  deleteMentor$: Observable<Action> = this.actions$
    .pipe(
      ofType(MentorActions.DELETE_MENTOR),
      concatMap((action: MentorAction) =>
        toAction(
          this.menteeDataService.deleteMentor(action.payload),
          MentorActions.DeleteMentorSuccess,
          MentorActions.DeleteMentorError
        )
      )
    );

  @Effect()
  updateMentor$: Observable<Action> = this.actions$
    .pipe(
      ofType<MentorActions.UpdateMentor>(MentorActions.UPDATE_MENTOR),
      concatMap((action: MentorAction) =>
        toAction(
          this.menteeDataService.updateMentor(action.payload),
          MentorActions.UpdateMentorSuccess,
          MentorActions.UpdateMentorError
        )
      )
    );

  constructor(
    private actions$: Actions,
    private menteeDataService: MentorDataService
  ) {}

}