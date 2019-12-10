import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Mentee, DomainArea, Experience, Gender, AgePreference } from '../../core/model/mentee';
import { startWith, debounceTime, tap, switchMap, map, catchError, count, filter, finalize } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SearchResults, SearchParams } from '../../core/model/mentor-search';
import { MentorSearchService } from '../mentor-search.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { Store } from '@ngrx/store';
import { EntityState, MenteeSelectors } from '../../store';
import { Router } from '@angular/router';
import * as MenteeAction from '../../store/actions';

@Component({
  selector: 'app-mentee-signup-form',
  templateUrl: './mentee-signup-form.component.html',
  styleUrls: ['./mentee-signup-form.component.scss']
})
export class MenteeSignupFormComponent implements OnInit {

  private _mentee: Mentee;
  @Input() get mentee_meta(): Mentee {
    return this._mentee;
  }
  set mentee_meta(value: Mentee) {
    this._mentee = value;
  }
  title = 'Mentee Signup';
  isLoading = false;
  filteredMentors$: Observable<SearchResults[]>;
  menteeForm: FormGroup;
  sortedArrayDomainAreas: DomainArea[];
  sortedArrayExperiences: Experience[];
  sortedArrayGender: Gender[];
  sortedArrayAge: AgePreference[];


  @ViewChild('autosize', { static: false })
  autosize: CdkTextareaAutosize;

  constructor(
    private store: Store<EntityState>,
    private menteeSelectors: MenteeSelectors,
    private router: Router,
    private formBuilder: FormBuilder,
    private mentorSearchService: MentorSearchService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sortedArrayDomainAreas = this._mentee['DomainAreas'].sort((a, b) => a.OrderId - b.OrderId);
    this.sortedArrayExperiences = this._mentee['Experiences'].sort((a, b) => a.OrderId - b.OrderId);
    this.sortedArrayGender = this._mentee['Gender'].sort((a, b) => a.OrderId - b.OrderId);
    this.sortedArrayAge = this._mentee['AgePreference'].sort((a, b) => a.OrderId - b.OrderId);
    const formControlsDomainArea = this.sortedArrayDomainAreas.map(control => new FormControl({ value: false, disabled: false }));
    const formControlsExperience = this.sortedArrayExperiences.map(control => new FormControl(false));
    console.log(this._mentee['DomainAreas'].sort((a, b) => a.OrderId - b.OrderId));
    this.menteeForm = this.formBuilder.group({
      MenteeId: [],
      Interest: ['', Validators.required],
      UnitOfTimeId: ['', Validators.required],
      InDivision: ['', Validators.required],
      YearsOfExperience: ['', [Validators.required, Validators.min(1), Validators.max(18)]],
      Gender: [],
      Age: [],
      PreferredMentorEmpId: [''],
      ExperienceId: [],
      Comments: ['', Validators.required],
      ShareProfile: [],
      ReadTerms: [false, Validators.requiredTrue],
      MenteeDomianArea: [],
      Experiences: this.formBuilder.array(formControlsExperience),
      MentorDomianArea: this.formBuilder.array(formControlsDomainArea)
    });
    this.getAtuoCompleteMentors();
    this.onExperienceChange();
    this.onMentorDomianAreaChange();
    this.menteeForm.get('UnitOfTimeId').setValue(this._mentee['UnitOfTimes'][0]['Value'])
  }
  onMentorDomianAreaChange() {
    this.menteeForm.get('ExperienceId')
      .valueChanges
      .subscribe(
        s => console.log(s)
      )
  }
  getAtuoCompleteMentors() {
    this.filteredMentors$ = this.menteeForm
      .get('PreferredMentorEmpId')
      .valueChanges
      .pipe(
        startWith(''),
        // delay emits
        debounceTime(500),
        tap(() => {
          console.log("tap");
          this.isLoading = true;
        }),
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
      ).pipe(
        tap(s => console.log(s)),
        finalize(() => this.isLoading = false),
        )
  }
  lookup(value): Observable<SearchResults[]> {
    console.log(value);
    if (value && value['FullName']) {
      value = value['FullName'];
    }
    const searchParams: SearchParams = {
      SearchId: this.menteeForm.get('InDivision').value,
      SearchString: value ? value.toLowerCase() : '',
      Limit: 5,
      Division: this._mentee['Division']
    }
    return this.mentorSearchService.search(searchParams).pipe(
      // map the item property of the mentor search results as our return object
      map(results => {
        console.log("Mentor search observeable :", results);
        this.isLoading = false;
        return results;
      }),
      // catch errors
      catchError(_ => {
        return of(null);
      })
    );

  }
  displayFn(empl: SearchResults) {
    if (empl) { return empl.FullName; }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the cancellation?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked', result);
        // DO SOMETHING
        this.menteeForm.reset();

      }
    });
  }
  onExperienceChange() {
    const exp = this.menteeForm.get('MentorDomianArea')
      .valueChanges
      .pipe(
        tap(s => console.log("before ", s[0])),
        //count(i => i[i] === true),
        //filter((val, index) => { console.log(index]);return val } ),
        tap(s => console.log(s))
      );
    exp.subscribe(
      res => {
        const updatedArrayCount = res.filter(i => i === true).length;
        if (updatedArrayCount <= 3) {
          this.menteeForm.get('MentorDomianArea').valid;
        } else {
          this.menteeForm.get('MentorDomianArea').touched;
          this.menteeForm.get('MentorDomianArea').setErrors({ limit: true });
        }
      }
    );
  }

  submit() {
    console.log('Yes saved', this.menteeForm.value);
    
    const DomainIdArray = this.menteeForm.get('MentorDomianArea').value.map((val, i) => {
      if (val) {
        return { DomainId: this.sortedArrayDomainAreas[i]['Value'] }
      }
    }).filter(p => p !== undefined);
    const saveMentee: Mentee = {
      MenteeId: 0,
      EmployeeId: this._mentee['EmployeeId'],
      InDivision: this.menteeForm.get('InDivision').value,
      Division: this._mentee['Division'],
      //TenantId: 0,
      Interest: this.menteeForm.get('Interest').value,
      ServicePeriod: 0,
      Duration: 0,
      UnitOfTimeId: this.menteeForm.get('UnitOfTimeId').value,
      YearsOfExperience: this.menteeForm.get('YearsOfExperience').value,
      //PreferredMentorId: this.EmployeeId,
      PreferredMentorEmpId: this.menteeForm.get('PreferredMentorEmpId').value['EmployeeId'],
      PreferredMentorGenderId: this.menteeForm.get('Gender').value,
      PreferredMentorAgeId: this.menteeForm.get('Age').value,
      ShareProfile: this.menteeForm.get('ShareProfile').value ? false : true,
      ReadTerms: this.menteeForm.get('ReadTerms').value,
      Comment: this.menteeForm.get('Comments').value,
      CreatedDate: new Date,
      MenteeDomianArea: DomainIdArray,
      MenteeExperience: [{ ExperienceId: this.menteeForm.get('ExperienceId').value }],
      UnitOfTimes: [],
      Experiences: [],
      DomainAreas: [],
      AgePreference: [],
      SearchParams: [],
      Gender: []
    }
    console.log('Yes save', saveMentee);
    if (this.menteeForm.valid) {
      //const menteerValue = { ...this.customer, ...this.customerForm.value };
      this.store.dispatch(new MenteeAction.AddMentee(saveMentee));
      this.menteeForm.reset();
      this.router.navigate(['mentees/subscriptions']);
  }
  }
}
