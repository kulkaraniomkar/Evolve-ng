import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { Mentor, DomainArea, Experience } from '../../core/model/mentor';
import { EntityState } from '../../store';
import { Store } from '@ngrx/store';
import * as MentorAction from '../../store/actions';
import { MentorSelectors } from '../../store/services/mentor.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-mentors-form',
  templateUrl: './mentors-form.component.html',
  styleUrls: ['./mentors-form.component.scss']
})
export class MentorsFormComponent implements OnInit {
  @Input() mentor_meta: Mentor;
  @ViewChild('autosize', { static: false })
  autosize: CdkTextareaAutosize;

  mentorForm: FormGroup;
  //MentorDomianArea: DomainArea[];
  mentor: Mentor;
  menteeValueAddedAreas: DomainArea[];
  mentorExperiences: Experience[];
  loading$: Observable<boolean>;
  sub: Subscription;
 
  constructor(
    private store: Store<EntityState>,
    private mentorSelectors: MentorSelectors,
    private formBuilder: FormBuilder
  ) {
    
    // this.sub = this.mentorSelectors.mentor$.pipe(take(1)).subscribe(mentor => {
    //   if (mentor) {
    //     this.mentor = mentor;
    //     this.menteeValueAddedAreas = mentor['DomainAreas'];
    //     this.mentorExperiences = mentor['Experiences'];
    //     this.MentorDomianArea = mentor['DomainAreas'];
    //   }
    // });
   // this.loading$ = this.mentorSelectors.loading$;



  }

  // createAreas(menteeValueAddedAreasInputs) {
  //   console.log(menteeValueAddedAreasInputs);
  //   const arr = menteeValueAddedAreasInputs.map(m => {
  //     return new FormControl(m.selected || false);
  //   });
  //   return new FormArray(arr);
  // }
  ngOnInit() {
    console.log(this.mentor_meta);
    const formControls = this.mentor_meta['DomainAreas'].map(control => new FormControl(false));
    console.log(formControls);
    this.mentorForm = this.formBuilder.group({
      id: [],
      Passion: ['', [Validators.required, Validators.maxLength(500)]],
      Interest: ['', [Validators.required, Validators.maxLength(50)]],
      ProfessionalBackground: ['', [Validators.required, Validators.maxLength(50)]],
      MentoringCommitment: ['', [Validators.required, Validators.maxLength(50)]],
      UnitOfTime: ['', [Validators.required, Validators.max(18)]],
      PriorRoles: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      Comment: [],
      MentorDomianArea: new FormArray(formControls)
    });

  }
  getMentorsDisplayData(id: number = 0) {
    this.store.dispatch(new MentorAction.GetMentor(id));
  }
  // submit the mentor form
  submit() {
    console.log(this.mentorForm.value);
  }
}
