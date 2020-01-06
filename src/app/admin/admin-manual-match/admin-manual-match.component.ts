import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import * as ManualMatchAction from '../../store/actions';
import { Store } from '@ngrx/store';
import { EntityState, MSubscriptionSelectors } from '../../store';
import { ManualMatch } from '../../core/model/mentor-mentee';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-manual-match',
  templateUrl: './admin-manual-match.component.html',
  styleUrls: ['./admin-manual-match.component.scss']
})
export class AdminManualMatchComponent implements OnInit, OnDestroy {
  
  menteeid: number;
  fullname: string;
  loading$: Observable<boolean>; 
  private unsubscribe$ = new Subject<void>();
  public dataSource = new MatTableDataSource<ManualMatch>();
  displayedColumns = ['fullName', 'assign'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
 
  constructor(
    private store: Store<EntityState>,
    private msubscriptionSelectors: MSubscriptionSelectors,
    private route: ActivatedRoute
  ) { 
    this.loading$ = this.msubscriptionSelectors.loading$;
  }

  ngOnInit() {
    this.menteeid = +this.route.snapshot.paramMap.get('menteeid');
    this.fullname = this.route.snapshot.paramMap.get('fullname');
    /**
     * Dispatch action to load manual matching
     */
    this.getManualMatch(this.menteeid);
    /**
     * sub to the data for matching subscriptions
     */
    this.msubscriptionSelectors
    .manualmatch$
    .pipe(
      takeUntil(this.unsubscribe$)
    )
    .subscribe(mm => {
      if(mm){
        console.log(mm);
        this.dataSource.data = mm as ManualMatch[];
      }
    }
      
    );

  }
  getManualMatch(menteeid) {
    console.log('get manual match ', menteeid);
    this.store.dispatch(new ManualMatchAction.GetManualMatch(menteeid))
  }
  /**
   *  unsubscribe to all 
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
