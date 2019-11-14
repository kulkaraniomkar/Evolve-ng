import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mentee } from 'src/app/core/model/mentee';
import { Observable, Subscription } from 'rxjs';
import { MenteesService } from '../mentees.service';
import { Division } from '../../core/model/division';

import { Mentortime } from '../../core/model/mentor-time';
import { MentorTimesService, DivisionsService, DisplayDataService } from '../../shared/shared.service';
import gender from '../../shared/gender.json';
import age from '../../shared/age.json';
import { MentorsService } from '../mentors.service';
import { Mentor } from 'src/app/core/model/mentor';
import {map, startWith, debounceTime, tap, switchMap, finalize} from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Result, DisplayData } from 'src/app/core/model/display-data';

@Component({
  selector: 'app-mentees-signup',
  templateUrl: './mentees-signup.component.html',
  styleUrls: ['./mentees-signup.component.scss']
})
export class MenteesSignupComponent implements OnInit {

  menteeForm = this.formBuilder.group({
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

  mentee: Mentee;
  loading$: Observable<boolean>;
  divisions$: Observable<Division[]>;
  mentorTimes$: Observable<Mentortime[]>;
  mentors$: Observable<Mentor[]>;
  displayData$: Observable<DisplayData[]>;
  filteredOptions: Mentor[] = [];
  divisions: [];
  mentorTimes: [];
  sub: Subscription;
  constructor(
    private displayDataService: DisplayDataService,
    private menteesService: MenteesService,
    private divisionsService: DivisionsService,
    private mentorTimesService: MentorTimesService,
    private mentorsService: MentorsService,
    private router: Router,
    private formBuilder: FormBuilder) {
    this.loading$ = this.menteesService.loading$;
  }
  // gender
  public gender: Array<{ name: string, value: string }> = gender;
  // age 
  public age: Array<{ name: string, value: string }> = age;
  ngOnInit() {
    this.getMentorTimes();
    this.getDivisions();
    this.getMentors();
    this.getDisplayData();
    // this.getMentors();
    
    //this.geMentorTimes();
  }
  getDisplayData() {
    this.displayData$ = this.displayDataService.getAll();
  }
  getDivisions() {
    this.divisions$ = this.divisionsService.getAll();
    this.divisions$.subscribe((divisions: any) => {
      this.divisions = (divisions.length > 0) ? divisions : [{ id: 0, name: 'First national Bank' }];
      this.menteeForm.controls.divisions.patchValue(0);
    })
  }
  getMentorTimes() {
    this.mentorTimes$ = this.mentorTimesService.getAll();
    this.mentorTimes$.subscribe((mentorTimes: any) => {
      this.mentorTimes = (mentorTimes.length > 0) ? mentorTimes : [{ id: 1, name: '1 month' }];
      this.menteeForm.controls.mentorTimes.patchValue(1);
    })
  }
  getMentors() {
    //this.mentors$ = this.mentorsService.getAll();
    console.log("get mentors call") ; 
  this.mentors$ = this.menteeForm
  .get('mentorPreference')
  .valueChanges
    .pipe(
      tap(val => console.log(`Debounce: ${val}`)),
      debounceTime(300),
      tap(() => this.loading$ = this.mentorsService.loading$),
      switchMap(value => this.mentorsService.getWithQuery('name='+value)
      .pipe(
        finalize(() => this.loading$ = this.mentorsService.loading$),
        )
      )
    )
    
  }
// testing
getMentors2() {
  //this.mentors$ = this.mentorsService.getAll();
  console.log("get mentors call") ; 
this.menteeForm
.get('mentorPreference')
.valueChanges
  .pipe(
    tap(val => console.log(`Debounce: ${val}`)),
    debounceTime(300),
    tap(() => this.loading$ = this.mentorsService.loading$),
    switchMap(value => this.mentorsService.getWithQuery('name='+value)
    .pipe(
      finalize(() => this.loading$ = this.mentorsService.loading$),
      )
    )
  )
  .subscribe(users => this.filteredOptions = users)
  
}

  save() {

    const temp = { name: "Olwethu", lastname: "Ngwenya", email: "olwethu.ngwenya@rmab.co.za" }

    const menteeValue = { ...this.menteeForm.value, ...temp };
    // const menteeListValue: MenteeList = { id: 2, mentorId: 4, mentorFirstname: 'sipho', mentorLastname: 'moyo', finYear: 2019, division: this.menteeForm.value['divisionPreference'], duration: menteeValue['mentoringPeriod'], startDate: new Date(), finishDate: new Date(), shareProfile: true };
    // console.log(menteeListValue);
    // this.menteeListService.add(menteeListValue);
    // this.menteesService.add(menteeValue);
    this.router.navigate(['/mentee/subscriptions']);
  }
}
