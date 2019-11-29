import { Component, OnInit } from '@angular/core';
import { MentorSelectors, EntityState } from '../../store';
import { MatDialog } from '@angular/material';
import { MSubscription } from '../../core/model/m-subscriptions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as MentorAction from '../../store/actions';
import { MentorsSignupComponent } from '../mentors-signup/mentors-signup.component';

@Component({
  selector: 'app-mentors-subscriptions',
  templateUrl: './mentors-subscriptions.component.html',
  styleUrls: ['./mentors-subscriptions.component.scss']
})
export class MentorsSubscriptionsComponent implements OnInit {
    title = 'Mentor Subscriptions';
    mentors$: Observable<MSubscription[]>;
    loading$: Observable<boolean>;
    displayedColumns = ['fullName', 'division', 'duration', 'startDate', 'finishDate', 'mentor', 'actions'];
    constructor(
        private store: Store<EntityState>,
        private mentorSelectors: MentorSelectors,
        public dialog: MatDialog) {
        this.mentors$ = this.mentorSelectors.mentors$;
        this.loading$ = this.mentorSelectors.loading$;
    }

    ngOnInit(){ 
        this.getMentors();
    }

    getMentors() {
        this.store.dispatch(new MentorAction.GetMentors());
    }
    openDialog(action, obj) {
        // obj.action = action;
        const dialogRef = this.dialog.open(MentorsSignupComponent, {
          width: '800px',
          height: '700px',
          data:obj
        });
     
        dialogRef.afterClosed();
      }
}