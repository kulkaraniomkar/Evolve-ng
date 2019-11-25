import { Component, OnInit, Optional, Inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState,  MenteeSelectors } from '../../store';
import { FormBuilder, Validators } from '@angular/forms';
import { MenteeDisplayData, Result } from 'src/app/core/model/mentee-display-data';
import { Observable, of, Subscription } from 'rxjs';
import { startWith, map, debounceTime, mergeMapTo, mergeMap, switchMap, catchError } from 'rxjs/operators';
import * as MenteeAction from '../../store/actions';
import { Mentee } from '../../core/model/mentee';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GithubService } from 'src/app/shared/mentor-search.service';


export interface MentorSearchName {
  id: number
  name: string;
}
@Component({
  selector: 'app-mentees-signup',
  templateUrl: './mentees-signup.component.html',
  styleUrls: ['./mentees-signup.component.scss']
})

export class MenteesSignupComponent implements OnInit, OnDestroy {
  menteeForm = this.formBuilder.group({
    GenderPeriodAge: [],
    // id: [],
    achievements: [],
    experience: [],
    InDivision: [null, Validators.required],
    mentorName: [],
    // achievement: [],
    // gender: [],
    // comments: [],
    conditions: [],
    // form object
    MenteeId: [],
    EmployeeId: [],
    //InDivision: [],
    Division: [],
    TenantId: [],
    Interest: [],
    ServicePeriod: [],
    Duration: [],
    UnitOfTimeId: [],
    YearsOfExperience: [],
    PreferredMentorId: [],
    PreferredMentorEmpId: [],
    PreferredMentorGenderId: [],
    PreferredMentorAgeId: [],
    ShareProfile: [],
    ReadTerms: [],
    Comment: [],
    CreatedDate: [],
    MenteeDomianArea: [],
    MenteeExperience: [],
    UnitOfTimes: [],
    Experiences: [],
    DomainAreas: [],
    Gender: [],
    AgePreferences:[],
  });
  title = 'New Mentee Signup';
  menteeData$: Observable<Mentee>;
  filteredMentors$: Observable<MentorSearchName[]>;

  loading$: Observable<boolean>;
  mentee: Result;
  sub: Subscription;
  experienceData: Array<{OrderId: number, Name: string, Text: string, Value: number}>;
  divisions: Array<{id: number, name: string}> = [{ id: 1, name: 'Yes'}, { id: 2, name: 'No'}, { id: 3, name: 'Does not matter'}]
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    @Optional() private dialogRef: MatDialogRef<MenteesSignupComponent>,
    private store: Store<EntityState>,
    private menteeSelectors: MenteeSelectors,
    private githubService: GithubService,
    private formBuilder: FormBuilder,
  ) {
    //this.menteeDisplayData$ = this.menteeDisplayDataSelectors.menteeDisplayData$;
    this.sub = this.menteeSelectors.mentee$.subscribe(menteeResult => {
       console.log(menteeResult);
      // if (menteeResult) {
      //  this.mentee = menteeResult['Result'];
      //  console.log(menteeResult);
      // }
    });
    this.loading$ = this.menteeSelectors.loading$;
  }
  ngOnInit(): void {
    this.getMenteeData();
    this.getFilteredMentors();
    this.filteredMentors$
  }

  getMenteeData() {
    this.store.dispatch(new MenteeAction.GetMentee(0));
  }
  getFilteredMentors(){
    this.filteredMentors$ = this.menteeForm.get('mentorName').valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(500),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from mentor
          return this.lookup(value);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      })
    )
  }
  lookup(value: string): Observable<MentorSearchName> {
    return this.githubService.search(value.toLowerCase(), this.menteeForm.get('inDivision').value, 5,  this.mentee['Division']).pipe(
      // map the item property of the mentor search results as our return object
      map(results => results.items),
      // catch errors
      catchError(_ => {
        return of(null);
      })
    );
  }
  // 
  sortFn(data: Array<{OrderId: number, Name: string, Text: string, Value: number}>){
    console.log("Data to be sorted: ", data);
    this.experienceData = data.slice().sort((a, b) => a.OrderId - b.OrderId);
    return true;
  }
  save(){
    // const
    //this.menteeDisplayData$.subscribe(r => console.log(r));
    const newFormValues:Mentee = {
      MenteeId: 0,
      EmployeeId: null,
      InDivision: true,
      Division: "",
      TenantId: 0,
      Interest: "string",
      ServicePeriod: 1,
      Duration: 2,
      UnitOfTimeId: 3,
      YearsOfExperience: 4,
      PreferredMentorId: 5,
      PreferredMentorEmpId: "58888",
      PreferredMentorGenderId: 2,
      PreferredMentorAgeId: 5,
      ShareProfile: true,
      ReadTerms: true,
      Comment: "string",
      CreatedDate: new Date(),
      MenteeDomianArea: [],
      MenteeExperience: [],
      UnitOfTimes: [],
      Experiences: [],
      DomainAreas: [],
      Gender:[],
      AgePreferences: []

    }
    console.log(this.menteeForm.value)
  }
  onClose() {
    this.dialogRef.close();
  }
  ngOnDestroy(){
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
  // add(mentee: Mentee) {
  //   this.store.dispatch(new MenteeAction.AddMentee(mentee));
  // }
}
