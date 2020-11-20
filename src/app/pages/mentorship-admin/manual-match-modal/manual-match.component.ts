import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { selectManualMatchList, selectLoadingMatch, selectMatchPage } from 'src/app/store/selectors/match.selector';
import { IManualMatch } from 'src/app/models/manual-match.interface';
import * as MentorActions from 'src/app/store/actions/mentor.action';
import { IPage } from 'src/app/models/page.interface';
import { IManualMatchesPayload, IManualSearchPayload } from 'src/app/models/match.interface';
import * as MatchActions from '../../../store/actions/match.actions';
import * as ActivityActions from 'src/app/store/actions/activity.actions';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MentorModalComponent } from 'src/app/components/emuicomponents/mentor-modal/mentor-modal.component';
// import * as MentorActions from 'src/app/store/actions/mentor.action';
// import { MentorshipMentorModalComponent } from '../mentorship-mentor-modal/mentorship-mentor-modal.component';

@Component({
  selector: 'manual-match',
  templateUrl: './manual-match.component.html',
  styleUrls: ['./manual-match.component.scss']
})
export class ManualMatchModalComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  loading: boolean;
  matchData: IManualMatch[];
  paging: IPage;
  sizeChanger: number[] = [5, 10];
  @Input() menteeId: number;
  @Input() menteeEmployeeId: number;
  @Input() menteeName : string;
  searchParam: string;
  constructor(
    private _modal: NzModalRef,
    private _store: Store<IAppState>,
    private _modalService: NzModalService
  ) {
    this._store.pipe(select(selectManualMatchList))
    this._store.pipe(select(selectManualMatchList)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => {
        if (data) {
          this.matchData = data;
        }
      });
      this._store.pipe(select(selectLoadingMatch)).pipe(takeUntil(this.unsubscribe$)).subscribe(
        loading => this.loading = loading
      );
      this._store.pipe(select(selectMatchPage)).pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (data: IPage) => {
          return this.paging = data;
        }
      );
  }

  ngOnInit() {
  }
  onSelectMentor(mentorId: number, menteeId: number, matchTypeId: number, activityId: number) {
    /** dispatch an action */
    this._store.dispatch(new ActivityActions.GetActivity({ mentorId, menteeId, matchTypeId, activityId }));
    this.destroyModal();
  }

  onViewMentor(mentorId: number, mentorName: string) {
    /** get the mentor info  */
    const _modal = this._modalService.create({
      nzTitle: mentorName,
      nzContent: MentorModalComponent,
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
      console.log('open view mentor', mentorId);
      this._store.dispatch(new MentorActions.GetMentorDetailsById(mentorId));
    });

    // Return a result when closed
    _modal.afterClose.subscribe(() => {
      /** dispatch action for mentee details */
      this._store.dispatch(new MentorActions.GetMentorDetailsByIdSuccess({ mentor: null, mentorExtra: null }));
    });

  }
  destroyModal(): void {
    /** dispatch action for mentee details */
    //  this._store.dispatch(new MenteeActions.GetMenteeByIdSuccess({ mentee: null}));
    this._modal.destroy();
  }
  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
  onPageSize(evt: number) {
    this.paging = { ...this.paging, pageSize: evt };
    this.getManualMatches();
  }
  onPageNumber(evt: number) {
    this.paging = { ...this.paging, pageNumber: evt };
    if(this.searchParam){
      this.searchManualMatches();
    }else{
      this.getManualMatches();
    }
  }
  searchManualMatches(){
    const _manualSearchPayload: IManualSearchPayload = { searchParam:this.searchParam, menteeId: this.menteeId, page:this.paging };
    this._store.dispatch(new MatchActions.SearchManualMatches(_manualSearchPayload));
  }
  getManualMatches(){
    const _manualMatchesPayload: IManualMatchesPayload = { menteeId: this.menteeId, page:this.paging }
    /** dispatch action to effect api call for manual match */
    console.log("call open");
    this._store.dispatch(new MatchActions.GetManualMatches(_manualMatchesPayload));

  }
  @HostListener('keydown', ['$event'])
  handleKeyDown(event: any) {
   
      const key = event.keyCode.toString();
      if (key === '13') {
        /** dispatch search action */       
        if(event.target.value){
          this.searchParam = event.target.value;
          const _manualSearchPayload: IManualSearchPayload = { searchParam:event.target.value, menteeId: this.menteeId, page:  { pageNumber: 1, pageSize: 5, totalItems: 0 } }
          /** dispatch action to effect api call for manual match */
          console.log("call open");
          this._store.dispatch(new MatchActions.SearchManualMatches(_manualSearchPayload));
        }
       
      }
     
  }
    /** modal mentor */
    // onMentorModal(mentorId: number, mentorName: string) {
    //   /** get the mentor info  */
    //   const _modal = this._modalService.create({
    //     nzTitle: mentorName,
    //     nzContent: MentorshipMentorModalComponent,
       
    //     nzFooter: [
    //       {
    //         label: 'Close',
    //         type: 'primary',
    //         onClick: ModalButtonOptions => {
    //           ModalButtonOptions.destroyModal();
    //         }
    //       }
    //     ]
    //   });
  
    //   _modal.afterOpen.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
    //     /** dispatch action to effect api call for mentee */
    //     console.log('open view mentor', mentorId);
    //     this._store.dispatch(new MentorActions.GetMentorById(mentorId));
    //   });
  
    //   // Return a result when closed
    //   _modal.afterClose.pipe(takeUntil(this.unsubscribe$)).subscribe(() => {
    //     /** dispatch action for mentee details */
    //     this._store.dispatch(new MentorActions.GetMentorByIdSuccess({ mentorInfo: null, mentorReg: null }));
    //   });
  
    // }

  // onSelectMentor(mentorId: number, menteeId: number, matchTypeId: number) {
  //   this.destroyModal();
  //   /** dispatch an action */
  //   this._store.dispatch(new ActivityActions.GetActivity({ mentorId, menteeId, matchTypeId, activityId: 0}));
  // }
}
