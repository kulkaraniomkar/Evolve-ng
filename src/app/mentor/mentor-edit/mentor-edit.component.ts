import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EntityState, MentorSelectors } from '../../store';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, RoutesRecognized, NavigationEnd, NavigationStart } from '@angular/router';
import { takeUntil, filter, pairwise, tap, takeLast, last } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import * as MentorAction from '../../store/actions';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Mentor, Experience, DomainArea, UnitOfTime } from '../../core/model/mentor';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ModalComponent } from '../../core/modal/modal.component';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'app-mentor-edit',
  templateUrl: './mentor-edit.component.html',
  styleUrls: ['./mentor-edit.component.scss']
})
export class MentorEditComponent implements OnInit, OnDestroy {

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  mentor: Mentor;
  unitOfTimes: UnitOfTime[];
  sortedArrayExperiences: Experience[];
  sortedArrayDomainAreas: DomainArea[];
  formControlsExperience: FormControl[];
  formControlsDomainArea: FormControl[];
  mentorForm: FormGroup;
  loading$: Observable<boolean>;
  private unsubscribe$ = new Subject<void>();

  title: string = 'New Signup';  // Title :: edit || signup || view 
  id: number; // id for the mentor
  IsEdit: boolean = false;
  closeSignupCard: boolean = true;
  private previousUrl: string = 'initialroute'; // route 
  registered: boolean = false;
  constructor(
    private store: Store<EntityState>,
    private mentorSelectors: MentorSelectors,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,

  ) {
    this.mentorSelectors.mentorRegistered$.pipe(takeUntil(this.unsubscribe$)).subscribe(
      r => {
        this.registered = r;
      }
    );
    this.loading$ = this.mentorSelectors.loading$;
  }

  ngOnInit() {
    /**
  * set the mode :: edit mentee, create new mentee, view mentee
  */
    // this.route.data
    //   .pipe(
    //     takeUntil(this.unsubscribe$)
    //   ).subscribe(data => {
    //     this.title = data['mode'] ? 'Edit Signup' : 'New Signup';
    //   });

    /* get the url */
    // this.getUrl();

    /* grab the id from the url or route */
    this.id = +this.route.snapshot.paramMap.get('id');
    /* dispatch action to load the mentee and mentee data
    * if id = 0 we load only  meta data
    */
    this.store.dispatch(new MentorAction.GetMentor(this.id));

    /**
    *  initialize form data
    */
    this.mentorSelectors
      .mentor$
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(mentor => {
        if (mentor) {
          /* set form meta data */
          this.getMentorForm(mentor);
          /* validator for checkboxes */
          this.onMentorDomainAreaChange();
          this.onMentorExperienceChange();
          /* Duration changes */
          this.onMentorDurationChange();
          // indivision changes
          // this.onMenteeInDivisionChanges();
          /** mode edit -> patch values 
           *  mentorId not zero -> patch values and 
           */

          if (this.mentor['MentorId']) {
            this.title = 'Edit signup';
            // this.router.navigate(['/mentor/subscriptions']);
            this.getPatchMentorValues();
          }
          //if()
          // console.log('222222', this.previousUrl);
          // if (this.previousUrl == '/mentor/subscriptions') {
          //   console.log('222222');
          //   // this.getPatchMentorValues();
          // } 

        }

      })
  }
  getMentorForm(mentor: Mentor) {
    this.mentor = mentor;
    this.unitOfTimes = mentor['UnitOfTimes']; // metadata for the form
    this.sortedArrayDomainAreas = this.mentor['DomainAreas'].sort((a, b) => a.OrderId - b.OrderId);
    let newExp = this.mentor['Experiences'].sort((a, b) => a.OrderId - b.OrderId);
    newExp.pop();
    this.sortedArrayExperiences = newExp;
    this.formControlsDomainArea = this.sortedArrayDomainAreas.map(control => new FormControl(false));
    this.formControlsExperience = this.sortedArrayExperiences.map(control => new FormControl(false));
    this.mentorForm = this.formBuilder.group({
      MentorId: [],
      Passion: ['', [Validators.required, Validators.maxLength(500)]],
      UnitOfTimeId: ['', Validators.required],
      Duration: ['', [Validators.required, Validators.min(1), Validators.max(18)]],
      Interest: ['', [Validators.required, Validators.maxLength(500)]],
      ProfessionalBackground: ['', [Validators.required, Validators.maxLength(50)]],
      //MentoringCommitment: ['', [Validators.required, Validators.maxLength(50)]],
      //UnitOfTime: ['', [Validators.required, Validators.max(18)]],
      PriorRoles: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      Comment: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(500)]],

      Experiences: this.formBuilder.array(this.formControlsExperience, this.minSelectedCheckboxes(1)),
      MentorDomianArea: this.formBuilder.array(this.formControlsDomainArea, this.minSelectedCheckboxes(1)),
      Available: [false],
      ReadTerms: [false, Validators.requiredTrue],
    });
    // set default to months
    const unitMonths = this.mentor['UnitOfTimes'][0]['Value'] == '1' ? 'Month(s)' : '';
    console.log(unitMonths);
    this.mentorForm.get('UnitOfTimeId').setValue(unitMonths);
    this.mentorForm.get('UnitOfTimeId').disable();
    this.mentorForm.get('Available').disable();

  }
  /*
  * on value change on mentor domain area
  */
  onMentorDomainAreaChange() {
    this.mentorForm.get('MentorDomianArea')
      .valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(
        res => {
          const updatedArrayCount = res.filter(i => i === true).length;
          if (updatedArrayCount > 0) {
            this.mentorForm.get('MentorDomianArea').valid;
          } else if (updatedArrayCount == 0) {
            this.mentorForm.get('MentorDomianArea').touched;
            this.mentorForm.invalid;
            this.mentorForm.get('MentorDomianArea').setErrors({ zero: true });
          }
        }
      );
  }
  /*
  * on value change on mentor experrience
  */
  onMentorExperienceChange() {
    this.mentorForm.get('Experiences')
      .valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe(
        res => {
          /** no specific selected */
          // if (res[res.length - 1]) {
          //   const nospecificValue = [false, false, false, false, false, false, false, false, false, false, false, true]
          //   this.mentorForm.get('Experiences').setValue(nospecificValue, { emitEvent: false });
          // }
          const updatedArrayCount = res.filter(i => i === true).length;
          if (updatedArrayCount > 0) {
            console.log(this.mentorForm.get('Experiences').value);
            this.mentorForm.get('Experiences').valid;
          } else if (updatedArrayCount == 0) {
            this.mentorForm.get('Experiences').touched;
            this.mentorForm.invalid;
            this.mentorForm.get('Experiences').setErrors({ zero: true });
          }
        }
      );
  }

  getPatchMentorValues() {
    this.IsEdit = true;
    const checkboxesValues = this.sortedArrayDomainAreas.map((val) => {
      if (val.Selected) {
        return true
      } else {
        return false
      }
    });
    const experienceValues = this.sortedArrayExperiences.map((val) => {
      if (val.Selected) {
        return true
      } else {
        return false
      }
    });
    //this.menteeForm.get('UnitOfTimeId').setValue(mentee['UnitOfTimeId'].toString());
    this.mentorForm.get('Interest').setValue(this.mentor['Interest']);
    this.mentorForm.get('Duration').setValue(this.mentor['MentoringCommitment']);
    this.mentorForm.get('Passion').setValue(this.mentor['Passion']);
    this.mentorForm.get('Available').setValue(this.mentor['Available'] ? true : false);
    this.mentorForm.get('PriorRoles').setValue(this.mentor['PriorRoles']);
    this.mentorForm.get('ProfessionalBackground').setValue(this.mentor['ProfessionalBackground']);
    this.mentorForm.get('ReadTerms').setValue(this.mentor['ReadTerms'] ? true : false);
    this.mentorForm.get('UnitOfTimeId').setValue(this.mentor['UnitOfTimeId']);
    this.mentorForm.get('Duration').setValue(this.mentor['MentoringCommitment']);
    this.mentorForm.get('Comment').setValue(this.mentor['Comment']);
    this.mentorForm.get('Experiences').setValue(experienceValues);
    this.mentorForm.get('MentorDomianArea').setValue(checkboxesValues);
  }
  /**
     * Cancel/Confirm dialog box
     */
  cancelMentor() {
    const title = this.mentor['MentorId'] == 0 ?
      'Cancel new signup?' : `Are you sure?`;

    const msg = this.mentor['MentorId'] == 0 ?
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
        if (this.mentor['MentorId'] == 0) {
          this.mentorForm.reset();
          /* set default to months */
          const unitMonths = this.mentor['UnitOfTimes'][0]['Value'] == '1' ? 'Month(s)' : '';
          this.mentorForm.get('UnitOfTimeId').setValue(unitMonths);
          this.mentorForm.get('UnitOfTimeId').disable();
          this.mentorForm.get('Available').disable();
        } else {
          // route to subscriptions
          this.router.navigate(['mentor/subscriptions']);
        }

      }
    });

  }
  /** close card */
  closeCard() {
    this.closeSignupCard = false;
  }
  /** end */
  /**
  *  on Duration change enable/disbale 
  * Available control
  */
  onMentorDurationChange() {
    this.mentorForm.get('Duration')
      .valueChanges
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(durationValue => {
        if (durationValue > 0) {
          this.mentorForm.get('Available').enable();
        } else {
          this.mentorForm.get('Available').disable();
        }

      }
      )
  }
  /**
   *  save all changes
   */
  onSaveMentor() {
    /* update valid form */
    if (this.mentorForm.valid) {
      this.store.dispatch(new MentorAction.UpdateMentor(this.objMentor(this.sortDomainArea(), this.sortExperience())));

    }

  }
  /**
   * 
   * on submit new signup
   */
  onSubmitMentor() {
    if (this.mentorForm.valid) {
      this.store.dispatch(new MentorAction.AddMentor(this.objMentor(this.sortDomainArea(), this.sortExperience())));
    } else {
      Object.keys(this.mentorForm.controls).forEach(field => { // {1}
        const control = this.mentorForm.get(field);            // {2}
        control.markAsTouched({ onlySelf: true });       // {3}
      });
      this.mentorForm.get('Experiences').markAsTouched;
      this.mentorForm.get('ReadTerms').markAsTouched;
      this.mentorForm.get('MentorDomianArea').markAsTouched;
      // this.mentorForm.get('Experiences').value.map(res => {
      //   if(res){
      //     this.mentorForm.get('Experiences').markAsTouched
      //   }
      // })
    }
  }
  /** validate all fields */
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
/** validate checkboxes */
minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);
      // console.log(totalSelected);
    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };
  // console.log('Validator ',validator);
  return validator;
}
  /* create an array of object in this format [{ DomainId: 23}] */
  sortDomainArea() {
    return this.mentorForm.get('MentorDomianArea').value.map((val, i) => {
      if (val) {
        return { DomainId: this.sortedArrayDomainAreas[i]['Value'] }
      }
    }).filter(p => p !== undefined);
  }
  /* create an array of object in this format [{ ExperienceId: 23}] */
  sortExperience() {
    return this.mentorForm.get('Experiences').value.map((val, i) => {
      if (val) {
        return { ExperienceId: this.sortedArrayExperiences[i]['Value'] }
      }
    }).filter(p => p !== undefined);
  }
  /**
   * 
   * @param DomainIdArray 
   */
  objMentor(DomainIdArray, ExperienceArray): Mentor {
    return {
      MentorId: this.mentor['MentorId'],
      EmployeeId: this.mentor['EmployeeId'],
      Interest: this.mentorForm.get('Interest').value,
      Passion: this.mentorForm.get('Passion').value,
      PriorRoles: this.mentorForm.get('PriorRoles').value,
      Available: this.mentorForm.get('Available').value,
      ProfessionalBackground: this.mentorForm.get('ProfessionalBackground').value,
      ReadTerms: this.mentorForm.get('ReadTerms').value,
      UnitOfTimeId: this.mentorForm.get('UnitOfTimeId').value == 'Months' ? 1 : 1,
      MentoringCommitment: this.mentorForm.get('Duration').value,
      Comment: this.mentorForm.get('Comment').value,
      MentorDomianArea: DomainIdArray,
      MentorExperience: ExperienceArray
    }
  }
  /**
   * url from sub
   */
  // getUrl() {
  //   this.router
  //     .events
  //     .pipe(
  //       filter(e => e instanceof NavigationEnd),
  //       pairwise(),
  //       tap(c => console.log(c))
  //       //takeUntil(this.unsubscribe$)
  //     )
  //     .subscribe(
  //       event => {
  //         this.previousUrl = event[0]['url'];
  //         console.log("new url ", this.previousUrl);
  //         // if (this.previousUrl == '/mentor/subscriptions') {
  //         //   console.log('Patch values sign up');
  //         //   this.getPatchMentorValues();
  //         // } 

  //         // if (this.mentor['MentorId'] == 0) {
  //         //   this.title = 'New Signup';
  //         //   console.log(this.previousUrl);
  //         //   console.log(this.mentor['MentorId']);
  //         // }

  //         if (this.mentor['MentorId'] > 0 && this.previousUrl != '/mentor/subscriptions') {
  //           /** redirect to list */
  //           console.log(this.previousUrl);
  //           console.log('mentor')
  //          // this.router.navigate(['mentor/subscriptions']);
  //         }
  //       });
  // }


  /**
   *  unsubscribe to all 
   */

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
