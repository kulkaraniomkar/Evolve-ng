import { Injectable } from '@angular/core';
import { SubscriptionService } from 'src/app/services/subscription.service';
import * as SubscriptionActions from 'src/app/store/actions/subscription.actions';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { ESubscriptionActions } from 'src/app/store/actions/subscription.actions';
import { mergeMap, switchMap, catchError } from 'rxjs/operators';
import { IAllocatedMentorService, IPendingMenteesService, IUnallocatedMentorsService, IExploratoryMentorshipService, ISubscriptionService } from 'src/app/models/http-models/subscription-http.interface';
import { IMenteesPerMentorService } from 'src/app/models/subscription.interface';

@Injectable()
export class SubscriptionEffects {

    @Effect() getPendingSubscriptions$: Observable<Action> = this._actions$.pipe(
        ofType<SubscriptionActions.GetPendingSubscriptions>(ESubscriptionActions.GET_PENDING_SUBSCRIPTIONS),
        switchMap((action: SubscriptionActions.GetPendingSubscriptions) => this._subscriptionService.getPendingSubscriptions(action.payload)
            .pipe(
                mergeMap(
                    (subscriptionService: IPendingMenteesService) => of(new SubscriptionActions.GetPendingSubscriptionsSuccess(subscriptionService))
                ),
                catchError(err => {
                    return of(new SubscriptionActions.GetPendingSubscriptionsError(err));
                })
            )
        ))
    @Effect() getAllocatedMentors$: Observable<Action> = this._actions$.pipe(
        ofType<SubscriptionActions.GetAllocatedMentors>(ESubscriptionActions.GET_ALLOCATED_MENTORS_SUBSCRIPTIONS),
        switchMap((action: SubscriptionActions.GetAllocatedMentors) => this._subscriptionService.getAllocatedMentor(action.payload)
            .pipe(
                mergeMap(
                    (subscriptionService: IAllocatedMentorService) => of(new SubscriptionActions.GetAllocatedMentorsSuccess(subscriptionService))
                ),
                catchError(err => {
                    return of(new SubscriptionActions.GetAllocatedMentorsError(err));
                })
            )
        ))

    @Effect() getMenteesPerMentorById$: Observable<Action> = this._actions$.pipe(
        ofType<SubscriptionActions.GetMenteesPerMentor>(ESubscriptionActions.GET_MENTEES_PER_MENTOR),
        switchMap((action: SubscriptionActions.GetMenteesPerMentor) => this._subscriptionService.getMenteesPerMentor(action.payload.mentorId, action.payload.paging)
            .pipe(
                mergeMap(
                    (menteesPerMentorService: IMenteesPerMentorService) => of(new SubscriptionActions.GetMenteesPerMentorSuccess(menteesPerMentorService))
                ),
                catchError(err => {
                    return of(new SubscriptionActions.GetMenteesPerMentorError(err));
                })
            )
        ))
    @Effect() getUnallocatedSubscriptions$: Observable<Action> = this._actions$.pipe(
        ofType<SubscriptionActions.GetUnallocatedSubscriptions>(ESubscriptionActions.GET_UNALLOCATED_SUBSCRIPTIONS),
        switchMap((action: SubscriptionActions.GetUnallocatedSubscriptions) => this._subscriptionService.getUnAllocatedSubscriptions(action.payload)
            .pipe(
                mergeMap(
                    (subscriptionService: IUnallocatedMentorsService) => of(new SubscriptionActions.GetUnallocatedSubscriptionsSuccess(subscriptionService))
                ),
                catchError(err => {
                    return of(new SubscriptionActions.GetUnallocatedSubscriptionsError(err));
                })
            )
        ))
    @Effect() getExploratorySubscriptions$: Observable<Action> = this._actions$.pipe(
        ofType<SubscriptionActions.GetExploratorySubscriptions>(ESubscriptionActions.GET_EXPLORATORY_SUBSCRIPTIONS),
        switchMap((action: SubscriptionActions.GetExploratorySubscriptions) => this._subscriptionService.getExploratorySubscriptions(action.payload)
            .pipe(
                mergeMap(
                    (subscriptionService: IExploratoryMentorshipService) => of(new SubscriptionActions.GetExploratorySubscriptionsSuccess(subscriptionService))
                ),
                catchError(err => {
                    return of(new SubscriptionActions.GetExploratorySubscriptionsError(err));
                })
            )
        ))
    @Effect() getMenteeSearch$: Observable<Action> = this._actions$.pipe(
        ofType<SubscriptionActions.GetMenteeSearch>(ESubscriptionActions.GET_MENTEE_SEARCH),
        switchMap((action: SubscriptionActions.GetMenteeSearch) => this._subscriptionService.getMenteeSearch(action.payload.searchParam, action.payload.paging)
            .pipe(
                mergeMap(
                    (searchService: ISubscriptionService) => of(new SubscriptionActions.GetMenteeSearchSuccess(searchService))
                ),
                catchError(err => {
                    return of(new SubscriptionActions.GetMenteeSearchError(err));
                })
            )
        ))
    @Effect() getSearchUnallocated$: Observable<Action> = this._actions$.pipe(
        ofType<SubscriptionActions.SearchUnallocatedSubscriptions>(ESubscriptionActions.SEARCH_UNALLOCATED_SUBSCRIPTIONS),
        switchMap((action: SubscriptionActions.SearchUnallocatedSubscriptions) => this._subscriptionService.getSearchUnallocated(action.payload.searchParam, action.payload.paging)
            .pipe(
                mergeMap(
                    (searchService: IUnallocatedMentorsService) => of(new SubscriptionActions.SearchUnallocatedSubscriptionsSuccess(searchService))
                ),
                catchError(err => {
                    return of(new SubscriptionActions.SearchUnallocatedSubscriptionsError(err));
                })
            )
        ))
    @Effect() getSearchExploratory$: Observable<Action> = this._actions$.pipe(
        ofType<SubscriptionActions.SearchExploratorySubscriptions>(ESubscriptionActions.SEARCH_EXPLORATORY_SUBSCRIPTIONS),
        switchMap((action: SubscriptionActions.SearchExploratorySubscriptions) => this._subscriptionService.getSearchExploratory(action.payload.searchParam, action.payload.paging)
            .pipe(
                mergeMap(
                    (searchService: IExploratoryMentorshipService) => of(new SubscriptionActions.SearchExploratorySubscriptionsSuccess(searchService))
                ),
                catchError(err => {
                    return of(new SubscriptionActions.SearchExploratorySubscriptionsError(err));
                })
            )
        ))
        @Effect() getSearchAllocated$: Observable<Action> = this._actions$.pipe(
            ofType<SubscriptionActions.SearchAllocatedSubscriptions>(ESubscriptionActions.SEARCH_ALLOCATED_SUBSCRIPTIONS),
            switchMap((action: SubscriptionActions.SearchAllocatedSubscriptions) => this._subscriptionService.getSearchAllocated(action.payload.searchParam, action.payload.paging)
              .pipe(
                mergeMap(
                  (searchService: IAllocatedMentorService) => of(new SubscriptionActions.SearchAllocatedSubscriptionsSuccess(searchService))
                ),
                catchError(err => {
                  return of(new SubscriptionActions.SearchAllocatedSubscriptionsError(err));
                })
              )
            ))
 

    constructor(
        private _subscriptionService: SubscriptionService,
        private _actions$: Actions
    ) { }
}