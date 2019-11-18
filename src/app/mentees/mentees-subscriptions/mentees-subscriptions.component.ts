import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState, MenteeSelectors } from '../../store';
import { Observable } from 'rxjs';
import * as MenteeAction from '../../store/actions';
import { Mentee } from '../../core/model/mentee';
import { MatDialog } from '@angular/material';
import { MenteesSignupComponent } from '../mentees-signup/mentees-signup.component';



@Component({
  selector: 'app-mentees-subscriptions',
  templateUrl: './mentees-subscriptions.component.html',
})
export class MenteesSubscriptionsComponent implements OnInit {
  
  mentees$: Observable<Mentee[]>;

  loading$: Observable<boolean>;

  displayedColumns = ['division', 'startDate', 'finishDate', 'mentor', 'shareProfile','finYear', 'actions'];

  nextPage = 0;
  constructor(
    private store: Store<EntityState>,
    private menteeSelectors: MenteeSelectors,
    private dialog: MatDialog
  ) {
    this.mentees$ = this.menteeSelectors.mentees$;
    this.loading$ = this.menteeSelectors.loading$;
  }
  ngOnInit(): void {
    this.getMentees();
  }

  getMentees() {
    this.store.dispatch(new MenteeAction.GetMentees());
  }
 
  onOpenDialog(action, title, id){
    const data = { action, title, id};
    const dialogRef = this.dialog.open(MenteesSignupComponent, {
      height: '600px',
      width: '900px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
}
