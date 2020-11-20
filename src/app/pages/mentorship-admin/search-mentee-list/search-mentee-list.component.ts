import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { Router } from '@angular/router';
import * as SubscriptionActions from 'src/app/store/actions/subscription.actions';
import { Subject } from 'rxjs';
import { IPage } from 'src/app/models/page.interface';
import { takeUntil } from 'rxjs/operators';
import { ISubscription } from 'src/app/models/subscription.interface';
import * as ActivityActions from 'src/app/store/actions/activity.actions';
import { selectSubscriptionList, selectSubscriptionPage, selectLoadingSubscription } from 'src/app/store/selectors/subscription.selector';

@Component({
  selector: 'search-mentee-list',
  templateUrl: './search-mentee-list.component.html',
  styleUrls: ['./search-mentee-list.component.scss']
})
export class SearchMenteeListComponent implements OnInit, OnDestroy {
 @Input() search: string;
  private unsubscribe$ = new Subject<void>();
  loading: boolean;
  pagingMentee: IPage;
  menteeSearch: ISubscription[];
  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
  ) { 
    this._store.pipe(select(selectSubscriptionList)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => this.menteeSearch = data
    );
    this._store.pipe(select(selectSubscriptionPage)).pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        page => this.pagingMentee = page
      );
    this._store.pipe(select(selectLoadingSubscription)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      loading => this.loading = loading
    );
  }

  ngOnInit() {
  }
  onPageSize(evt: number) {
    this.pagingMentee = { ...this.pagingMentee , pageSize: evt };
    this.getMenteeSearch();
  }
  getMenteeSearch() {
    this._store.dispatch(new SubscriptionActions.GetMenteeSearch({ searchParam: this.search, paging: this.pagingMentee }));
  }
  onPageNumber(evt: number) {
    this.pagingMentee = { ...this.pagingMentee , pageNumber: evt };
    this.getMenteeSearch();
  }
 
  onSelectMentor(mentorId: number, menteeId: number, matchTypeId: number, activityId: number) {
    /** dispatch an action */
    this._store.dispatch(new ActivityActions.GetActivity({ mentorId, menteeId, matchTypeId, activityId }));
  }
  ngOnDestroy() {
    console.log("Destroy on search");
    // document.removeEventListener('keydown', this.handleKeyDown, false);
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
