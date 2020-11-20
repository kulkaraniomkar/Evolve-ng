import { Component, OnInit } from '@angular/core';
import * as MenteeActions from 'src/app/store/actions/mentee.action';
import * as MentorActions from 'src/app/store/actions/mentor.action';
import { ISubscription } from 'src/app/models/subscription.interface';
import { IPage } from 'src/app/models/page.interface';
import { Subject, Observable } from 'rxjs';
import { IAppState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { selectMenteeSubscriptionState, selectSignupStatusMentee, selectLoadingMentee, selectMenteePagingState } from 'src/app/store/selectors/mentee.selector';
import { MenteeModalComponent } from 'src/app/components/emuicomponents/mentee-modal/mentee-modal.component';
import { MentorMyModalComponent } from 'src/app/components/emuicomponents/mentor-my-modal/mentor-my-modal.component';

@Component({
  selector: 'app-mentee-subscriptions',
  templateUrl: './mentee-subscriptions.component.html',
  styleUrls: ['./mentee-subscriptions.component.scss']
})
export class MenteeSubscriptionsComponent implements OnInit {

  menteeData: Array<ISubscription>;
  paging: IPage;
  //loading: boolean;
  loading$: Observable<boolean>;
  signupStatus: boolean;
  actionMode: string = null;
  isVisibleTop = false;
  sizeChanger: number[] = [5, 10];
  private unsubscribe$ = new Subject<void>();
  viewMenteeId: number;
  viewMenteeIdInprogress: number;
  viewMenteeIdExploratory: number;
  viewMenteeIdSession: number;
  viewMenteeIdClosed: number;
  viewMenteeFnameSession: string;
  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService,
    private _router: Router,
  ) {
    this._store.pipe(select(selectMenteeSubscriptionState)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => {
        this.menteeData = data;
        if (this.menteeData) {
          const viewMentee = this.menteeData.find(a => a.Status == 'Open');
          const viewMenteeInProgress = this.menteeData.find(a => a.Status == 'In-Progress');
          const viewMenteeExploratory = this.menteeData.find(a => a.Status == 'Exploratory');
          const viewMenteeClosed = this.menteeData.find(a => a.Status == 'Closed');
          if (viewMentee) {
            this.viewMenteeId = viewMentee['MenteeId'];
            this.viewMenteeIdSession = viewMentee['MenteeId'];
            this.viewMenteeFnameSession = viewMentee['FullName'];
          }
          if (viewMenteeInProgress) {
            this.viewMenteeIdSession = viewMenteeInProgress['MenteeId'];
            this.viewMenteeFnameSession = viewMenteeInProgress['FullName'];
          }
          if (viewMenteeExploratory) {
            this.viewMenteeIdSession = viewMenteeExploratory['MenteeId'];
            this.viewMenteeFnameSession = viewMenteeExploratory['FullName'];
          }
          if (viewMenteeClosed) {
            this.viewMenteeIdClosed = viewMenteeClosed['MenteeId'];
          }
          console.log(this.viewMenteeIdSession);
        }


      }
    );
    this.loading$ = this._store.pipe(select(selectLoadingMentee));

    // this._store.pipe(select(selectLoadingMentee)).pipe(takeUntil(this.unsubscribe$)).subscribe(
    //   loading => this.loading = loading
    // );
    this._store.pipe(select(selectSignupStatusMentee)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      reg => this.signupStatus = reg
    );
  }

  ngOnInit() {
    selectMenteePagingState
    this._store.pipe(select(selectMenteePagingState)).pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: IPage) => {
          console.log("Paging ", data);
          this.paging = data;
          // data['PageNumber'] ?  this.paging = data : this.paging = { pageNumber : 1, pageSize: 5, totalItems: 0 };

        }
      );
    this.getSubscriptions();
  }

  getSubscriptions() {
    console.log(this.paging);
    this._store.dispatch(new MenteeActions.GetMenteeSubscription(this.paging));
  }

  onPageSize(evt: number) {
    // this.viewMenteeId = 0;
    this.paging.pageSize = evt;
    this.getSubscriptions();
  }
  onPageNumber(evt: number) {
    this.paging.pageNumber = evt;
    // this.viewMenteeId = 0;
    this.getSubscriptions();
  }

  onSignUp(menteeId: number) {
    this.editMentee(menteeId);
  }

  editMentee(menteeId: number) {
    this._store.dispatch(new MenteeActions.GetMenteeById(menteeId));
    this.loading$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => {
        //console.log(data);
        if (!data) {
          this._router.navigate(['/mentee/signup']);
        }
      }
    )

    // this._router.navigate(['/mentorship-mentee/signup']);
  }
  /** mentee modal  */
  onMenteeModal(menteeId: number, menteeName: string): void {
    /** get the mentee info  */
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
  onViewMentor(mentorId: number, mentorFullname: string) {
    /** get the mentor info  */
    const _modal = this._modalService.create({
      nzTitle: mentorFullname,
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
