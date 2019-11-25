import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import * as MenteeActions from '../actions';
import { MenteeDataService } from '../services';

const toAction = MenteeActions.toAction();
type MenteeAction = MenteeActions.MenteeAction;
type GetMenteeAction = MenteeActions.GetMentee;

@Injectable()
export class MenteeEffects {

  @Effect()
  getMentees$: Observable<Action> = this.actions$
    .pipe(
      ofType(MenteeActions.GET_MENTEES),
      switchMap(() =>
        toAction(
          this.menteeDataService.getMentees(),
          MenteeActions.GetMenteesSuccess,
          MenteeActions.GetMenteesError
        )
      )
    );

    @Effect()
    getMentee$: Observable<Action> = this.actions$
      .pipe(
        ofType(MenteeActions.GET_MENTEE),
        switchMap((action: GetMenteeAction) =>
          toAction(
            this.menteeDataService.getMentee(action.payload),
            MenteeActions.GetMenteeSuccess,
            MenteeActions.GetMenteeError
          )
        )
      );

  @Effect()
  addMentee$: Observable<Action> = this.actions$
    .pipe(
      ofType(MenteeActions.ADD_MENTEE),
      concatMap((action: MenteeAction) =>
        toAction(
          this.menteeDataService.addMentee(action.payload),
          MenteeActions.AddMenteeSuccess,
          MenteeActions.AddMenteeError
        )
      )
    );

  @Effect()
  deleteMentee$: Observable<Action> = this.actions$
    .pipe(
      ofType(MenteeActions.DELETE_MENTEE),
      concatMap((action: MenteeAction) =>
        toAction(
          this.menteeDataService.deleteMentee(action.payload),
          MenteeActions.DeleteMenteeSuccess,
          MenteeActions.DeleteMenteeError
        )
      )
    );

  @Effect()
  updateMentee$: Observable<Action> = this.actions$
    .pipe(
      ofType<MenteeActions.UpdateMentee>(MenteeActions.UPDATE_MENTEE),
      concatMap((action: MenteeAction) =>
        toAction(
          this.menteeDataService.updateMentee(action.payload),
          MenteeActions.UpdateMenteeSuccess,
          MenteeActions.UpdateMenteeError
        )
      )
    );

  constructor(
    private actions$: Actions,
    private menteeDataService: MenteeDataService
  ) {}

}
