import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { EntityState, MentorSelectors } from '../store';
import { Store } from '@ngrx/store';
import * as MentorAction from '../store/actions';
import { Observable, Subscription, merge, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MSubscription } from '../core/model/m-subscriptions';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit, OnDestroy {

  mentors$: Observable<MSubscription[]>;
  mentorRegistered$: Observable<boolean>;
  loading$: Observable<boolean>;
  sub: Subscription;
  mentorId: number;

  private unsubscribe$ = new Subject<void>();
  public dataSource = new MatTableDataSource<MSubscription>();
  displayedColumns = ['fullName', 'status', 'division', 'duration', 'startDate', 'endDate'];
  constructor(private store: Store<EntityState>,
    private mentorSelectors: MentorSelectors,
    private router: Router) {
      
      this.loading$ = this.mentorSelectors.loading$;
  }
  ngOnInit() {
    this.store.dispatch(new MentorAction.GetMentors());
    this.mentorRegistered$ = this.mentorSelectors.mentorRegistered$;
    this.mentors$ = this.mentorSelectors.mentors$;
    
    this.getAllMentorSubscriptions();
    this.getRegisteredStatus();

  }
  /** check registered and route to '/mentor' or stay in subscriptions */
  getRegisteredStatus() {
    this.mentorRegistered$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(reg => {
      console.log('reg ', reg);
      
      if (!reg) {
        this.router.navigate(['/mentor'])
      }
    }
    );
   
  }
  /* get all the mentor subscription
  * a mentor can only signup once
  * subscriptions shows history and current 
  */
  getAllMentorSubscriptions() {
    this.mentors$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(data => {
        this.dataSource.data = data as MSubscription[];
        // this.mentorId = data.length  ? data[0].MentorId : 0;
      })
  }

  /**
   *  unsubscribe to all 
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
