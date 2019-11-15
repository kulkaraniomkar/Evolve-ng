import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Mentortime } from '../../core/model/mentor-time';

import { Mentor } from 'src/app/core/model/mentor';
import { Division } from 'src/app/core/model/division';


@Component({
  selector: 'app-mentors-signup',
  templateUrl: './mentors-signup.component.html',
  styleUrls: ['./mentors-signup.component.scss']
})
export class MentorsSignupComponent implements OnInit {

  mentorForm = this.formBuilder.group({
    id: [],
    interests: [null, [Validators.required]],
    divisions: [],
    mentorPreference: [],
    mentorTimes: [],
    mentoringPeriod: [],
    divisionPreference: [],
    gender: [],
    mentorAge: [],
    achievement: [],
    experience: [],
    comment: [],
    shareProfile: [],
    readTerms: []
  });

  mentor: Mentor;
  loading$: Observable<boolean>;
  divisions$: Observable<Division[]>;
  mentorTimes$: Observable<Mentortime[]>;
  divisions: [];
  mentorTimes: [];
  sub: Subscription;
  constructor(
   // private menteesService: MentorsService,
    // private divisionsService: DivisionsService,
    // private mentorTimesService: MentorTimesService,
   // private menteeListService: MenteesListService,
    private router: Router,
    private formBuilder: FormBuilder) {
    //this.loading$ = this.menteesService.loading$;
  }
  public gender: Array<{ name: string, value: string }> = [
    { name: 'male', value: 'Male' },
    { name: 'female', value: 'Female' },
    { name: 'other', value: 'Prefer not to answer' }
  ];
  // age 
  public age: Array<{ name: string, value: string }> = [
    { name: '18-24', value: '18-24' },
    { name: '35-44', value: '35-44' },
    { name: '45-54', value: '45-54' },
    { name: '55-64', value: '55-64' }
  ];
  ngOnInit() {
    //this.geMentorTimes();
    //this.getDivisions();
    //this.geMentorTimes();
  }
  getDivisions() {
   // this.divisions$ = this.divisionsService.getAll();
    this.divisions$.subscribe((divisions: any) => {
      this.divisions = (divisions.length > 0) ? divisions : [{ id: 0, name: 'First national Bank' }];
      this.mentorForm.controls.divisions.patchValue(0);
    })
  }
  geMentorTimes() {
    // this.mentorTimes$ = this.mentorTimesService.getAll();
    // this.mentorTimes$.subscribe((mentorTimes: any) => {
    //   this.mentorTimes = (mentorTimes.length > 0) ? mentorTimes : [{ id: 1, name: '1 month' }];
    //   this.mentorForm.controls.mentorTimes.patchValue(1);
    // })
  }

  save() {

    const temp = { name: "Olwethu", lastname: "Ngwenya", email: "olwethu.ngwenya@rmab.co.za" }

    //const menteeValue = { ...this.menteeForm.value, ...temp };
   // const menteeListValue: MenteeList = { finYear: 2019, division: this.menteeForm.value['divisionPreference'], duration: menteeValue['mentoringPeriod'], startDate: new Date(), finishDate: new Date(), mentor: '', shareProfile: true };
   // console.log(menteeListValue);
   // this.menteeListService.add(menteeListValue);
   // this.menteesService.add(menteeValue);
   // this.router.navigate(['/mentee/subscriptions']);
  }
}
