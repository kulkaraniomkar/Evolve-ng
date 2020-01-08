import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EntityState, MSubscriptionSelectors } from '../../store';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import * as MSubscriptionAction from '../../store/actions';
import { Observable, Subject } from 'rxjs';
import { MSubscription } from '../../core/model/m-subscriptions';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-admin-manage',
  templateUrl: './admin-manage.component.html',
  styleUrls: ['./admin-manage.component.scss']
})
export class AdminManageComponent implements OnInit, OnDestroy {
  searchForm = this.formBuilder.group({
    fullName: ['', Validators.required]
  });
  mentees$: Observable<MSubscription[]>;
  loading$: Observable<boolean>;
  public dataSource = new MatTableDataSource<MSubscription>();
  displayedColumns = ['finYear', 'menteeFullName', 'mentorFullName', 'status', 'startDate', 'finishDate', 'action'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  private unsubscribe$ = new Subject<void>();
  constructor(
    private store: Store<EntityState>,
    private menteeSelectors: MSubscriptionSelectors,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
   // this.mentees$ = this.menteeSelectors.msubscriptions$;
    this.loading$ = this.menteeSelectors.loading$;
   }

  ngOnInit() {
    /**
     * sub to the data for matching subscriptions
     */
    this.menteeSelectors
    .msubscriptions$
    .pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      mentees => {
        if(mentees){
          console.log(mentees);
          this.dataSource.data = mentees as MSubscription[];
        }
      }
    )
  }
  submit() {
    if (this.searchForm.valid) {
      // const searchValue = { ...this.customer, ...this.customerForm.value };
      console.log(this.searchForm.get('fullName').value);
      this.store.dispatch(new MSubscriptionAction.GetSearchMentee(this.searchForm.get('fullName').value));
    }
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  /**
   *  unsubscribe to all 
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
