import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityState, MSubscriptionSelectors, CreateMatch } from '../../store';
import * as MSubscriptionAction from '../../store/actions';
import { Store } from '@ngrx/store';
import * as CreateMatchAction from '../../store/actions';
import { Observable, Subscription, Subject } from 'rxjs';
import { MentorMentee, DomainArea, MatchCreate } from '../../core/model/mentor-mentee';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { takeUntil } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ModalComponent } from '../../core/modal/modal.component';

@Component({
  selector: 'app-admin-select',
  templateUrl: './admin-select.component.html',
  styleUrls: ['./admin-select.component.scss']
})
export class AdminSelectComponent implements OnInit, OnDestroy {
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  startDate = new Date(2019, 12, 1);
  mentorid: number;
  menteeid: number;
  loading$: Observable<boolean>; 
  mentormentee: MentorMentee;
  domainareas: DomainArea[];
 // mentormentee$: Observable<MentorMentee>;
  sub: Subscription;
  private unsubscribe$ = new Subject<void>();
  // mmForm: FormGroup;

  mmForm = this.formBuilder.group({
    statusId: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required],
    comments_array: this.formBuilder.array([this.formBuilder.group({comment:''})])
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<EntityState>,
    private mSelectors: MSubscriptionSelectors,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.sub = this.mSelectors.mentorMentee$.subscribe(mm => {
      if(mm){
        this.mentormentee = mm;
        this.domainareas = mm.DomainAreas.filter(s => s.Selected)
        /** patch form values */
      }
    });
    this.loading$ = this.mSelectors.loading$;
   }

  ngOnInit() {
    this.mentorid = +this.route.snapshot.paramMap.get('mentorid');
    this.menteeid = +this.route.snapshot.paramMap.get('menteeid');
    console.log('mentor id ', this.mentorid);
    /* dispatch action to load the mentor/mentee data
    * if id = 0 we load only  meta data
    */
   this.store.dispatch(new MSubscriptionAction.GetMentorMentee({ mentorId: this.mentorid, menteeId: this.menteeid}));
  }

  get commentsArray() {
    return this.mmForm.get('comments_array') as FormArray;
  }
  addComment() {
    this.commentsArray.push(this.formBuilder.group({comment:''}));
  }

  deleteComment(index) {
    console.log(index);
    this.commentsArray.removeAt(index);
  }
  onSubmit(){
    const cm: MatchCreate = {
      MenteeId: this.menteeid, MentorId: this.mentorid, StartDate: this.mmForm.get('startDate').value,
      EndDate: this.mmForm.get('endDate').value, StatusId: this.mmForm.get('statusId').value, Comments: this.mmForm.get('comments_array').value,
      MatchTypeId:1, FinancialYrId:8
    }
    console.log('Submitted!', cm);
    if (this.mmForm.valid) {
      this.store.dispatch(new CreateMatchAction.CreateMatch(cm));
    }
  }
    /**
     * Cancel/Confirm dialog box
     */
    cancelCreate() {
      const title = `Are you sure?`;
  
      const msg =  `This will cancel and go back to your list.`;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '350px';
      dialogConfig.data = {
        title: title,
        message: msg,
      };
  
      const dialogRef = this.dialog.open(ModalComponent, dialogConfig);
  
      dialogRef.afterClosed().pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe((cancelIt) => {
        console.log(cancelIt);
        if (cancelIt) {
          this.mmForm.reset();
          }
          //  else {
          //   // route to admin list
          //   this.router.navigate(['admin/matching']);
          // }
      });
  
    }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
