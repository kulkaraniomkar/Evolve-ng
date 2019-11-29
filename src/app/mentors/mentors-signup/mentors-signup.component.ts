import { Component, OnInit, ViewChild } from '@angular/core';
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
  selector: 'app-mentors-signup',
  templateUrl: './mentors-signup.component.html',
  styleUrls: ['./mentors-signup.component.scss']
})
export class MentorsSignupComponent implements OnInit {

  @ViewChild('autosize', { static: false })
  autosize: CdkTextareaAutosize;

  mentorForm: FormGroup;
  MentorDomianArea: DomainArea[];
  mentor: Mentor;
  menteeValueAddedAreas: DomainArea[];
  mentorExperiences: Experience[];
  mentors_meta$: Observable<Mentor>;
  loading$: Observable<boolean>;
  sub: Subscription;
 
  constructor(
    private store: Store<EntityState>,
    private mentorSelectors: MentorSelectors,
    private formBuilder: FormBuilder
  ) {
    this.mentors_meta$ = this.mentorSelectors.mentor$;
    // this.sub = this.mentorSelectors.mentor$.subscribe(mentor => {
    //   if (mentor) {
    //     this.mentor = mentor;
    //     this.menteeValueAddedAreas = mentor['DomainAreas'];
    //     this.mentorExperiences = mentor['Experiences'];
    //     this.MentorDomianArea = mentor['DomainAreas'];
    //   }
    // });
    this.loading$ = this.mentorSelectors.loading$;



  }

  // createAreas(menteeValueAddedAreasInputs) {
  //   console.log(menteeValueAddedAreasInputs);
  //   const arr = menteeValueAddedAreasInputs.map(m => {
  //     return new FormControl(m.selected || false);
  //   });
  //   return new FormArray(arr);
  // }
  ngOnInit() {
    // console.log(this.menteeValueAddedAreas);
    // // Create a FormControl for each available music preference, initialize them as unchecked, and put them in an array
    // const formControls = this.menteeValueAddedAreas.map(control => new FormControl(false));
    // this.mentorForm = this.formBuilder.group({
    //   id: [],
    //   Passion: ['', [Validators.required, Validators.maxLength(500)]],
    //   Interest: ['', [Validators.required, Validators.maxLength(50)]],
    //   ProfessionalBackground: ['', [Validators.required, Validators.maxLength(50)]],
    //   MentoringCommitment: ['', [Validators.required, Validators.maxLength(50)]],
    //   UnitOfTime: ['', [Validators.required, Validators.max(18)]],
    //   PriorRoles: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
    //   Comment: [],
    //   MentorDomianArea: this.formBuilder.array(formControls)
    // });
  
    // If mode is editpass the id 
    // this.getMentorsDisplayData();

  }
  getMentorsDisplayData(id: number = 0) {
    this.store.dispatch(new MentorAction.GetMentor(id));
  }
  // submit the mentor form
  submit() {
    
    console.log(this.mentorForm.value);
  }
}