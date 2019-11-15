import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { concatMap, switchMap } from 'rxjs/operators';
import * as MenteeDisplayDataActions from '../actions';
import { MenteeDisplayDataService } from '../services';

const toAction = MenteeDisplayDataActions.toAction();
// type MenteeDisplayDataAction = MenteeDisplayDataActions.MenteeDisplayDataAction;
type GetMenteeDisplayDataAction = MenteeDisplayDataActions.GetMenteeDisplayData;

@Injectable()
export class MenteeDisplayDataEffects {


    @Effect()
    getMenteeDisplayData$: Observable<Action> = this.actions$
      .pipe(
        ofType(MenteeDisplayDataActions.GET_MENTEE_DISPLAY_DATA),
        switchMap((action: GetMenteeDisplayDataAction) =>
          toAction(
            this.menteeDisplayDataService.getMenteeDisplayData(action.payload),
            MenteeDisplayDataActions.GetMenteeDisplayDataSuccess,
            MenteeDisplayDataActions.GetMenteeDisplayDataError
          )
        )
      );


  constructor(
    private actions$: Actions,
    private  menteeDisplayDataService: MenteeDisplayDataService
  ) {}

}
