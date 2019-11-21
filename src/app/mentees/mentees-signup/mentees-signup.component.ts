import { Component, OnInit, Optional, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState, MenteeDisplayDataSelectors } from '../../store';
import { FormBuilder, Validators } from '@angular/forms';
import { MenteeDisplayData } from 'src/app/core/model/mentee-display-data';
import { Observable, of } from 'rxjs';
import { startWith, map, debounceTime, mergeMapTo, mergeMap, switchMap, catchError } from 'rxjs/operators';
import * as MenteeDisplayDataAction from '../../store/actions';
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

export class MenteesSignupComponent implements OnInit {
  menteeForm = this.formBuilder.group({
    GenderPeriodAge: [],
    // id: [],
    // Interest: [],
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
  menteeDisplayData$: Observable<MenteeDisplayData>;
  filteredMentors$: Observable<MentorSearchName[]>;
  loading$: Observable<boolean>;
  divisions: Array<{id: number, name: string}> = [{ id: 1, name: 'Yes'}, { id: 2, name: 'No'}, { id: 3, name: 'Does not matter'}]
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any,
    @Optional() private dialogRef: MatDialogRef<MenteesSignupComponent>,
    private store: Store<EntityState>,
    private menteeDisplayDataSelectors: MenteeDisplayDataSelectors,
    private githubService: GithubService,
    private formBuilder: FormBuilder,
  ) {
    this.menteeDisplayData$ = this.menteeDisplayDataSelectors.menteeDisplayData$;
    this.loading$ = this.menteeDisplayDataSelectors.loading$;
  }
  ngOnInit(): void {
    this.getMenteeDisplayData();
    this.getFilteredMentors();
    this.filteredMentors$
  }

  getMenteeDisplayData() {
    this.store.dispatch(new MenteeDisplayDataAction.GetMenteeDisplayData(0));
  }
  getFilteredMentors(){
    this.filteredMentors$ = this.menteeForm.get('mentorName').valueChanges.pipe(
      startWith(''),
      // delay emits
      debounceTime(300),
      // use switch map so as to cancel previous subscribed events, before creating new once
      switchMap(value => {
        if (value !== '') {
          // lookup from github
          return this.lookup(value);
        } else {
          // if no value is pressent, return null
          return of(null);
        }
      })
    )
  }
  lookup(value: string): Observable<MentorSearchName> {
    return this.githubService.search(value.toLowerCase()).pipe(
      // map the item property of the github results as our return object
      map(results => results.items),
      // catch errors
      catchError(_ => {
        return of(null);
      })
    );
  }
  save(){
    // const
    this.menteeDisplayData$.subscribe(r => console.log(r));
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
  // add(mentee: Mentee) {
  //   this.store.dispatch(new MenteeAction.AddMentee(mentee));
  // }
}
