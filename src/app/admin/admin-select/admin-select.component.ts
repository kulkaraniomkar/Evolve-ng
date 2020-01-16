import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityState, MSubscriptionSelectors, CreateMatch } from '../../store';
import * as MSubscriptionAction from '../../store/actions';
import { Store } from '@ngrx/store';
import * as CreateMatchAction from '../../store/actions';
import { Observable, Subscription, Subject } from 'rxjs';
import { MentorMentee, DomainArea, MatchCreate, MatchRegister, Comments } from '../../core/model/mentor-mentee';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { takeUntil, take, tap, takeLast, last } from 'rxjs/operators';
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
  mode: string;
  mentorid: number;
  menteeid: number;
  activityid: number;
  commentLength: number = 0;
  matchtypeid: number;
  loading$: Observable<boolean>; 
  matchregister: MatchRegister;
  mentormentee: MentorMentee;
  domainareas: DomainArea[];
  apiArray:Array<{}> = [];
  currArray:Array<{}> = [];
  dynamicArray:Array<{}> = []
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
        this.matchregister = mm.MatchRegister;
        this.domainareas = mm.DomainAreas.filter(s => s.Selected)
        /** patch form values */
        if(this.mode  == 'update'){
          this.setFormValues();
        }
      }
    });
    this.loading$ = this.mSelectors.loading$;
   }

  ngOnInit() {
    this.mentorid = +this.route.snapshot.paramMap.get('mentorid');
    this.menteeid = +this.route.snapshot.paramMap.get('menteeid');
    this.activityid = +this.route.snapshot.paramMap.get('activityid');
    this.matchtypeid = +this.route.snapshot.paramMap.get('matchtypeid');
    this.route.data.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(data => {
      this.mode = data['mode'];
    })
    console.log('mode ', this.mode);
    console.log('activityid ', this.activityid);
    /* dispatch action to load the mentor/mentee data
    * if id = 0 we load only  meta data
    */
   this.store.dispatch(new MSubscriptionAction.GetMentorMentee({ mentorId: this.mentorid, menteeId: this.menteeid, activityid: this.activityid}));
    /** Initialize form with form data for update */
    if(this.mode == 'update'){
      console.log('update now');
      this.commentChange();
    }
  
   
  }
  setFormValues() {
    const statusId = this.mentormentee['MentorshipStatus'].filter(s => s.Selected)[0]['Value'];
    console.log('Set values', this.matchregister['StatusId']);
    this.mmForm.get('startDate').setValue(this.matchregister['StartDate']);
    this.mmForm.get('endDate').setValue(this.matchregister['EndDate']);
    this.mmForm.get('statusId').setValue(statusId);
    /** Det comments*/
    const comArray = this.matchregister['Comments'].length ?  this.commentsObj() :
    [{comment: ''}];
    /** create temp array */
    this.currArray =  comArray.map(item => { return { ...item, isActive: true,  added: false}});
    this.apiArray =  comArray.map(item => { return { ...item, isActive: true,  added: false}});
    
    for(let i=comArray.length; i<5; i+=1){
      this.currArray.push({comment: '', isActive: false, added: false});
      this.apiArray.push({comment: '', isActive: false, added: false});
    }
   
    /** Add textarea control */
    console.log(comArray);
    if(comArray.length > 1){
      comArray.forEach((item, indx) => {
        if(indx >= 1){
          this.addCommentPatch();
        }
      })
    }
    this.mmForm.get('comments_array').setValue(comArray);
  }
  commentsObj(){
    const cFilter = this.matchregister['Comments'].filter(c => c['IsActive']);
    console.log(cFilter);
    if(cFilter.length){
    let cs = cFilter.map(
        c => { return { comment: c['Comment']} }
      );
      this.commentLength = cs.length;
      console.log(cs);
    return cs;
    }
    return [{comment: ''}];
  }
  get commentsArray() {
    return this.mmForm.get('comments_array') as FormArray;
  }
  addCommentPatch() {   
    ++this.commentLength;
    this.commentsArray.push(this.formBuilder.group({comment:''}));
    //
  }
  addComment() {
    this.currArray[this.commentLength]['added'] = true;
    ++this.commentLength;
    this.commentsArray.push(this.formBuilder.group({comment:''}));
    //
  }

  deleteComment(index) {
    --this.commentLength;
    if(this.currArray[index]['isActive']){
      /** call api */
     
      const tc = this.mentormentee.MatchRegister.Comments.filter(a => a.IsActive);
      console.log(tc);
      console.log(index);
      const comm: Comments = { 
        MentoshipActivityId: this.mentormentee.MentorshipActivityId, 
        CommentId: tc[index]['CommentId'],
        IsActive: false,
       Comment:  tc[index]['Comment']}
      this.store.dispatch(new MSubscriptionAction.RemoveComment(comm));
    }
    this.currArray[index]['isActive'] = false;
    this.currArray[index]['added'] = false;
    console.log('Current array ', this.currArray);
    console.log('Api values ', this.apiArray);
    //this.currArray.map(item => { return { ...item, isActive: true}});
    this.commentsArray.removeAt(index);
   
  }
  saveComment(index){
    --this.commentLength;
    console.log(this.currArray[index]['isActive']);
    console.log(index);
    if(this.currArray[index]['isActive']){
      /** call api */
     
      const tc = this.mentormentee.MatchRegister.Comments.filter(a => a.IsActive);
      console.log(tc);
      console.log(index);
      const comm: Comments = { 
        MentoshipActivityId: this.mentormentee.MentorshipActivityId, 
        CommentId: tc[index]['CommentId'] || 0,
        IsActive:true,
       Comment:  tc[index]['Comment']}
       console.log(comm);
       this.store.dispatch(new MSubscriptionAction.RemoveComment(comm));
    } else {
      const comm: Comments = { 
        MentoshipActivityId: this.mentormentee.MentorshipActivityId, 
        CommentId:  0,
        IsActive:true,
       Comment:  this.mmForm.get('comments_array').value[index]['comment']}
       console.log(comm);
       console.log(this.mmForm.get('comments_array').value);
       this.store.dispatch(new MSubscriptionAction.RemoveComment(comm));

    }
   
    //this.currArray.map(item => { return { ...item, isActive: true}});
   // this.commentsArray.removeAt(index);

  }
  onSubmit(){
    const cm: MatchCreate = {
      MenteeId: this.menteeid, MentorId: this.mentorid, StartDate: this.mmForm.get('startDate').value,
      EndDate: this.mmForm.get('endDate').value, StatusId: parseInt(this.mmForm.get('statusId').value), Comments: this.mmForm.get('comments_array').value,
      MatchTypeId:this.matchtypeid, FinancialYrId:8
    }
    console.log('Submitted!', cm);
    if (this.mmForm.valid) {
      this.store.dispatch(new CreateMatchAction.CreateMatch(cm));
    }
  }
  /**
   * on save
   */
  onSave(){
    const cm: MatchCreate = {
      MenteeId: this.menteeid, MentorId: this.mentorid, StartDate: this.mmForm.get('startDate').value,
      EndDate: this.mmForm.get('endDate').value, StatusId: this.mmForm.get('statusId').value, Comments: [{MentoshipActivityId:this.matchtypeid,CommentId:1,IsActive:true,Comment:"Test"}],
      MatchTypeId:1, FinancialYrId:8, MentoshipActivityId: this.activityid
    }
    console.log('Saved!', cm);
    if (this.mmForm.valid) {
      this.store.dispatch(new CreateMatchAction.UpdateMatch(cm));
    }
  }
  /** on comments change */
  commentChange() {
    this.mmForm.get('comments_array')
      .valueChanges
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(
        item => {
          item.map(i => {
           for(let z=0;  z<item.length; z+=1){
            this.currArray[z]['comment']
            //console.log(i['comment'])
           }
            
          })
        }
      )
  }
  
  /** end */
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
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
