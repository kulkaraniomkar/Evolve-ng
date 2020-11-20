import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import * as SubscriptionActions from 'src/app/store/actions/subscription.actions';
import * as MentorActions from 'src/app/store/actions/mentor.action';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ISubscription } from 'src/app/models/subscription.interface';
import { Subject } from 'rxjs';
import { MentorModalComponent } from 'src/app/components/emuicomponents/mentor-modal/mentor-modal.component';
import { takeUntil } from 'rxjs/operators';
import { IPage } from 'src/app/models/page.interface';
import { selectUnAllocatedMentors, selectUnAllocatedMentorsPage, selectLoadingSubscription } from 'src/app/store/selectors/subscription.selector';

@Component({
  selector: 'unallocated-mentors',
  templateUrl: './unallocated-mentors.component.html',
  styleUrls: ['./unallocated-mentors.component.scss']
})
export class UnallocatedMentorsComponent implements OnInit, OnDestroy, OnChanges {
  // private _search: string;
  // @Input() get searchStr(): string {
  //     return this._search;
  // }
  // set searchStr(value: string) {
  //     if (value) {
  //       this._search = value;
  //     }
  // }
  @Input() searchStr: string;
  unAllocatedMentors: Array<ISubscription>;
  pagingUnallocated: IPage = { pageNumber: 1, pageSize: 5, totalItems: 0 };
  loading: boolean;
  sizeChanger: number[] = [5, 10];
  private unsubscribe$ = new Subject<void>();
  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService
  ) {
    this._store.pipe(select(selectUnAllocatedMentors)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => this.unAllocatedMentors = data
    );
    this._store.pipe(select(selectLoadingSubscription)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      loading => this.loading = loading
    );
    this._store.pipe(select(selectUnAllocatedMentorsPage)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      page => this.pagingUnallocated = page
    );
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      this.searchStr = changedProp.currentValue;
      this.searchUnallocated(this.searchStr);
    }
  }
  ngOnInit() {
   // console.log(this.searchStr);
    if (!this.searchStr) {
      this.getSubscriptions();
    }
  }
  searchUnallocated(searchStr: string) {
    this._store.dispatch(new SubscriptionActions.SearchUnallocatedSubscriptions({ searchParam: searchStr, paging: this.pagingUnallocated }));
 
  }

  getSubscriptions() {
    this._store.dispatch(new SubscriptionActions.GetUnallocatedSubscriptions(this.pagingUnallocated));
  }
  onPageNumber(evt: number) {
    this.pagingUnallocated = { ...this.pagingUnallocated, pageNumber: evt };
    if (!this.searchStr) {
      this.getSubscriptions();
    }else{
      this.searchUnallocated(this.searchStr);
    }
  }
  onPageSize(evt: number) {
    this.pagingUnallocated = { ...this.pagingUnallocated, pageSize: evt };
    if (!this.searchStr) {
      this.getSubscriptions();
    }else{
      this.searchUnallocated(this.searchStr);
    }
  }
  /** mentor modal  */
  onMentorModal(mentorId: number, mentorName: string) {
    /** get the mentor info  */
    const _modal = this._modalService.create({
      nzTitle: mentorName,
      nzContent: MentorModalComponent,
      nzWidth: 720,
      nzFooter: [
        {
          label: 'Close',
          type: 'primary',
          onClick: ModalButtonOptions => {
            ModalButtonOptions.destroyModal();
          }
        }
      ]
    });

    _modal.afterOpen.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      /** dispatch action to effect api call for mentor */
      this._store.dispatch(new MentorActions.GetMentorDetailsById(mentorId));
    });

    // Return a result when closed
    _modal.afterClose.subscribe(() => {
      /** dispatch action for mentor details */
      this._store.dispatch(new MentorActions.GetMentorDetailsByIdSuccess({ mentor: null, mentorExtra: null }));
    });

  }

  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
