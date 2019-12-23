import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EntityState, MSubscriptionSelectors } from '../../store';
import * as MSubscriptionAction from '../../store/actions';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { MentorMentee, DomainArea } from '../../core/model/mentor-mentee';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

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
  // mmForm: FormGroup;

  mmForm = this.formBuilder.group({
    id: [],
    endDate: ['', Validators.required],
    comments_array: this.formBuilder.array([this.formBuilder.group({comment:''})])
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<EntityState>,
    private mSelectors: MSubscriptionSelectors,
    private formBuilder: FormBuilder,
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

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
