import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { IAllocatedMentor, IMentorMentees } from 'src/app/models/subscription.interface';
import { IPage } from 'src/app/models/page.interface';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import * as SubscriptionActions from 'src/app/store/actions/subscription.actions';
import { selectAllocatedMentors, selectLoadingSubscription, selectMenteesPerMentor, selectMenteesPerMentorPage, selectAllocatedMentorsPage, selectLoadingMenteesPerMentor } from 'src/app/store/selectors/subscription.selector';

@Component({
  selector: 'allocated-mentors',
  templateUrl: './allocated-mentors.component.html',
  styleUrls: ['./allocated-mentors.component.scss']
})
export class AllocatedMentorsComponent implements OnInit {
  @Input() searchStr: string;
  /** Outer table */
  allocatedMentors: Array<IAllocatedMentor>;
  paging: IPage;
  loading: boolean;
  sizeChanger: number[] = [5, 10];
  /** nested table */
  menteesPerMentor: Array<IMentorMentees>;
  pagingNested: IPage;
  loadingMenteesPerMentor: boolean;
  selectedMentorId: number;

  constructor(
    private _store: Store<IAppState>,
  ) {
    this._store.pipe(select(selectAllocatedMentors)).subscribe(
      data => {
        if (data) {
          this.allocatedMentors = data;
        }
      }
    );
    this._store.pipe(select(selectAllocatedMentorsPage)).subscribe(
      data => {
        if (data) {
          this.paging = data;
        }
      }
    );
    this._store.pipe(select(selectMenteesPerMentor)).subscribe(
      data => {
        if (data) {
          this.menteesPerMentor = data;
        }
      }
    );
    this._store.pipe(select(selectMenteesPerMentorPage)).subscribe(
      data => {
        if (data) {
          this.pagingNested = data;
        }
      }
    );

    this._store.pipe(select(selectLoadingSubscription)).subscribe(
      loading => this.loading = loading
    );
    this._store.pipe(select(selectLoadingMenteesPerMentor)).subscribe(
      loading => this.loadingMenteesPerMentor = loading
    );
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      this.searchStr = changedProp.currentValue;
      this.searchAllocated(this.searchStr);
    }
  }
  searchAllocated(searchStr: string) {
    this._store.dispatch(new SubscriptionActions.SearchAllocatedSubscriptions({ searchParam: searchStr, paging: this.paging }));
   }
  ngOnInit() {
    if (!this.searchStr) {
      this.getAllocatedMentors();
    }
  }
  getAllocatedMentors() {
    this._store.dispatch(new SubscriptionActions.GetAllocatedMentors(this.paging));
  }
  onExpandChange(mentorId: number, expand: boolean) {
    this._store.dispatch(new SubscriptionActions.SetAllocatedMentorsExpand({ mentorId, expand: !expand }));
    if (mentorId != this.selectedMentorId) {
      this.pagingNested = { pageNumber: 1, pageSize: 5, totalItems: 0 };
    }
    if (!expand) {
      this.getMenteesPerMentorId(mentorId);
    }
  }
  onPageNumberMentors(evt: number) {
    this.paging = { ...this.paging, pageNumber: evt };
    this.getAllocatedMentors();
  }
  onPageNumberNested(evt: number) {
    this.pagingNested = { ...this.pagingNested, pageNumber: evt };
    this.getMenteesPerMentorId(this.selectedMentorId)
  }
  getMenteesPerMentorId(mentorId: number) {
    this.selectedMentorId = mentorId;
    const payload = { mentorId, paging: { ...this.pagingNested } };
    this._store.dispatch(new SubscriptionActions.GetMenteesPerMentor(payload))
  }

}
