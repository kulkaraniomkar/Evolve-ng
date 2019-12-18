import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EntityState, MenteeSelectors } from '../../store';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import * as MenteeAction from '../../store/actions';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Mentee, UnitOfTime, Gender, SearchParam, AgePreference, DomainArea, Experience } from '../../core/model/mentee';
import { Observable, Subject, of } from 'rxjs';
import { SearchResults, SearchParams } from '../../core/model/mentor-search';
import { takeUntil, startWith, filter, map, debounceTime, tap, switchMap, finalize, catchError } from 'rxjs/operators';
import { MentorSearchService } from '../mentor-search.service';
import { ModalComponent } from '../../core/modal/modal.component';

@Component({
  selector: 'app-mentee-edit',
  templateUrl: './mentee-edit.component.html',
  styleUrls: ['./mentee-edit.component.scss']
})
export class MenteeEditComponent implements OnInit, OnDestroy {

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  mentee: Mentee;
  unitOfTimes: UnitOfTime[];
  gender: Gender[];
  searchDivisions: SearchParam[];
  age: AgePreference[];
  sortedArrayDomainAreas: DomainArea[];
  sortedArrayExperiences: Experience[];
  loading$: Observable<boolean>;
  filteredMentors$: Observable<SearchResults[]>;
  menteeForm: FormGroup;
  formControlsDomainArea: FormControl[];
  formControlsExperience: FormControl[];

  private unsubscribe$ = new Subject<void>();
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
    /**
     * set the mode :: edit mentee, create new mentee, view mentee
     */
    this.route.data
      .pipe(
        takeUntil(this.unsubscribe$)
      ).subscribe(data => {
        this.title = data['mode'];
      })
    /* grab the id from the url or route */
    this.id = +this.route.snapshot.paramMap.get('id');
    /* dispatch action to load the mentee and mentee data
    * if id = 0 we load only  meta data
    */
    this.store.dispatch(new MenteeAction.GetMentee(this.id));
    /**
     *  initialize form data
     */
    this.menteeSelectors
      .mentee$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(mentee => {
        if (mentee) {
          /* set form meta data */
          this.getMenteeForm(mentee);
          // auto complete
          this.getAutoCompleteMentors();
          // validator for checkboxes 
          this.onMentorDomainAreaChange();
          // indivision changes
          this.onMenteeInDivisionChanges();
          /** mode edit -> patch values */
          // mode Edit -> patch values
          if (this.title === 'Edit Mentee') {
            this.getPatchMenteeValues();
          }
        }

      })
  }


  getMenteeForm(mentee) {
    this.mentee = mentee;
    this.unitOfTimes = mentee['UnitOfTimes']; // metadata for the form
    this.gender = mentee['Gender'].sort((a: { OrderId: number; }, b: { OrderId: number; }) => a.OrderId - b.OrderId); // metadata for gender
    this.age = mentee['AgePreference'].sort((a: { OrderId: number; }, b: { OrderId: number; }) => a.OrderId - b.OrderId); // metadata for age
    this.searchDivisions = mentee['SearchParams']; // metadata for gender
    this.sortedArrayDomainAreas = this.mentee['DomainAreas'].sort((a, b) => a.OrderId - b.OrderId);
    this.sortedArrayExperiences = this.mentee['Experiences'].sort((a, b) => a.OrderId - b.OrderId);
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
    const unitMonths = this.mentee['UnitOfTimes'][0]['Selected'] ? 'Months' : '';
    this.menteeForm.get('UnitOfTimeId').setValue(unitMonths);
    this.menteeForm.get('UnitOfTimeId').disable();
  }
  /**
   * Autocomplete
   */
  getAutoCompleteMentors() {
    this.filteredMentors$ = this.menteeForm
      .get('PreferredMentorEmpId')
      .valueChanges
      .pipe(
        /* if character length greater than 2 */
        filter(res => {
          if (res) {
            return res.length > 2
          }
        }),
        //startWith(''),
        /* delay emits */
        debounceTime(1000),
        tap(() => { this.isLoading = true; }),
        /* use switch map so as to cancel previous subscribed events,
        * before creating new once
        */
        switchMap(value => {
          if (value !== '') {
            /** lookup from mentor */
            return this.lookup(value);
          } else {
            /** if no value is present, return null */
            return of(null);
          }
        })
      )
      .pipe(
        finalize(() => this.isLoading = false),
      )
  }
  /**
   * lookup 
   */
  lookup(value): Observable<SearchResults[]> {
    console.log(this.mentee['Division']);
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
  /*
  * on value change on mentor domain area
  */
  onMentorDomainAreaChange() {
    this.menteeForm.get('MentorDomianArea')
      .valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(
        res => {
          const updatedArrayCount = res.filter(i => i === true).length;
          if (updatedArrayCount <= 3 && updatedArrayCount > 0) {
            console.log("Checkboxes count ", updatedArrayCount);
            this.menteeForm.get('MentorDomianArea').valid;
          } else if (updatedArrayCount == 0) {
            this.menteeForm.get('MentorDomianArea').touched;
            this.menteeForm.invalid;
            this.menteeForm.get('MentorDomianArea').setErrors({ zero: true });
          } else {
            console.log("Checkboxes invalid  ", updatedArrayCount);
            this.menteeForm.get('MentorDomianArea').touched;
            this.menteeForm.invalid;
            this.menteeForm.get('MentorDomianArea').setErrors({ limit: true });
          }
        }
      );
  }
  /**
   *  on InDivision change enable/disbale 
   * preferredmentorempid control
   */
  onMenteeInDivisionChanges() {
    this.menteeForm.get('InDivision').value ?
      this.menteeForm.get('PreferredMentorEmpId').enable() : this.menteeForm.get('PreferredMentorEmpId').disable();

    this.menteeForm.get('InDivision')
      .valueChanges
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(divisionValue => {
        if (divisionValue == undefined || divisionValue == null) {
          this.menteeForm.get('PreferredMentorEmpId').disable();
        } else {
          this.menteeForm.get('PreferredMentorEmpId').enable();
        }

      }
      )
  }
  getPatchMenteeValues() {
    this.IsEdit = true;
    const checkboxesValues = this.sortedArrayDomainAreas.map((val) => {
      if (val.Selected) {
        return true
      } else {
        return false
      }
    });
    const checkboxesExperience = this.sortedArrayExperiences.map((val) => {
      if (val.Selected) {
        return true
      } else {
        return false
      }
    });

    //this.menteeForm.get('UnitOfTimeId').setValue(mentee['UnitOfTimeId'].toString());
    this.menteeForm.get('Interest').setValue(this.mentee['Interest']);
    this.menteeForm.get('Duration').setValue(this.mentee['Duration']);
    this.menteeForm.get('InDivision').setValue(this.mentee['InDivision'] ? this.mentee['InDivision'].toString() : '1');
    this.menteeForm.get('PreferredMentorEmpId').setValue(this.mentee['PreferredMentor']);
    this.menteeForm.get('PreferredMentorGenderId').setValue(this.mentee['PreferredMentorGenderId'] ? this.mentee['PreferredMentorGenderId'].toString() : '20');
    this.menteeForm.get('PreferredMentorAgeId').setValue(this.mentee['PreferredMentorAgeId'] ? this.mentee['PreferredMentorAgeId'].toString() : '1');
    this.menteeForm.get('ExperienceId').setValue(this.mentee['MenteeExperience'][0] ? this.mentee['MenteeExperience'][0]['ExperienceId'].toString() : '2');
    this.menteeForm.get('MentorDomianArea').setValue(checkboxesValues);
    this.menteeForm.get('Comment').setValue(this.mentee['Comment']);
    this.menteeForm.get('ShareProfile').setValue(this.mentee['ShareProfile']);
    this.menteeForm.get('ReadTerms').setValue(this.mentee['ReadTerms']);

  }
  /**
   * Display on input property
   */
  displayFn(empl: SearchResults) {
    if (empl) { return empl.FullName; }
  }

  /**
   * Cancel/Confirm dialog box
   */
  cancelMentee() {
    const title = this.mentee['MenteeId'] == 0 ?
      'Cancel new signup?' : `Are you sure?`;

    const msg = this.mentee['MenteeId'] == 0 ?
      'This will reset your form.' : `This will cancel the edit and go back to your list.`;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '350px';
    dialogConfig.data = {
      title: title,
      message: msg,
    };

    const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

    dialogRef.afterClosed().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((cancelIt) => {
      if (cancelIt) {
        if (this.mentee['MenteeId'] == 0) {
          this.menteeForm.reset();
          // set default to months
          const unitMonths = this.mentee['UnitOfTimes'][0]['Value'] == 1 ? 'Months' : '';
          this.menteeForm.get('UnitOfTimeId').setValue(unitMonths);
          this.menteeForm.get('UnitOfTimeId').disable();
        } else {
          // route to subscriptions
          this.router.navigate(['mentee']);
        }

      }
    });

  }
  /**
   *  save all changes
   */
  onSaveMentee() {
    /* update valid form */
    if (this.menteeForm.valid) {
      this.store.dispatch(new MenteeAction.UpdateMentee(this.objMentee(this.sortDomainArea())));

    }

  }
  /**
   * 
   * on submit new signup
   */
  onSubmitMentee() {
    if (this.menteeForm.valid) {
      this.store.dispatch(new MenteeAction.AddMentee(this.objMentee(this.sortDomainArea())));
    }
  }

  /* create an array of object in this format [{ DomainId: 23}] */
  sortDomainArea() {
    return this.menteeForm.get('MentorDomianArea').value.map((val, i) => {
      if (val) {
        return { DomainId: this.sortedArrayDomainAreas[i]['Value'] }
      }
    }).filter(p => p !== undefined);
  }
  /**
   * 
   * @param DomainIdArray 
   */
  objMentee(DomainIdArray): Mentee {
    console.log(this.menteeForm.get('UnitOfTimeId').value);
    return {
      MenteeId: this.mentee['MenteeId'], EmployeeId: this.mentee['EmployeeId'], InDivision: this.menteeForm.get('InDivision').value,
      Division: this.mentee['Division'],  //TenantId: 0,
      Interest: this.menteeForm.get('Interest').value,
      ServicePeriod: 0, Duration: this.menteeForm.get('Duration').value,
      UnitOfTimeId: this.menteeForm.get('UnitOfTimeId').value == 'Months' ? 1 : 1,
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

    }


  }
  /**
   *  unsubscribe to all 
   */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
