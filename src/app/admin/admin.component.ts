import { Component, OnInit, ViewChild } from '@angular/core';
import { MSubscriptionSelectors, EntityState } from '../store';
import { Observable, Subject } from 'rxjs';
import { MSubscription } from '../core/model/m-subscriptions';
import { Store } from '@ngrx/store';
import * as MSubscriptionAction from '../store/actions';
import { takeUntil } from 'rxjs/operators';
import { MatTableDataSource, MatSort, MatPaginator, MatDialogConfig, MatDialog } from '@angular/material';
import { MentorMatch } from '../core/model/mentor-match';
import { AdminMenteeInfoComponent } from './admin-mentee-info/admin-mentee-info.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  mentees$: Observable<MSubscription[]>;
  mentorsmatch$: Observable<MentorMatch[]>;
  loading$: Observable<boolean>;
  isDelete: boolean;
  menteeName: string = '';
  private unsubscribe$ = new Subject<void>();
  public dataSource = new MatTableDataSource<MSubscription>();
  displayedColumns = ['fullName', 'division', 'regDate', 'autoMatch', 'manualMatch', 'extractSaved'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  constructor(
   // private dialogRef: MatDialogRef<MentorInfoComponent>,
   // @Inject(MAT_DIALOG_DATA) data,
    public dialog: MatDialog,
    private store: Store<EntityState>,
    private msubscriptionSelectors: MSubscriptionSelectors) {
    this.mentorsmatch$ = this.msubscriptionSelectors.extractedsavedmatch$;
    
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
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  /* on auto match */
  onAutoMatch(menteeId, menteeName){
    this.store.dispatch(new MSubscriptionAction.GetMentorsMatch(menteeId));
    this.isDelete = false;
    this.menteeName = menteeName;
  }
  onExtractSavedMatch(menteeId, menteeName){
    this.store.dispatch(new MSubscriptionAction.ExtractSavedMentorMatch(menteeId));
    this.isDelete = true;
    this.menteeName = menteeName;
  }
  onViewMente(menteeId: number, menteeName: string){
    this.store.dispatch(new MSubscriptionAction.GetMentee(menteeId));
    /** open dialog */
    this.openMenteeInfoDialog(menteeId, menteeName);
  }
  openMenteeInfoDialog(menteeId: number, menteeName: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '700px';
    dialogConfig.data = { menteeId, menteeName};
    const dialogRef = this.dialog.open(AdminMenteeInfoComponent, dialogConfig);

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
  /**
   *  unsubscribe to all 
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
