import { Component, OnInit, Input } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectLoadingMatch, selectMatchList, selectErrorMatch } from 'src/app/store/selectors/match.selector';
import { takeUntil } from 'rxjs/operators';
import * as MentorActions from 'src/app/store/actions/mentor.action';
import { IAppState } from 'src/app/store/state/app.state';
import { Subject } from 'rxjs';
import { IMatch, IMatchesCreate } from 'src/app/models/match.interface';
import { NzModalService, NzModalRef } from 'ng-zorro-antd';
import * as MatchActions from 'src/app/store/actions/match.actions';
import { MentorModalComponent } from 'src/app/components/emuicomponents/mentor-modal/mentor-modal.component';
import * as ActivityActions from 'src/app/store/actions/activity.actions';
import { selectLoadingActivity } from 'src/app/store/selectors/activity.selector';
@Component({
  selector: 'app-match-card-modal',
  templateUrl: './match-card-modal.component.html',
  styleUrls: ['./match-card-modal.component.scss']
})
export class MatchCardModalComponent implements OnInit {

  private _menteeName: string = null;
  private _actionMode: string = null;
  @Input() get menteeName(): string {
    return this._menteeName;
  }
  set menteeName(value: string) {
    if (value) {
      this.selectedMenteeName = this._menteeName = value;
    }
  }
  @Input() get actionMode(): string {
    return this._actionMode;
  }
  set actionMode(value: string) {
    if (value) {
      this.selectedActionMode = this._actionMode = value;
    }
  }

  selectedMenteeName: string = null;
  selectedActionMode: string = null;
  errorMatch: string = null;
  autoMatchData: Array<IMatch>;
  loadingMatch: boolean;
  loadingActivity: boolean;
  background = "assets/images/photos/4.jpeg";
  private unsubscribe$ = new Subject<void>();
  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService,
    private _modal: NzModalRef,
  ) {
    this._store.pipe(select(selectMatchList)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.autoMatchData = data;
        }
      }
    );
    this._store.pipe(select(selectLoadingMatch)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      loading => this.loadingMatch = loading
    );
    this._store.pipe(select(selectErrorMatch)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      err => this.errorMatch = err
    );

    this._store.pipe(select(selectLoadingActivity)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      loading => this.loadingActivity = loading
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
      /** dispatch action to effect api call for mentor */
      console.log('open view mentor', mentorId);
      this._store.dispatch(new MentorActions.GetMentorDetailsById(mentorId));
    });

    // Return a result when closed
    _modal.afterClose.subscribe(() => {
      /** dispatch action for mentor details */
      this._store.dispatch(new MentorActions.GetMentorDetailsByIdSuccess({ mentor: null, mentorExtra: null }));
    });

  }
  // onSelectMentor(mentorId: number, menteeId: number, matchTypeId: number, activityId: number) {
  //   /** dispatch an action */
  //   this._store.dispatch(new ActivityActions.GetActivity({ mentorId, menteeId, matchTypeId, activityId }));
  // }
  /** delete the match on server */
  onDelete() {

  }
  /** cancel match and return to list */
  onCancel() {
    this._store.dispatch(new MatchActions.GetAutoMatchesSuccess({ matches: null, error: null }));
    this.destroyModal();
  }
  /** save match for later retrieval */
  onSave(menteeId: number) {
    const tempSaveMatch: IMatchesCreate = {
      MenteeId: menteeId, Matches: this.autoMatchData.map(m => {
        return { MentorId: m.MentorId, PercentageScore: m.PercentageScore }
      })
    };

    this._store.dispatch(new MatchActions.SaveAutoMatches(tempSaveMatch));
    console.log(this.errorMatch);
    if (!this.errorMatch && this.loadingMatch) {
      this.destroyModal();
    }

  }

  /** confirmation cancel modal dialog */
  showCancelConfirm(): void {
    this._modalService.confirm({
      nzTitle: `<i>Do you want to cancel these matches?</i>`,
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOnOk: () => this.onCancel()
    });
  }

  /** confirmation delete modal dialog */
  showDeleteConfirm(menteeId: number): void {
    console.log(menteeId);
    this._modalService.confirm({
      nzTitle: 'Are you sure to delete this archived matches?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteArchivedMatches(menteeId)
      , nzCancelText: 'No',
      nzOnCancel: () => this.destroyModal()
    });
  }
  deleteArchivedMatches(menteeId: number): void {
    this._store.dispatch(new MatchActions.DeleteSavedMatches(menteeId));
    if (!this.errorMatch && this.loadingMatch) {
      console.log(this.errorMatch);
      this.destroyModal();
    }
  }

  destroyModal(): void {
    console.log("Cancelled modal");
    /** dispatch action for mentee details */
    // this._store.dispatch(new MenteeActions.GetMenteeByIdSuccess({ mentee: null}));
    this._modal.destroy();
  }


  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
