import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAppState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { selectLoadingSubscription, selectPendingPage, selectPendingSubscriptions } from 'src/app/store/selectors/subscription.selector';
import { takeUntil } from 'rxjs/operators';
import { ISubscription } from 'src/app/models/subscription.interface';
import { IPage } from 'src/app/models/page.interface';
import { Subject } from 'rxjs';
import * as MatchActions from 'src/app/store/actions/match.actions';
import * as MenteeActions from 'src/app/store/actions/mentee.action';
import * as SubscriptionActions from 'src/app/store/actions/subscription.actions';
import { MenteeModalComponent } from 'src/app/components/emuicomponents/mentee-modal/mentee-modal.component';
import { MatchCardModalComponent } from '../match-card-modal/match-card-modal.component';
import { ManualMatchModalComponent } from '../manual-match-modal/manual-match.component';
import { selectMatchPage } from 'src/app/store/selectors/match.selector';
import { IManualMatchesPayload } from 'src/app/models/match.interface';

@Component({
  selector: 'pending-mentees',
  templateUrl: './pending-mentees.component.html'
})
export class PendingMenteesComponent implements OnInit, OnDestroy {
  pendingData: Array<ISubscription>;
  paging: IPage = { pageNumber: 1, pageSize: 5, totalItems: 0 };
  paging_manual: IPage;
  loading: boolean;
  autoMatchMenteeName: string = null;
  actionMode: string = null;
  sizeChanger: number[] = [5, 10];
  private unsubscribe$ = new Subject<void>();
  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService
  ) {
    this._store.pipe(select(selectPendingSubscriptions)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => this.pendingData = data
    );
    this._store.pipe(select(selectPendingPage)).pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: IPage) => {
          console.log(data);
          return this.paging = data;
        }
      );
    this._store.pipe(select(selectLoadingSubscription)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      loading => this.loading = loading
    );
  }

  ngOnInit() {
    this.getPendingSubscriptions();
  }
  getPendingSubscriptions() {
    console.log(this.paging);
    this._store.dispatch(new SubscriptionActions.GetPendingSubscriptions(this.paging));
  }
  onPageSize(evt: number) {
    //this.paging.pageSize = evt;
    this.paging = {...this.paging, pageSize: evt};
    this.getPendingSubscriptions();
  }
  onPageNumber(evt: number) {
    console.log(evt);
    this.paging = {...this.paging, pageNumber: evt};
    // this._store.dispatch(new SubscriptionActions.ChangePagePendingSubscriptions());
    this.getPendingSubscriptions();
  }

  /** mentee modal  */
  onMenteeModal(menteeId: number, menteeName: string): void {
    /** dispatch action for mentee details */
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
    _modal.afterClose.subscribe(() => {
      /** dispatch action for mentee details */
      this._store.dispatch(new MenteeActions.GetMenteeByIdSuccess({ mentee: null }));
    });
  }

  onExtractOrAutoMatch(menteeId: number, menteeName: string, actionMode: string) {
    this.autoMatchMenteeName = menteeName;
    this.actionMode = actionMode;
    this.onMatchModal(menteeId)
  }
  // onAutoMatch(menteeId: number, menteeName: string) {
  //   this.autoMatchMenteeName = menteeName;
  //   this.actionMode = 'auto';
  //   this.onMatchModal(menteeId)
  // }
  /** match card */
  onMatchModal(menteeId: number): void {
    /** dispatch action for mentee details */
    const _modal = this._modalService.create({
      nzTitle: this.actionMode == 'auto' ? 'Auto match results' : 'Archived match results',
      nzContent: MatchCardModalComponent,
      nzComponentParams: {
        menteeName: this.autoMatchMenteeName,
        actionMode: this.actionMode
      },
      nzWidth: 980,
      nzFooter: null
      // nzFooter: [
      //   {
      //     label: 'Close',
      //     type: 'primary',
      //     onClick: ModalButtonOptions => {
      //       ModalButtonOptions.destroyModal();
      //     }
      //   }
      // ]
    });

    _modal.afterOpen.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
      /** mode  - auto  */
      if (this.actionMode == 'auto') {
        this._store.dispatch(new MatchActions.GetAutoMatches(menteeId));
      }
       /** mode  -  saved match */
       if (this.actionMode == 'saved') {
        this._store.dispatch(new MatchActions.GetSavedMatches(menteeId));
      }
    });

    // Return a result when closed
    _modal.afterClose.subscribe(() => {
      /** dispatch action for mentee details */
      if (this.actionMode == 'auto') {
        this._store.dispatch(new MenteeActions.GetMenteeByIdSuccess({ mentee: null }));
      }

    });
  }

   /** manual match modal */
   onManualMatch(menteeId: number, menteeName: string, menteeEmployeeId: number): void {
    /** dispatch action for mentee details */

    console.log('Modal mentee ', menteeId);
    const _modal = this._modalService.create({
      nzTitle: "Manual match results",
      nzContent: ManualMatchModalComponent,
      nzComponentParams: {
        menteeId: menteeId,
        menteeEmployeeId: menteeEmployeeId,
        menteeName: menteeName,
      },
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
      this._store.pipe(select(selectMatchPage)).pipe(takeUntil(this.unsubscribe$))
        .subscribe(
          (data: IPage) => {
            this.paging_manual = data;
          }
        );
      const _manualMatchesPayload: IManualMatchesPayload = { menteeId, page: this.paging_manual }
      /** dispatch action to effect api call for manual match */
      console.log("call open");
      this._store.dispatch(new MatchActions.GetManualMatches(_manualMatchesPayload));
    });

    // Return a result when closed
    _modal.afterClose.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(() => {
      /** dispatch action for mentee details */
      this._store.dispatch(new MatchActions.GetManualMatchesSuccess({ manualMenteeMatches: null, page: { pageNumber: 1, pageSize: 5, totalItems: 0 } }));
    });

  }
  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
