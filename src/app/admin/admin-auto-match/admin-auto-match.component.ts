import { Component, OnInit, Input } from '@angular/core';
import { MentorMatch, Matches, SavedMatch, MentorMatchInfo } from '../../core/model/mentor-match';
import { EntityState, MSubscriptionSelectors } from '../../store';
import * as SavedMatchAction from '../../store/actions';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { MentorInfoComponent } from '../mentor-info/mentor-info.component';

@Component({
  selector: 'app-admin-auto-match',
  templateUrl: './admin-auto-match.component.html',
  styleUrls: ['./admin-auto-match.component.scss']
})
export class AdminAutoMatchComponent implements OnInit {
  private _matches: MentorMatch[] = [];
  private _isDelete: boolean = false;
  private _menteeName: string = '';
  private unsubscribe$ = new Subject<void>();
  matchTitle: string = 'Mentoring matching results';
  savedMatchTitle: string = 'Saved mentoring matching results';

  @Input() get matches(): MentorMatch[] {
    return this._matches;
  }
  set matches(value: MentorMatch[]) {
    this._matches = value;
  }
  @Input() get isDelete(): boolean {
    return this._isDelete;
  }
  set isDelete(value: boolean) {
    this._isDelete = value;
  }
  @Input() get menteeName(): string {
    return this._menteeName;
  }
  set menteeName(value: string) {
    this._menteeName = value;
  }
  constructor(
    private store: Store<EntityState>,
    private adminSelectors: MSubscriptionSelectors,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }
  onSaveResults() {
    this.store.dispatch(new SavedMatchAction.AddSavedMatch(this.savedMatches()));
  }
  /** remove/delete saved results */
  onDeleteMentors() {
    this.store.dispatch(new SavedMatchAction.RemoveSavedMatch(this.savedMatches()));
  }
  /** create a savedmatch object */
  private savedMatches() {
    const matches: Matches[] = this._matches.map(m => {
      return { MentorId: m.MentorId, PercentageScore: m.PercentageScore };
    });
    const savedMatches: SavedMatch = { MenteeId: this._matches[0]['MenteeId'], Matches: matches };
    return savedMatches;
  }
  onViewMentorProfile(mentorId: number) {
    this.store.dispatch(new SavedMatchAction.GetMentorInfo(mentorId));
    /** open a dialog box showing mentor info */
    this.openMentorInfoDialog();
  }
    /** dialog box */
  openMentorInfoDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    //dialogConfig.data = mentorInfo;
    const dialogRef = this.dialog.open(MentorInfoComponent, dialogConfig);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(cancelIt => {
        if (cancelIt) {
          /** close and return to matching */
        }
      }

      )
  }

  openDialog(mentorInfo: MentorMatchInfo) {

  }

  /**
  *  unsubscribe to all 
  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
