import { Component, OnInit, OnDestroy, Input, SimpleChange } from '@angular/core';
import { IAppState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import * as SubscriptionActions from 'src/app/store/actions/subscription.actions';
import * as MenteeActions from 'src/app/store/actions/mentee.action';
import * as MentorActions from 'src/app/store/actions/mentor.action';
import { ISubscription } from 'src/app/models/subscription.interface';
import { IPage } from 'src/app/models/page.interface';
import { Subject } from 'rxjs';
import { selectExploratory, selectLoadingSubscription, selectExploratoryPage } from 'src/app/store/selectors/subscription.selector';
import { takeUntil } from 'rxjs/operators';
import { MenteeModalComponent } from 'src/app/components/emuicomponents/mentee-modal/mentee-modal.component';
import { MentorModalComponent } from 'src/app/components/emuicomponents/mentor-modal/mentor-modal.component';
import * as ActivityActions from 'src/app/store/actions/activity.actions';

@Component({
  selector: 'exploratory-mentorship',
  templateUrl: './exploratory-mentorship.component.html',
  styleUrls: ['./exploratory-mentorship.component.scss']
})
export class ExploratoryMentorshipComponent implements OnInit, OnDestroy {
  @Input() searchStr: string;
  exploratoryMentorship: Array<ISubscription>;
  pagingExploratory: IPage = { pageNumber: 1, pageSize: 5, totalItems: 0 };
  loading: boolean;
  sizeChanger: number[] = [5, 10];
  private unsubscribe$ = new Subject<void>();
  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService
  ) {
    this._store.pipe(select(selectExploratory)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => this.exploratoryMentorship = data
    );
    this._store.pipe(select(selectExploratoryPage)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      page => this.pagingExploratory = page
    );
    this._store.pipe(select(selectLoadingSubscription)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      loading => this.loading = loading
    );
  }
  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    for (let propName in changes) {
      let changedProp = changes[propName];
      this.searchStr = changedProp.currentValue;
      this.searchExploratory(this.searchStr);
    }
  }
  ngOnInit() {
    if (!this.searchStr) {
      this.getSubscriptions();
    }
  }
  searchExploratory(searchStr: string) {
    this._store.dispatch(new SubscriptionActions.SearchExploratorySubscriptions({ searchParam: searchStr, paging: this.pagingExploratory }));
 
  }
  onPageNumber(evt: number) {
    this.pagingExploratory = { ...this.pagingExploratory, pageNumber: evt };
    this.getSubscriptions();
  }
  onPageSize(evt: number) {
    this.pagingExploratory = { ...this.pagingExploratory, pageSize: evt };
    this.getSubscriptions();
  }
  getSubscriptions() {
    this._store.dispatch(new SubscriptionActions.GetExploratorySubscriptions(this.pagingExploratory));
  }
  /** mentee modal  */
  onMenteeModal(menteeId: number, menteeName: string): void {
    /** dispatch action for mentee details */
    const _modal = this._modalService.create({
      nzTitle: menteeName,
      nzContent: MenteeModalComponent,
      nzWidth: 680,
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
      /** dispatch action to effect api call for mentee */
      this._store.dispatch(new MenteeActions.GetMenteeById(menteeId));
    });

    // Return a result when closed
    _modal.afterClose.subscribe(() => {
      /** dispatch action for mentee details */
      this._store.dispatch(new MenteeActions.GetMenteeByIdSuccess({ mentee: null }));
    });
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

  updateExploratory(mentorId: number, menteeId: number, matchTypeId: number, activityId: number) {
    /** dispatch an action */
    this._store.dispatch(new ActivityActions.GetActivity({ mentorId, menteeId, matchTypeId, activityId }));
  }
  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
