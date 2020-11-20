import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { selectActivityState, selectMatchTypeState, selectLoadingActivity } from 'src/app/store/selectors/activity.selector';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { differenceInCalendarDays } from 'date-fns';
import { IActivity } from 'src/app/models/activity.interface';
import * as MatchActions from 'src/app/store/actions/match.actions';

import { NgForm } from '@angular/forms';
import { ExpUotDa } from 'src/app/models/exp-uot-da.interface';
import { IComment } from 'src/app/models/comment.interface';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
import { IMatchRegister } from 'src/app/models/match-register.interface';
import { selectLoadingMatch } from 'src/app/store/selectors/match.selector';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'mentorship-form',
  templateUrl: './mentorship-form.component.html',
  styleUrls: ['./mentorship-form.component.scss']
})
export class MentorshipFormComponent implements OnInit, OnDestroy {
  // @ViewChild('commentInput', { static: false }) commentInput: ElementRef;
  @ViewChild('mentormentee', { static: true }) mentormentee: NgForm;
  closedStatus: boolean = true;
  isSpinningActivity: boolean = true;
  isSpinningMatching: boolean = true;
  matchTypeId: number;
  matchFormValues: IMatchRegister;
  mentorAttendance: boolean = false;
  mentorOrientationDate: Date = null;
  menteeAttendance: boolean = false;
  menteeOrientationDate: Date = null;
  exploratoryDate: Date = null;
  activityData: IActivity;
  experiences: any;
  domainAreas: any;
  mentorshipStatus: ExpUotDa[];
  selectedMentorshipStatus: ExpUotDa;
  comments: IComment[];
  mentorshipActivityId: number;
  today = new Date();
  private unsubscribe$ = new Subject<void>();
  activityDates: Date[];
  mentorAttendanceContralState: boolean = false;
  menteeAttendanceContralState: boolean = false;
  exploratoryDateControlState: boolean = false;
  startEndDateControlState: boolean = false;
  startEndDateControlVisibility: boolean = false;
  exploratoryControlVisibility: boolean = false;
  ExporatoryError: boolean = false;
  selectedMentorshipStatusValue: string;
  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService,
    private _router: Router,
    private _notification: NzNotificationService
  ) {
    this._store.pipe(select(selectMatchTypeState)).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      id => this.matchTypeId = id
    );
    this._store.pipe(select(selectLoadingActivity)).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      loading => this.isSpinningActivity = loading
    );
    this._store.pipe(select(selectLoadingMatch)).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      loading => this.isSpinningMatching = loading
    );
    this._store.pipe(select(selectActivityState)).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => {
        this.activityData = data;
        console.log(data);
        if (this.activityData) {
          if (this.activityData['Expriences']) {
            this.experiences = this.activityData.Expriences.filter(m => m.Selected);
          }
          if (this.activityData['DomainAreas']) {
            this.domainAreas = this.activityData.DomainAreas.filter(m => m.Selected);
          }
          this.mentorshipActivityId = this.activityData.MentorshipActivityId;
          /** range dates */
          if (this.activityData['MatchRegister']) {
            const startDate = this.activityData['MatchRegister']['StartDate'];
            const endDate = this.activityData['MatchRegister']['EndDate'];
            this.exploratoryDate = this.activityData['MatchRegister']['ExplorationMeetingDate'];
            this.exploratoryDateControlState = !!this.activityData['MatchRegister']['ExplorationMeetingDate'];
            this.activityDates = startDate && endDate ? [new Date(startDate), new Date(endDate)] : [];
            this.comments = this.activityData['MatchRegister']['Comments'].filter(a => a.IsActive);
            this.mentorAttendance = this.activityData['MatchRegister']['MentorOrientationAttended'];
            this.mentorAttendanceContralState = this.activityData['MatchRegister']['MentorOrientationAttended'];
            this.mentorOrientationDate = this.activityData['MatchRegister']['MentorOrientationDate'];
            this.menteeAttendance = this.activityData['MatchRegister']['MenteeOrientationAttended'];
            this.menteeAttendanceContralState = this.activityData['MatchRegister']['MenteeOrientationAttended'];
            this.menteeOrientationDate = this.activityData['MatchRegister']['MenteeOrientationDate'];
          }
          if (this.activityData['MentorshipStatus']) {
            this.mentorshipStatus = this.activityData['MentorshipStatus'];
          }
          if (this.activityData['MentorshipStatus']) {
            this.selectedMentorshipStatus = this.activityData['MentorshipStatus'].find(m => m.Selected);
            this.selectedMentorshipStatusValue = this.selectedMentorshipStatus['Value'];
          }

        }
      }
    );
    // this.mentormentee.valueChanges.subscribe(v => console.log(v));

  }

  ngOnInit() {
    this._store.pipe(select(selectMatchTypeState)).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(id => this.matchTypeId == id);
    this.mentormentee.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(formValues => {
      if (formValues['mentorshipStatus']) {
        if (formValues['mentorshipStatus']['Name'] == 'Open') // Open
        {
          this.startEndDateControlVisibility = false;
          this.exploratoryControlVisibility = false;
          this.closedStatus = true;
        }
        if (formValues['mentorshipStatus']['Name'] == 'InProgress') // In-progress
        {
          this.exploratoryDateControlState = false;
          this.exploratoryControlVisibility = false;
          this.startEndDateControlState = false;
          this.startEndDateControlVisibility = true;
          this.closedStatus = true;
        }
        if (formValues['mentorshipStatus']['Name'] == 'Exploratory') // Exploratory when open, exploratory date can be active and added
        {
          this.exploratoryControlVisibility = true;
          this.exploratoryDateControlState = false;
          this.startEndDateControlVisibility = false;
          this.closedStatus = true;
        }
        if (formValues['mentorshipStatus']['Name'] == 'Closed' && this.closedStatus) // Closed
        {
          const startDate = this.activityData['MatchRegister']['StartDate'];
          const endDate = this.activityData['MatchRegister']['EndDate'];
          this.closedStatus = false;
          this.activityDates = startDate && endDate ? [new Date(startDate), new Date(endDate)] : [];
        }
      }
    });
  }
  // handleKeyDown(event: any) {
  //   console.log(event);
  // }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today
    return differenceInCalendarDays(current, this.today) > 0;
  };

  addField(e?: MouseEvent): void {
    console.log(this.comments);
    if (e) {
      e.preventDefault();
    };
    this.comments.push({
      MentoshipActivityId: this.mentorshipActivityId,
      CommentId: 0,
      IsActive: true,
      Comment: '',
      CreatedDateTime: new Date(),
      CreatedEmployeeId: '',
      UpdatedEmployeeId: '',
    })
  }
  removeField(i: number, form: NgForm): void {
    const ccname = `comment_${i}`;
    //   console.log(form.value[`comment_${i}`]);
    //  console.log(form.value);
    // delete form.value[`comment_${i}`];
    if (form.value[`comment_${i}`]) {
      /** open a confirm modal */
      this.onDeleteExistingComment(i, form.value[`comment_${i}`]);
    }
    if (!form.value[`comment_${i}`]) {
      this.comments.splice(i, 1);
    }

    console.log(form.value);
    console.log(this.comments);

  }

  onDeleteExistingComment(i: number, comment: string) {
    /** confirmation cancel modal dialog */
    this._modalService.confirm({
      nzTitle: `<i>Do you want to delete this comment?</i>`,
      nzContent: `<br><code>${comment}</code>`,
      nzOkText: 'Yes',
      nzCancelText: 'No',
      nzOnOk: () => this.onDeleteComment(i)
    });
  }
  onDeleteComment(i: number): void {
    this.comments.splice(i, 1);
    console.log('deleted!');
  }
  submitForm(form: NgForm): void {
    console.log("values ", form.value);
    console.log("valid ", form.valid);
    if (form.valid) {
      if (!form.value['menteeOrientationAttended']) { // can be updated anytime, once updated its disabled
        this.menteeOrientationDate = null;
      } else {
        this.menteeOrientationDate = form.value['menteeOrientationDate'];
      }
      if (!form.value['mentorOrientationAttended']) { // can be updated anytime, once updated its disabled
        this.mentorOrientationDate = null;
      } else {
        this.mentorOrientationDate = form.value['mentorOrientationDate'];
      }
      if (this.mentorshipActivityId) { // update form 
        if (form.value['mentorshipStatus']['Name'] == 'Exploratory') {// Exploratory
          if (!form.value['exploratoryPicker']) {
            this.ExporatoryError = form.invalid;
          }
          this.matchFormValues = {
            MentoshipActivityId: this.mentorshipActivityId, MenteeId: this.activityData.MenteeId, MentorId: this.activityData.MentorId, StartDate: null, EndDate: null,
            ExplorationMeetingDate: form.value['exploratoryPicker'], StatusId: +form.value['mentorshipStatus']['Value'], MenteeOrientationAttended: form.value['menteeOrientationAttended'], MentorOrientationAttended: form.value['mentorOrientationAttended'],
            MenteeOrientationDate: this.menteeOrientationDate, MentorOrientationDate: this.mentorOrientationDate, MatchTypeId: this.matchTypeId ? this.matchTypeId : 1, FinancialYrId: this.activityData['MatchRegister']['FinancialYrId'], CreatedEmployeeId: this.activityData['MatchRegister']['CreatedEmployeeId'],
            UpdatedEmployeeId: this.activityData['MatchRegister']['UpdatedEmployeeId'], CreatedDateTime: this.activityData['MatchRegister']['CreatedDateTime'], Comments: this.comments
          };
          this.ExporatoryError ? this._notification.error('Exploratory date', 'Date is required') : this._store.dispatch(new MatchActions.UpdateMentorshipActivity(this.matchFormValues));
          this.ExporatoryError = false;
        }
        if (form.value['mentorshipStatus']['Name'] == 'InProgress') {// In progress
          this.matchFormValues = {
            MentoshipActivityId: this.mentorshipActivityId, MenteeId: this.activityData.MenteeId, MentorId: this.activityData.MentorId, StartDate: form.value['rangePicker'][0], EndDate: form.value['rangePicker'][1],
            ExplorationMeetingDate: form.value['exploratoryPicker'], StatusId: +form.value['mentorshipStatus']['Value'], MenteeOrientationAttended: form.value['menteeOrientationAttended'], MentorOrientationAttended: form.value['mentorOrientationAttended'],
            MenteeOrientationDate: this.menteeOrientationDate, MentorOrientationDate: this.mentorOrientationDate, MatchTypeId: this.matchTypeId ? this.matchTypeId : 1, FinancialYrId: this.activityData['MatchRegister']['FinancialYrId'], CreatedEmployeeId: this.activityData['MatchRegister']['CreatedEmployeeId'],
            UpdatedEmployeeId: this.activityData['MatchRegister']['UpdatedEmployeeId'], CreatedDateTime: this.activityData['MatchRegister']['CreatedDateTime'], Comments: this.comments
          };
          this._store.dispatch(new MatchActions.UpdateMentorshipActivity(this.matchFormValues));
        }
        if (form.value['mentorshipStatus']['Name'] == 'Closed') {// Closed
          this.matchFormValues = {
            MentoshipActivityId: this.mentorshipActivityId, MenteeId: this.activityData.MenteeId, MentorId: this.activityData.MentorId, StartDate: form.value['rangePicker'][0], EndDate: form.value['rangePicker'][1],
            ExplorationMeetingDate: form.value['exploratoryPicker'], StatusId: +form.value['mentorshipStatus']['Value'], MenteeOrientationAttended: form.value['menteeOrientationAttended'], MentorOrientationAttended: form.value['mentorOrientationAttended'],
            MenteeOrientationDate: this.menteeOrientationDate, MentorOrientationDate: this.mentorOrientationDate, MatchTypeId: this.matchTypeId ? this.matchTypeId : 1, FinancialYrId: this.activityData['MatchRegister']['FinancialYrId'], CreatedEmployeeId: this.activityData['MatchRegister']['CreatedEmployeeId'],
            UpdatedEmployeeId: this.activityData['MatchRegister']['UpdatedEmployeeId'], CreatedDateTime: this.activityData['MatchRegister']['CreatedDateTime'], Comments: this.comments
          };
          console.log(this.matchFormValues);
          this._store.dispatch(new MatchActions.UpdateMentorshipActivity(this.matchFormValues));
        }
        if (form.value['mentorshipStatus']['Name'] == 'Open') {// Open
          this.matchFormValues = {
            MentoshipActivityId: this.mentorshipActivityId, MenteeId: this.activityData.MenteeId, MentorId: this.activityData.MentorId, StartDate: null, EndDate: null,
            ExplorationMeetingDate: form.value['exploratoryPicker'], StatusId: +form.value['mentorshipStatus']['Value'], MenteeOrientationAttended: form.value['menteeOrientationAttended'], MentorOrientationAttended: form.value['mentorOrientationAttended'],
            MenteeOrientationDate: this.menteeOrientationDate, MentorOrientationDate: this.mentorOrientationDate, MatchTypeId: this.matchTypeId ? this.matchTypeId : 1, FinancialYrId: this.activityData['MatchRegister']['FinancialYrId'], CreatedEmployeeId: this.activityData['MatchRegister']['CreatedEmployeeId'],
            UpdatedEmployeeId: this.activityData['MatchRegister']['UpdatedEmployeeId'], CreatedDateTime: this.activityData['MatchRegister']['CreatedDateTime'], Comments: this.comments
          };
          this._store.dispatch(new MatchActions.UpdateMentorshipActivity(this.matchFormValues));

        }


      } else { // save form
        console.log('Saveform ', form.value);
        if (form.value['mentorshipStatus']['Name'] == 'Open') {// Open
          this.matchFormValues = {
            MentoshipActivityId: this.mentorshipActivityId, MenteeId: this.activityData.MenteeId, MentorId: this.activityData.MentorId, StartDate: null, EndDate: null,
            ExplorationMeetingDate: null, StatusId: +form.value['mentorshipStatus']['Value'], MenteeOrientationAttended: form.value['menteeOrientationAttended'], MentorOrientationAttended: form.value['mentorOrientationAttended'],
            MenteeOrientationDate: this.menteeOrientationDate, MentorOrientationDate: this.mentorOrientationDate, MatchTypeId: this.matchTypeId, FinancialYrId: this.activityData['MatchRegister']['FinancialYrId'], CreatedEmployeeId: this.activityData['MatchRegister']['CreatedEmployeeId'],
            UpdatedEmployeeId: this.activityData['MatchRegister']['UpdatedEmployeeId'], CreatedDateTime: this.activityData['MatchRegister']['CreatedDateTime'], Comments: this.comments
          };
          if (form.value['mentorshipStatus']['Name'] == 'Open') {
            this.ExporatoryError = form.invalid;
          }
          this.ExporatoryError ? this._notification.error('Open session', 'Saving open session is not allowed') : this._store.dispatch(new MatchActions.SaveMatch(this.matchFormValues));
          this.ExporatoryError = false;
        }

        if (form.value['mentorshipStatus']['Name'] == 'Exploratory') {// Exploratory
          this.matchFormValues = {
            MentoshipActivityId: this.mentorshipActivityId, MenteeId: this.activityData.MenteeId, MentorId: this.activityData.MentorId, StartDate: null, EndDate: null,
            ExplorationMeetingDate: form.value['exploratoryPicker'], StatusId: +form.value['mentorshipStatus']['Value'], MenteeOrientationAttended: form.value['menteeOrientationAttended'], MentorOrientationAttended: form.value['mentorOrientationAttended'],
            MenteeOrientationDate: this.menteeOrientationDate, MentorOrientationDate: this.mentorOrientationDate, MatchTypeId: this.matchTypeId, FinancialYrId: this.activityData['MatchRegister']['FinancialYrId'], CreatedEmployeeId: this.activityData['MatchRegister']['CreatedEmployeeId'],
            UpdatedEmployeeId: this.activityData['MatchRegister']['UpdatedEmployeeId'], CreatedDateTime: this.activityData['MatchRegister']['CreatedDateTime'], Comments: this.comments
          };
          if (!form.value['exploratoryPicker']) {
            this.ExporatoryError = true;
          }
          //this._notification.error('Exploratory date', 'Date is required')
          this.ExporatoryError ? this._notification.error('Exploratory date', 'Date is required') : this._store.dispatch(new MatchActions.SaveMatch(this.matchFormValues));
          this.ExporatoryError = false;
        }
        if (form.value['mentorshipStatus']['Name'] == 'InProgress') {// Inprogress
          this.matchFormValues = {
            MentoshipActivityId: this.mentorshipActivityId, MenteeId: this.activityData.MenteeId, MentorId: this.activityData.MentorId, StartDate: form.value['rangePicker'][0], EndDate: form.value['rangePicker'][1],
            ExplorationMeetingDate: form.value['exploratoryPicker'], StatusId: +form.value['mentorshipStatus']['Value'], MenteeOrientationAttended: form.value['menteeOrientationAttended'], MentorOrientationAttended: form.value['mentorOrientationAttended'],
            MenteeOrientationDate: this.menteeOrientationDate, MentorOrientationDate: this.mentorOrientationDate, MatchTypeId: this.matchTypeId, FinancialYrId: this.activityData['MatchRegister']['FinancialYrId'], CreatedEmployeeId: this.activityData['MatchRegister']['CreatedEmployeeId'],
            UpdatedEmployeeId: this.activityData['MatchRegister']['UpdatedEmployeeId'], CreatedDateTime: this.activityData['MatchRegister']['CreatedDateTime'], Comments: this.comments
          };
          if (!form.value['rangePicker'][0] && !form.value['rangePicker'][1]) {
            this.ExporatoryError = true;
          }
          this.ExporatoryError ? this._notification.error('Dates', 'Start and end required') : this._store.dispatch(new MatchActions.SaveMatch(this.matchFormValues));
          this.ExporatoryError = false;
        }

        console.log(this.matchFormValues);

      }

      // ...our form is valid, we can submit the data
    }
    else {
      this._notification.error('Error', 'Invalid dates')
    }
  }
  mentorshipStatusChange(value: string) {
    //this.mentormentee
  }
  /** confirmation delete modal dialog */
  showCancelConfirm(): void {
    this._modalService.confirm({
      nzTitle: 'Are you sure want to cancel and exit?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => this.routeToList(),
      nzCancelText: 'No',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  routeToList(): void {
    this._router.navigate(['/admin/list']);
  }
  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}

