import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Mentee, UnitOfTime, Gender, SearchParam, AgePreference, DomainArea, Experience } from '../../core/model/mentee';
import { Observable, Subscription, of } from 'rxjs';
import { EntityState, MenteeSelectors } from '../../store';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Store } from '@ngrx/store';
import * as MenteeAction from '../../store/actions';
import { FormBuilder, Validators, FormControl, FormArray, FormGroup } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { startWith, debounceTime, switchMap, tap, finalize, map, catchError } from 'rxjs/operators';
import { SearchResults, SearchParams } from '../../core/model/mentor-search';
import { MentorSearchService } from '../mentor-search.service';
import { ModalComponent } from '../../core/modal/modal.component';

@Component({
  selector: 'app-mentee-crud',
  templateUrl: './mentee-crud.component.html',
  styleUrls: ['./mentee-crud.component.scss']
})
export class MenteeCrudComponent implements OnInit, OnDestroy {


  @ViewChild('autosize', { static: false })
  autosize: CdkTextareaAutosize;
  mentee: Mentee;
  unitOfTimes: UnitOfTime[];
  gender: Gender[];
  searchDivisions: SearchParam[];
  age: AgePreference[];
  sortedArrayDomainAreas: DomainArea[];
  sortedArrayExperiences: Experience[];
  loading$: Observable<boolean>;
  filteredMentors$: Observable<SearchResults[]>;
  sub: Subscription;
  sub2: Subscription;
  sub3: Subscription;
  sub4: Subscription;
  menteeForm: FormGroup;
  saveStatus: boolean = false;
  
  formControlsDomainArea: FormControl[];
  formControlsExperience: FormControl[];

  title: string = 'New signup';  // Title :: edit || signup || view 
  id: number; // id for the mentee
  isLoading: boolean = false; // status of spinner
  IsEdit: boolean = false;

  constructor(
    private store: Store<EntityState>,
    private menteeSelectors: MenteeSelectors,
    private router: Router,
    private formBuilder: FormBuilder,
    private mentorSearchService: MentorSearchService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {

    this.loading$ = this.menteeSelectors.loading$;
  }

  ngOnInit() {
    // set the mode :: edit mentee, create new mentee, view mentee
    this.sub = this.route.data.subscribe(data => {
      this.title = data['mode'];
      // patch the form values
    })
    // grab the id from the url or route
    this.id = +this.route.snapshot.paramMap.get('id');
    // dispatch action to load the mentee and mentee data
    // if id = 0 we load only  meta data
    this.getMenteeAndMetadata(this.id);

    // get the mentee data


    this.sub2 = this.menteeSelectors.mentee$.subscribe(mentee => {
      if (mentee) {
        // data for the form eg update, read 
        this.mentee = mentee;
        this.unitOfTimes = mentee['UnitOfTimes']; // metadata for the form
        this.gender = mentee['Gender'].sort((a, b) => a.OrderId - b.OrderId); // metadata for gender
        this.age = mentee['AgePreference'].sort((a, b) => a.OrderId - b.OrderId); // metadata for age
        this.searchDivisions = mentee['SearchParams']; // metadata for gender
        this.sortedArrayDomainAreas = this.mentee['DomainAreas'].sort((a, b) => a.OrderId - b.OrderId);
        this.sortedArrayExperiences = this.mentee['Experiences'].sort((a, b) => a.OrderId - b.OrderId);
        console.log(mentee['InDivision']);
        console.log("sortd array ",this.sortedArrayDomainAreas);
        this.formControlsDomainArea = this.sortedArrayDomainAreas.map(control => new FormControl(false));
        this.formControlsExperience = this.sortedArrayExperiences.map(control => new FormControl(false));
        this.menteeForm = this.formBuilder.group({
          MenteeId: [],
          Interest: ['', Validators.required],
          UnitOfTimeId: ['', Validators.required],
          Duration: ['', [Validators.required, Validators.min(1), Validators.max(18)]],
          InDivision: ['', Validators.required],
          PreferredMentorEmpId: [''],
          PreferredMentorGenderId: ['', Validators.required],
          PreferredMentorAgeId: ['', Validators.required],
          MentorDomianArea: this.formBuilder.array(this.formControlsDomainArea),
          ExperienceId: ['', Validators.required],
          Experiences: this.formBuilder.array(this.formControlsExperience),
          Comment: ['', Validators.required],
          ShareProfile: [false],
          ReadTerms: [false, Validators.requiredTrue],
        });
        // set default to months
        const unitMonths = this.mentee['UnitOfTimes'][0]['Value'] == 1 ? 'Months' : '';
        this.menteeForm.get('UnitOfTimeId').setValue(unitMonths);
        this.menteeForm.get('UnitOfTimeId').disable();
        // auto complete
        this.getAutoCompleteMentors();
        // validator for checkboxes 
        this.onMentorDomainAreaChange();
        // indivision changes
        this.onMenteeInDivisionChanges();
        // mode Edit -> patch values
        if (this.title === 'Edit Mentee') {
          this.IsEdit = true;
          const checkboxStatus = [];
          this.sortedArrayDomainAreas.forEach((val) => {
            mentee['MenteeDomianArea'].forEach(
              (val2) => {
                if (parseInt(val.Value) == val2.DomainId && checkboxStatus.length < 10) {
                  checkboxStatus.push(true);
                } else if (parseInt(val.Value) != val2.DomainId && checkboxStatus.length < 10) {
                  checkboxStatus.push(false);
                }
              })
          });
          const checkboxesValues = this.sortedArrayDomainAreas.map((val) => {
            if(val.Selected){
                return true
            }else{
              return false
            }
          });
console.log("new checkboxes ", checkboxesValues);
          console.log(this.IsEdit);
          //this.menteeForm.get('UnitOfTimeId').setValue(mentee['UnitOfTimeId'].toString());
          this.menteeForm.get('Interest').setValue(mentee['Interest']);
          this.menteeForm.get('Duration').setValue(mentee['Duration']);
          console.log(mentee['InDivision']);
          this.menteeForm.get('InDivision').setValue(mentee['InDivision'] ? mentee['InDivision'].toString() : '1');
          this.menteeForm.get('PreferredMentorEmpId').setValue(mentee['PreferredMentor']);
          console.log(mentee['PreferredMentorGenderId']);
          this.menteeForm.get('PreferredMentorGenderId').setValue(mentee['PreferredMentorGenderId'] ? mentee['PreferredMentorGenderId'].toString() : '20');
          this.menteeForm.get('PreferredMentorAgeId').setValue(mentee['PreferredMentorAgeId'] ? mentee['PreferredMentorAgeId'].toString() : '1');
          this.menteeForm.get('ExperienceId').setValue(mentee['MenteeExperience'][0]['ExperienceId'].toString());
          console.log(checkboxStatus);
          this.menteeForm.get('MentorDomianArea').setValue(checkboxesValues);
          this.menteeForm.get('Comment').setValue(mentee['Comment']);
          this.menteeForm.get('ShareProfile').setValue(mentee['ShareProfile']);
          this.menteeForm.get('ReadTerms').setValue(mentee['ReadTerms']);
        }

      }
    });
// sub 3
this.sub3 = this.menteeSelectors.mentees$.subscribe(mentees => {
  {
    console.log(mentees);
    if (mentees.length > 0 && false) {
      console.log("werweer");
      this.router.navigate(['mentee']);
    }
  }
});

  }
  getMenteeAndMetadata(id: number) {
    this.store.dispatch(new MenteeAction.GetMentee(id))
  }
  getAutoCompleteMentors() {
    this.filteredMentors$ = this.menteeForm
      .get('PreferredMentorEmpId')
      .valueChanges
      .pipe(
        startWith(''),
        // delay emits
        debounceTime(500),
        tap(() => { this.isLoading = true; }),
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
      .pipe(
        finalize(() => this.isLoading = false),
      )
  }// value addition to mentee division
  onMenteeInDivisionChanges() {
    console.log("divi value ", this.menteeForm.get('InDivision').value);
    this.menteeForm.get('InDivision').value ?
      this.menteeForm.get('PreferredMentorEmpId').enable() : this.menteeForm.get('PreferredMentorEmpId').disable();
    this.menteeForm.get('InDivision').valueChanges.subscribe(divi => {
      console.log("divi value ", divi);
      if (divi == undefined || divi == null) {
        console.log("disable ", divi);
        this.menteeForm.get('PreferredMentorEmpId').disable();
      } else {
        console.log("enable ", divi);
        this.menteeForm.get('PreferredMentorEmpId').enable();
      }

    }
    )
  }

  onMentorDomainAreaChange() {
    const domainSub = this.menteeForm.get('MentorDomianArea')
      .valueChanges
      .pipe(
        tap(s => console.log("before ", s[0])),
        //count(i => i[i] === true),
        //filter((val, index) => { console.log(index]);return val } ),
        tap(s => console.log(s))
      );
    domainSub.subscribe(
      res => {
        const updatedArrayCount = res.filter(i => i === true).length;
        if (updatedArrayCount <= 3) {
          console.log("Checkboxes count ",updatedArrayCount);
          this.menteeForm.get('MentorDomianArea').valid;
        } else {
          console.log("Checkboxes invalid  ",updatedArrayCount);
          this.menteeForm.get('MentorDomianArea').touched;
          this.menteeForm.invalid;
          this.menteeForm.get('MentorDomianArea').setErrors({ limit: true });
        }
      }
    );
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
      Division: this.mentee['Division']
    }
    return this.mentorSearchService.search(searchParams).pipe(
      // map the item property of the mentor search results as our return object
      map(results => {
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

  // action buttons
  //save all changes
  saveMentee(saveStatus) {
    const DomainIdArray = this.menteeForm.get('MentorDomianArea').value.map((val, i) => {
      if (val) {
        return { DomainId: this.sortedArrayDomainAreas[i]['Value'] }
      }
    }).filter(p => p !== undefined);
    //console.log(this.menteeForm.get('PreferredMentorEmpId'));
   // console.log(DomainIdArray);
    const saveMentee: Mentee = {
      MenteeId: this.mentee['MenteeId'], EmployeeId: this.mentee['EmployeeId'], InDivision: this.menteeForm.get('InDivision').value,
      Division: this.mentee['Division'],  //TenantId: 0,
      Interest: this.menteeForm.get('Interest').value,
      ServicePeriod: 0, Duration: this.menteeForm.get('Duration').value, UnitOfTimeId: this.menteeForm.get('UnitOfTimeId').value == 'Months' ? 1 : 0,
      YearsOfExperience: 0,
      //PreferredMentorId: this.EmployeeId,
      PreferredMentorEmpId: this.menteeForm.get('PreferredMentorEmpId').value ?
        this.menteeForm.get('PreferredMentorEmpId').value['EmployeeId'] : '',
      PreferredMentorGenderId: this.menteeForm.get('PreferredMentorGenderId').value,
      PreferredMentorAgeId: this.menteeForm.get('PreferredMentorAgeId').value,
      ShareProfile: this.menteeForm.get('ShareProfile').value,
      ReadTerms: this.menteeForm.get('ReadTerms').value,
      Comment: this.menteeForm.get('Comment').value,
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
      this.store.dispatch(new MenteeAction.UpdateMentee(saveMentee));
      //this.menteeForm.reset();
      this.sub4 = this.menteeSelectors.loading$.subscribe(loading => {
        {
          console.log("Is it loading ", loading);
          console.log("Is it save status ", saveStatus);
          this.saveStatus = saveStatus;
          if (!loading && this.saveStatus) {
            this.saveStatus = false;
            console.log("in routing ", this.saveStatus);
            this.router.navigate(['mentee']);
          }
        }
      });
      //console.log('Yes saved', saveMentee);
      // this.router.navigate(['mentee']);
    }
  }
  // refactor this code here
  submitMentee() {
    const DomainIdArray = this.menteeForm.get('MentorDomianArea').value.map((val, i) => {
      if (val) {
        return { DomainId: this.sortedArrayDomainAreas[i]['Value'] }
      }
    }).filter(p => p !== undefined);
    console.log(this.menteeForm.get('ExperienceId'));
    const saveMentee: Mentee = {
      MenteeId: this.mentee['MenteeId'], EmployeeId: this.mentee['EmployeeId'], InDivision: this.menteeForm.get('InDivision').value,
      Division: this.mentee['Division'],  //TenantId: 0,
      Interest: this.menteeForm.get('Interest').value,
      ServicePeriod: 0, Duration: this.menteeForm.get('Duration').value, UnitOfTimeId: this.menteeForm.get('UnitOfTimeId').value == 'Months' ? 1 : 0,
      YearsOfExperience: 0,
      //PreferredMentorId: this.EmployeeId,
      PreferredMentorEmpId: this.menteeForm.get('PreferredMentorEmpId').value['EmployeeId'],
      PreferredMentorGenderId: this.menteeForm.get('PreferredMentorGenderId').value,
      PreferredMentorAgeId: this.menteeForm.get('PreferredMentorAgeId').value,
      ShareProfile: this.menteeForm.get('ShareProfile').value,
      ReadTerms: this.menteeForm.get('ReadTerms').value,
      Comment: this.menteeForm.get('Comment').value,
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
      //this.menteeForm.reset();
      console.log('Yes saved', saveMentee);
      // this.sub3 = this.menteeSelectors.mentees$.subscribe(mentees => {
      //   {
      //     console.log(mentees);
      //     if (mentees.length > 0) {
      //       this.router.navigate(['mentee']);
      //     }
      //   }
      // });
      // 
    }
  }
  // cancel all changes
  cancelMentee() {
    const title = this.mentee['MenteeId'] == 0 ?
      'Cancel new signup' : `Are you sure?`;

    const msg = this.mentee['MenteeId'] == 0 ?
      'Do you want to reset the form?' : `This will cancel the edit and go back to your list.`;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';
    dialogConfig.data = {
      title: title,
      message: msg,
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((cancelIt) => {
      console.log('The dialog was closed');
      if (cancelIt) {
        if (this.mentee['MenteeId'] == 0) {
          this.menteeForm.reset();
        } else {
          // route to subscriptions
          this.router.navigate(['/mentee']);
        }

      }
    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
    this.sub3.unsubscribe();
    this.sub4.unsubscribe();
  }

}
