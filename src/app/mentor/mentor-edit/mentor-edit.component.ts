import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { EntityState, MentorSelectors } from '../../store';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import * as MentorAction from '../../store/actions';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

  title: string = 'New signup';  // Title :: edit || signup || view 
  id: number; // id for the mentor
  IsEdit: boolean = false;

  constructor(
    private store: Store<EntityState>,
    private mentorSelectors: MentorSelectors,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.loading$ = this.mentorSelectors.loading$;
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
          /** mode edit -> patch values */
          // mode Edit -> patch values
          if (this.mentor.MentorId > 0 ) {
            this.getPatchMentorValues();
          }
        }

      })
  }
  getMentorForm(mentor: Mentor) {
    this.mentor = mentor;
    this.unitOfTimes = mentor['UnitOfTimes']; // metadata for the form
    this.sortedArrayDomainAreas = this.mentor['DomainAreas'].sort((a, b) => a.OrderId - b.OrderId);
    this.sortedArrayExperiences = this.mentor['Experiences'].sort((a, b) => a.OrderId - b.OrderId);
    this.formControlsDomainArea = this.sortedArrayDomainAreas.map(control => new FormControl(false));
    this.formControlsExperience = this.sortedArrayExperiences.map(control => new FormControl(false));
    this.mentorForm = this.formBuilder.group({
      MentorId: [],
      Passion: ['', [Validators.required, Validators.maxLength(500)]],
      UnitOfTimeId: ['', Validators.required],
      Duration: ['', [Validators.required, Validators.min(1), Validators.max(18)]],
      Interest: ['', [Validators.required, Validators.maxLength(50)]],
      ProfessionalBackground: ['', [Validators.required, Validators.maxLength(50)]],
      //MentoringCommitment: ['', [Validators.required, Validators.maxLength(50)]],
      //UnitOfTime: ['', [Validators.required, Validators.max(18)]],
      PriorRoles: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      Comment: [],

      Experiences: this.formBuilder.array(this.formControlsExperience),
      MentorDomianArea: this.formBuilder.array(this.formControlsDomainArea),
      Available: [false],
      ReadTerms: [false, Validators.requiredTrue],
    });
    // set default to months
    const unitMonths = this.mentor['UnitOfTimes'][0]['Value'] == '1' ? 'Months' : '';
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
            console.log("Checkboxes count ", updatedArrayCount);
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
          const updatedArrayCount = res.filter(i => i === true).length;
          if (updatedArrayCount > 0) {
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
    console.log(experienceValues);
    //this.menteeForm.get('UnitOfTimeId').setValue(mentee['UnitOfTimeId'].toString());
    this.mentorForm.get('Interest').setValue(this.mentor['Interest']);
    this.mentorForm.get('Duration').setValue(this.mentor['MentoringCommitment']);    
    this.mentorForm.get('Passion').setValue(this.mentor['Passion']);
    this.mentorForm.get('Available').setValue(this.mentor['Available'] ? true : false);
    this.mentorForm.get('ProfessionalBackground').setValue(this.mentor['ProfessionalBackground']);
    this.mentorForm.get('ReadTerms').setValue(this.mentor['ReadTerms'] ? true : false);
    this.mentorForm.get('UnitOfTimeId').setValue(this.mentor['UnitOfTimeId']);
    this.mentorForm.get('Duration').setValue(this.mentor['MentoringCommitment']);
    this.mentorForm.get('Comment').setValue(this.mentor['Comment']);
    this.mentorForm.get('Experiences').setValue(experienceValues);
    this.mentorForm.get('MentorDomianArea').setValue(checkboxesValues);

    // this.mentorForm.get('Passion').setValue(this.mentor['Passion'] ? this.mentee['InDivision'].toString() : '1');
    // this.mentorForm.get('PreferredMentorEmpId').setValue(this.mentor['PreferredMentor']);
    // this.mentorForm.get('PreferredMentorGenderId').setValue(this.mentor['PreferredMentorGenderId'] ? this.mentee['PreferredMentorGenderId'].toString() : '20');
    // this.mentorForm.get('PreferredMentorAgeId').setValue(this.mentor['PreferredMentorAgeId'] ? this.mentee['PreferredMentorAgeId'].toString() : '1');
    // this.mentorForm.get('ExperienceId').setValue(this.mentee['MenteeExperience'][0]['ExperienceId'] ? this.mentee['MenteeExperience'][0]['ExperienceId'].toString() : '2');
    // this.mentorForm.get('MentorDomianArea').setValue(checkboxesValues);
   
    // this.mentorForm.get('ShareProfile').setValue(this.mentee['ShareProfile']);
    // this.menteeForm.get('ReadTerms').setValue(this.mentee['ReadTerms']);

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
        } else {
          // route to subscriptions
          this.router.navigate(['mentor']);
        }

      }
    });

  }
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
    }
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
      Available: this.mentorForm.get('Available').value,
      ProfessionalBackground: this.mentorForm.get('ProfessionalBackground').value,
      ReadTerms: this.mentorForm.get('ReadTerms').value,
      UnitOfTimeId: this.mentorForm.get('UnitOfTimeId').value == 'Months' ? 1 : 0,
      MentoringCommitment: this.mentorForm.get('Duration').value,
      Comment: this.mentorForm.get('Comment').value,
      MentorDomianArea: DomainIdArray,
      MentorExperience: ExperienceArray
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
