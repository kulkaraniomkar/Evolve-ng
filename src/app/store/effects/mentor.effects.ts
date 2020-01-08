import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, ROOT_EFFECTS_INIT, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, concat, of, defer } from 'rxjs';
import { concatMap, switchMap, tap, filter, mergeMap, zip, map } from 'rxjs/operators';
import * as MentorActions from '../actions';
import { MentorDataService } from '../services';
import { Router } from '@angular/router';
import { RouterNavigationAction, ROUTER_NAVIGATION, ROUTER_REQUEST } from '@ngrx/router-store';


const toAction = MentorActions.toAction();
type MentorAction = MentorActions.MentorAction;
type GetMentorAction = MentorActions.GetMentor;

@Injectable()
export class MentorEffects {

  // ngrxOnInitEffects(): Action {

  //   return { type : MentorActions.GET_MENTORS }
  // }

  @Effect()
  getMentors$: Observable<Action> = this.actions$
    .pipe(
      ofType(MentorActions.GET_MENTORS),
      switchMap(() =>
        toAction(
          this.mentorDataService.getMentors(),
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
          this.mentorDataService.getMentor(action.payload),
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
          this.mentorDataService.addMentor(action.payload),
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
          this.mentorDataService.deleteMentor(action.payload),
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
          this.mentorDataService.updateMentor(action.payload),
          MentorActions.UpdateMentorSuccess,
          MentorActions.UpdateMentorError
        )
      )
    );
  @Effect({ dispatch: false })
  updateMentorSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(MentorActions.UPDATE_MENTOR_SUCCESS),
    tap((action: MentorAction) => this.router.navigate(['/mentor/subscriptions']))
  );

  @Effect({ dispatch: false })
  addMentorSuccess$: Observable<Action> = this.actions$.pipe(
    ofType(MentorActions.ADD_MENTOR_SUCCESS),
    tap((action: MentorAction) => this.router.navigate(['/mentor/subscriptions']))
  );

  // @Effect()
  // init$ = defer(() =>
 
  //         this.mentorDataService.getMentors(),
  //         //MentorActions.GetMentorsSuccess,
  //        // MentorActions.GetMentorsError
  //       )
      
  // @Effect()
  // navigateMentorSub$ = this.actions$.pipe(
  //   ofType(ROOT_EFFECTS_INIT),
  //   tap(c => console.log(c))
  //   // filter((r: RouterNavigationAction) => r.payload.routerState.url.endsWith('/mentor/subscriptions')),
  //   // switchMap((action) => toAction(
  //   //  this.mentorDataService.getMentors(),
  //   //   MentorActions.GetMentorsSuccess,
  //   //   MentorActions.GetMentorsError
  //   // ))
  // );
  // @Effect({ dispatch: true })
  // navigateMentorStart$: Observable<Action> = this.actions$.pipe(
  //   ofType(ROOT_EFFECTS_INIT),
  // //  filter((r: RouterNavigationAction) => r.payload.routerState.url.endsWith('/mentor')),
  //   switchMap(action => toAction(
  //     this.mentorDataService.getMentors(),
  //     MentorActions.GetMentorsSuccess,
  //     MentorActions.GetMentorsError
  //   ))
  // );

  // @Effect({ dispatch: true })
  // navigateMentorFromSub$: Observable<Action> = this.actions$.pipe(
  //   ofType(ROUTER_REQUEST),
  //   filter((r: RouterNavigationAction) => r.payload.routerState.url.endsWith('/mentor/subscriptions')),
  //   switchMap(action => toAction(
  //     this.mentorDataService.getMentors(),
  //     MentorActions.GetMentorsSuccess,
  //     MentorActions.GetMentorsError
  //   ))
  // );
  // @Effect({ dispatch: false })
  // navigateMentor$: Observable<Action> = this.actions$.pipe(
  //   ofType(APP_INITIALIZER),
  //   filter((r: RouterNavigationAction) => r.payload.routerState.url.endsWith('/mentor')),
  //   tap((action) => console.log(action))
  //   // ofType(MentorActions.GET_MENTORS),
  //   // concatMap((action: MentorAction) => 
  //   //   toAction(
  //   //     this.menteeDataService.getMentors(),
  //   //     MentorActions.GetMentorsSuccess,
  //   //     MentorActions.GetMentorsError
  //   //   )
  //   // )

  // );
  constructor(
    private router: Router,
    private actions$: Actions,
    private mentorDataService: MentorDataService
  ) { }

}
