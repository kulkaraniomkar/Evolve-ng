import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MentorInfo, MentorMatchInfo } from '../../core/model/mentor-match';
import { EntityState, MSubscriptionSelectors } from '../../store';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';

@Component({
  selector: 'app-mentor-info',
  templateUrl: './mentor-info.component.html',
  styleUrls: ['./mentor-info.component.scss']
})
export class MentorInfoComponent implements OnInit {
 // mentorinfo: MentorMatchInfo = null;
  loading$: Observable<boolean>;
  mentorinfo$: Observable<MentorMatchInfo>;
  private unsubscribe$ = new Subject<void>();
  constructor(
    private dialogRef: MatDialogRef<MentorInfoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private adminSelectors: MSubscriptionSelectors,
  ) { 
    this.mentorinfo$ = this.adminSelectors.mentorinfo$
    this.loading$ = this.adminSelectors.loading$;
  }
  ngOnInit() {
   
  }

  ok() {
    this.dialogRef.close(true);
  }

  cancel() {
    this.dialogRef.close(false);
  }
  /**
  *  unsubscribe to all 
  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
