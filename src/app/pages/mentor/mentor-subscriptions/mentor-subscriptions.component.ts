import { Component, OnInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'src/app/models/subscription.interface';
import * as MenteeActions from 'src/app/store/actions/mentee.action';
import * as MentorActions from 'src/app/store/actions/mentor.action';
import { IPage } from 'src/app/models/page.interface';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { NzModalService } from 'ng-zorro-antd';

import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { selectMentorSubscriptionState, selectLoadingMentorSubscription, selectMentorPagingState, selectSignupStatusMentor } from 'src/app/store/selectors/mentor.selector';
import { MenteeModalComponent } from 'src/app/components/emuicomponents/mentee-modal/mentee-modal.component';
import { MentorModalComponent } from 'src/app/components/emuicomponents/mentor-modal/mentor-modal.component';
import { MentorMyModalComponent } from 'src/app/components/emuicomponents/mentor-my-modal/mentor-my-modal.component';
// import { MentorModalComponent } from 'src/app/components/emuicomponents/mentor-modal/mentor-modal.component';

@Component({
  selector: 'app-mentor-subscriptions',
  templateUrl: './mentor-subscriptions.component.html',
  styleUrls: ['./mentor-subscriptions.component.scss']
})
export class MentorSubscriptionsComponent implements OnInit, OnDestroy {

  mentorData: Array<ISubscription>;
  paging: IPage;
  loading: boolean;
  signupStatus: boolean;
  actionMode: string = null;
  isVisibleTop = false;
  sizeChanger: number[] = [5, 10];
  private unsubscribe$ = new Subject<void>();
  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService,
    private _router: Router,
  ) {
    this._store.pipe(select(selectMentorSubscriptionState)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => this.mentorData = data
    );
    this._store.pipe(select(selectLoadingMentorSubscription)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      loading => this.loading = loading
    );
    this._store.pipe(select(selectSignupStatusMentor)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      reg => this.signupStatus = reg
    );
  }

  ngOnInit() {
    this._store.pipe(select(selectMentorPagingState)).pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: IPage) => {
          return this.paging = data;
        }
      );
    this.getSubscriptions();
  }

  getSubscriptions() {
    console.log(this.paging);
    this._store.dispatch(new MentorActions.GetMentorSubscription(this.paging));
  }

  onPageSize(evt: number) {
    this.paging.pageSize = evt;
    this.getSubscriptions();
  }
  onPageNumber(evt: number) {
    this.paging.pageNumber = evt;
    this.getSubscriptions();
  }



  editMentor() {
    this._router.navigate(['/mentor/signup']);
  }
  /** mentee modal  */
  onMenteeModal(menteeId: number, menteeName: string): void {
    /** get the mentor info  */
    const _modal = this._modalService.create({
      nzTitle: menteeName,
      nzContent: MenteeModalComponent,

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
    _modal.afterClose.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      /** dispatch action for mentee details */
      this._store.dispatch(new MenteeActions.GetMenteeByIdSuccess({ mentee: null }));
    });

  }
  /** mentor modal  */
  onViewMentor(mentorId: number) {
    /** get the mentor info  */
    const _modal = this._modalService.create({
      nzTitle: 'My profile',
      nzContent: MentorMyModalComponent,
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
      /** dispatch action to effect api call for mentee */
      // console.log('open view mentor', mentorId);
      this._store.dispatch(new MentorActions.GetMentorById(mentorId));
    });

    // Return a result when closed
    _modal.afterClose.subscribe(() => {
      /** dispatch action for mentee details */
      this._store.dispatch(new MentorActions.GetMentorByIdSuccess({ mentor: null }));
    });

  }

  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
