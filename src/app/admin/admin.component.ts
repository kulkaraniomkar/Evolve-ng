import { Component, OnInit } from '@angular/core';
import { MSubscriptionSelectors, EntityState } from '../store';
import { Observable, Subject } from 'rxjs';
import { MSubscription } from '../core/model/m-subscriptions';
import { Store } from '@ngrx/store';
import * as MSubscriptionAction from '../store/actions';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { MentorMatch } from '../core/model/mentor-match';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  mentees$: Observable<MSubscription[]>;
  mentorsmatch$: Observable<MentorMatch[]>;
  loading$: Observable<boolean>;
  private unsubscribe$ = new Subject<void>();
  public dataSource = new MatTableDataSource<MSubscription>();
  displayedColumns = ['fullName', 'division', 'regDate', 'autoMatch', 'manualMatch', 'extractSaved'];
  constructor(
    private store: Store<EntityState>,
    private msubscriptionSelectors: MSubscriptionSelectors) {
    this.mentorsmatch$ = this.msubscriptionSelectors.mentorsmatch$;
    this.loading$ = this.msubscriptionSelectors.loading$;
    }

  ngOnInit() {
    /**
     * Dispatch action to load matching subscriptions
     */
    this.getMenteesSubscriptions();
    /**
     * sub to the data for matching subscriptions
     */
    this.msubscriptionSelectors
    .msubscriptions$
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(msub => {
      if(msub){
        console.log(msub);
        this.dataSource.data = msub as MSubscription[];
      }
    }
      
    );

  }
  getMenteesSubscriptions(){
    this.store.dispatch(new MSubscriptionAction.GetMSubscriptions())
  }
  /* on auto match */
  onAutoMatch(menteeId){
    this.store.dispatch(new MSubscriptionAction.GetMentorsMatch(13))
  }
  /**
   *  unsubscribe to all 
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
