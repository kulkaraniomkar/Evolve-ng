import { Component, OnInit, OnDestroy } from '@angular/core';
import { EntityState, MentorSelectors } from '../store';
import { Store } from '@ngrx/store';
import * as MentorAction from '../store/actions';
import { Observable, Subscription, merge, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MSubscription } from '../core/model/m-subscriptions';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit, OnDestroy {

  mentors$: Observable<MSubscription[]>;
  loading$: Observable<boolean>;
  sub: Subscription;

  private unsubscribe$ = new Subject<void>();
  public dataSource = new MatTableDataSource<MSubscription>();
  displayedColumns = ['fullName', 'division', 'duration', 'startDate', 'finishDate', 'mentor', 'actions'];
  constructor(private store: Store<EntityState>,
    private mentorSelectors: MentorSelectors) {
   
  }
  ngOnInit() {
    this.store.dispatch(new MentorAction.GetMentors());
    this.getAllMentorSubscriptions();

    this.mentors$ = this.mentorSelectors.mentors$;
    this.loading$ = this.mentorSelectors.loading$;

     this.mentors$
      .pipe(
       takeUntil(this.unsubscribe$)
      )
      .subscribe(data => {
        this.dataSource.data = data as MSubscription[];
      })
  }
  /* get all the mentor subscription
  * a mentor can only signup once
  * subscriptions shows history and current 
  */
  getAllMentorSubscriptions() {
    this.mentors$ = this.mentorSelectors.mentors$;
    this.loading$ = this.mentorSelectors.loading$;
  }

  /**
   *  unsubscribe to all 
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
