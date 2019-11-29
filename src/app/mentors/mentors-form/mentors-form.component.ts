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
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentors-form',
  templateUrl: './mentors-form.component.html',
  styleUrls: ['./mentors-form.component.scss']
})
export class MentorsFormComponent implements OnInit {
  private _mentor: Mentor;
  @Input() get mentor_meta(): Mentor {
    return this._mentor;
  }
  set mentor_meta(value: Mentor) {
    this._mentor = value;
  }
  @ViewChild('autosize', { static: false })
  autosize: CdkTextareaAutosize;

  mentorForm: FormGroup;
  menteeValueAddedAreas: DomainArea[];
  mentorExperiences: Experience[];
  loading$: Observable<boolean>;
  sub: Subscription;

  constructor(
    private store: Store<EntityState>,
    private mentorSelectors: MentorSelectors,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit() {
    const formControlsDomainArea = this._mentor['DomainAreas'].map(control => new FormControl(false));
    const formControlsExperience = this._mentor['Experiences'].map(control => new FormControl(false));

    this.mentorForm = this.formBuilder.group({
      id: [],
      Passion: ['', [Validators.required, Validators.maxLength(500)]],
      Interest: ['', [Validators.required, Validators.maxLength(50)]],
      ProfessionalBackground: ['', [Validators.required, Validators.maxLength(50)]],
      MentoringCommitment: ['', [Validators.required, Validators.maxLength(50)]],
      UnitOfTime: ['', [Validators.required, Validators.max(18)]],
      PriorRoles: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      Comment: [],
      Experiences: this.formBuilder.array(formControlsExperience),
      MentorDomianArea: new FormArray(formControlsDomainArea)
    });
  }
  getMentorsDisplayData(id: number = 0) {
    this.store.dispatch(new MentorAction.GetMentor(id));
  }
  // submit the mentor form
  submit() {
    const saveMentor: Mentor = {
      MentorId: 0,
      EmployeeId: this.mentor_meta['EmployeeId'],
      ProfessionalBackground: this.mentorForm.get('ProfessionalBackground').value,
      Interest: this.mentorForm.get('Interest').value,
      Passion: this.mentorForm.get('Passion').value,
      PriorRoles: this.mentorForm.get('PriorRoles').value,
      Available: true,
      ReadTerms: true,
      UnitOfTime:this.mentorForm.get('UnitOfTime').value,
      MentoringCommitment: this.mentorForm.get('MentoringCommitment').value,
      Comment: this.mentorForm.get('Comment').value,
      CreatedDateTime: new Date,
      MentorDomianArea: [
        {DomainId:1}
      ],
      MentorExperience:[
       { ExperienceId:8}
      ]
    };
    if (this.mentorForm.valid) {
      //const menteerValue = { ...this.customer, ...this.customerForm.value };
      this.store.dispatch(new MentorAction.AddMentor(saveMentor));
      //this.mentorForm.reset();
      this.router.navigate(['mentors/subscriptions']);
  }
    console.log(this.mentorForm.value);
    //this.mentorForm.reset();
  }
}