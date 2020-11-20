import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import * as MenteeActions from 'src/app/store/actions/mentee.action';
import * as MentorActions from 'src/app/store/actions/mentor.action';
import { IAppState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { selectMenteeState, selectLoadingMentee } from 'src/app/store/selectors/mentee.selector';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { IMentee } from 'src/app/models/mentee.interface';
import { FormBuilder, Validators, FormControl, ValidatorFn, FormArray, FormGroup } from '@angular/forms';
import { NzMarks } from 'ng-zorro-antd/slider';
import { ISuggestedMentor, ISuggestedMentorParams } from 'src/app/models/mentor.interface';
import { selectSuggestedMentor, selectLoadingSearchMentor } from 'src/app/store/selectors/mentor.selector';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';
declare var require: any;
// const data = require('./data.json');
const data = require('./data-prod.json');
// const data = require('./data-prod.json');

@Component({
  selector: 'app-mentee-signup',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mentee-signup.component.html',
  styleUrls: ['./mentee-signup.component.scss']
})
export class MenteeSignupComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  menteeData: IMentee;
  searchResults: ISuggestedMentor[];
  loading: boolean;
  submitFormStatus: boolean = false;
  loadingSearchMentor: boolean;
  marks: NzMarks = {
    1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12', 13: '13', 14: '14', 15: '15', 16: '16', 17: '17',
    18: {
      style: {
        color: '#f50'
      },
      label: '<strong>18 month(s)</strong>'
    }
  };
  /** mentor signup form */
  domainAreasMeta = data['DomainAreas'];
  experiencesMeta = data['Experiences'];
  signupForm = this._fb.group({
    interest: [null, [Validators.required, Validators.maxLength(200)]],
    duration: [1, [Validators.required, Validators.min(1), Validators.max(18)]],
    preferredMentorStatus: [null, [Validators.required]],
    preferredMentor: [null],
    preferredMentorGenderId: [null, [Validators.required]],
    preferredMentorAgeId: [null, [Validators.required]],
    domainAreas: this._fb.array(this.domainAreasMeta.map(c => new FormControl(c.checked))),
    experiences: ['', Validators.required],
    comment: ['', [Validators.required, Validators.maxLength(300)]],
    shareProfile: [false],
    readTerms: [false, Validators.requiredTrue],
  });


  constructor(
    private _store: Store<IAppState>,
    private _fb: FormBuilder,
    private modalService: NzModalService,
    private _router: Router
  ) {
    /*
  * on value change on mentor domain area
  */
    this.signupForm.get('domainAreas').valueChanges.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(
      res => {
        const updatedArrayCount = res.filter(i => i === true).length;
        if (updatedArrayCount <= 3 && updatedArrayCount > 0) {
          console.log("Checkboxes count ", updatedArrayCount);
          this.signupForm.get('domainAreas').valid;
        } else if (updatedArrayCount == 0) {
          this.signupForm.get('domainAreas').touched;
          this.signupForm.invalid;
          this.signupForm.get('domainAreas').setErrors({ zero: true });
        } else {
          console.log("Checkboxes invalid  ", updatedArrayCount);
          console.log("Controls ", this.signupForm.get('domainAreas'));
          this.signupForm.get('domainAreas').touched;
          this.signupForm.invalid;
          this.signupForm.get('domainAreas').setErrors({ limit: true });
        }
      }
    );
    this._store.pipe(select(selectSuggestedMentor)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      results => this.searchResults = results
    );
    this._store.pipe(select(selectLoadingSearchMentor)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      loading => this.loadingSearchMentor = loading
    );
    this._store.pipe(select(selectMenteeState)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => {
        this.menteeData = data;
        console.log(this.menteeData);
        if (this.menteeData && this.menteeData['MenteeId']) { // not zero means already registered
          console.log(this.menteeData['PreferredMentorAgeId']);
          this.signupForm.get('interest').patchValue(this.menteeData['Interest']);
          this.signupForm.get('duration').patchValue(this.menteeData['Duration']);
          this.menteeData['PreferredMentor'] ? this.signupForm.get('preferredMentor').patchValue(this.menteeData['PreferredMentor']['FullName']) : '';
          this.menteeData['PreferredMentor'] ? this.signupForm.get('preferredMentorStatus').patchValue("yes") : this.signupForm.get('preferredMentorStatus').patchValue("no");
          this.signupForm.get('preferredMentorGenderId').patchValue(this.menteeData['PreferredMentorGenderId'].toString());
          this.signupForm.get('preferredMentorAgeId').patchValue(this.menteeData['PreferredMentorAgeId'].toString());
          this.signupForm.get('experiences').patchValue(this.menteeData['MenteeExperience'][0]['ExperienceId'].toString());
          const patchDomainAreas = this.domainAreasMeta.map(d => {
            if (this.menteeData['MenteeDomianArea'].find(m => m.DomainId == d.value)) {
              d.checked = true;
              return true;
            }
            return false;
          });
          console.log(patchDomainAreas);
          this.signupForm.get('domainAreas').patchValue(patchDomainAreas);
          this.signupForm.get('comment').patchValue(this.menteeData['Comment']);
          this.signupForm.get('shareProfile').patchValue(this.menteeData['ShareProfile']);
          this.signupForm.get('readTerms').patchValue(this.menteeData['ReadTerms']);
        }

      }
    );
    this._store.pipe(select(selectLoadingMentee)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      loading => this.loading = loading
    );
  }

  inputValue: string;
  optionsMentors: ISuggestedMentor[];
  options: string[] = [];
  onInput(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    if (value && value.length < 3) {
      this.options = [];
    } else {
      const payload: ISuggestedMentorParams = {
        SearchId: 1,
        SearchString: value,
        Limit: 5,
        bu: this.menteeData['bu']
      }
      this._store.dispatch(new MentorActions.SuggestMentorByStr(payload));
      console.log('weee ', value);
      // this.options = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    }
    // if (!value || value.indexOf('@') >= 0) {
    //   this.options = [];
    // } else {
    //   this.options = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
    // }
  }
  ngOnInit() {
    // this._store.dispatch(new MenteeActions.GetMenteeById(1015));
    this.notifyDelay()
  }
  notifyDelay(): void {
    const modal = this.modalService.success({
      nzTitle: 'Dear Prospective Mentee',
      nzContent: 'Thank you for your interest in signing up as a mentee. The success of a mentoring relationship often depends on the fit between mentee and mentor. <br/><br/>We facilitate this through highly selective pairing of mentee and mentor, followed by an exploratory chat between mentee and mentor to ‘test’ connection. <br/>Once we receive your feedback, a call is made on whether to go ahead with the mentoring relationship or go back to the drawing board. <br/><br/>We are looking to establish more mentor capacity and will be calling for mentors to sign up shortly, post which you will be able to sign up as a mentee. Please be on the look-out for a mail in this regard over the next few weeks.<br/><br/>We look forward to formally welcoming you into the mentoring community soon. Should you have a need for ad hoc mentoring, we have an offering called Coffee Connect, which allows for once off chats with Connectors (Informal mentors). <br/>Please click <em><a href="https://firstrandgroup.sharepoint.com/sites/RMB/thegrowlounge/SitePages/Coffee-Connect.aspx"  target="_blank"><strong>here</strong></a></em>  for more information. <br/> For any queries, please contact the <em><a href="mailto:mentoring&connection@rmb.co.za"><strong>Grow Lounge</strong>.</a></em>',
      //nzOnOk: () => false,
      nzOnOk: () => new Promise((resolve, reject) => {
        resolve(this._router.navigateByUrl('/mentee/my-subscriptions')),
          reject(this._router.navigateByUrl('/mentee/my-subscriptions'))

      }),
      nzOkText: 'Continue ...',
      nzOkDisabled: false,
      nzWidth: 620
    });
  }
  submitForm(): void {
    console.log('submit ', this.signupForm);
    this.submitFormStatus = true;
    if (this.signupForm.valid) {
      console.log('submit valid');
      this._store.dispatch(new MenteeActions.AddMentee(this.objMentee(this.sortDomainArea())));
    }
    console.log(this.objMentee(this.sortDomainArea()));
  }
  updateForm() {
    console.log('Update ', this.signupForm);
    this.submitFormStatus = true;
    if (this.signupForm.valid) {
      this._store.dispatch(new MenteeActions.UpdateMentee(this.objMentee(this.sortDomainArea())));
    }
  }
  /* create an array of object in this format [{ DomainId: 23}] */
  sortDomainArea() {
    return this.signupForm.get('domainAreas').value.map((val, i) => {
      if (val) {
        return { DomainId: this.domainAreasMeta[i]['value'] }
      }
    }).filter(p => p !== undefined);
  }
  objMentee(DomainIdArray: Array<{ DomainId: number }>): IMentee {
    console.log('Search results ', this.signupForm.get('preferredMentor'));
    const preferredMentor = this.signupForm.get('preferredMentorStatus').value == 'yes' ? this.searchResults ? this.searchResults.filter(c => c.FullName == this.signupForm.get('preferredMentor').value)[0] : this.menteeData['PreferredMentor'] : null;
    // const preferredMentorEmpId = this.signupForm.get('preferredMentorStatus').value == 'yes' ? this.searchResults ? this.searchResults.filter(c => c.FullName == this.signupForm.get('preferredMentor').value)[0] : this.signupForm.get('preferredMentor').value : null;
    return {
      MenteeId: this.menteeData['MenteeId'],
      EmployeeId: this.menteeData['EmployeeId'],
      InDivision: this.signupForm.get('preferredMentorStatus').value == 'yes' ? 1 : 2,
      Division: this.menteeData['Division'],  //TenantId: 0,
      Interest: this.signupForm.get('interest').value,
      ServicePeriod: 0,
      Duration: this.signupForm.get('duration').value,
      UnitOfTimeId: 1,
      YearsOfExperience: this.menteeData['YearsOfExperience'],
      //PreferredMentorId: this.EmployeeId,
      PreferredMentorEmpId: this.signupForm.get('preferredMentorStatus').value == 'yes' ? preferredMentor.EmployeeId : '',
      PreferredMentor: preferredMentor,
      PreferredMentorGenderId: this.signupForm.get('preferredMentorGenderId').value,
      PreferredMentorAgeId: this.signupForm.get('preferredMentorAgeId').value,
      ShareProfile: this.signupForm.get('shareProfile').value,
      ReadTerms: this.signupForm.get('readTerms').value,
      Comment: this.signupForm.get('comment').value,
      CreatedDate: new Date,
      MenteeDomianArea: DomainIdArray,
      MenteeExperience: [{
        ExperienceId: this.signupForm.get('experiences').value,
        MenteeExperienceId: this.signupForm.get('experiences').value, MenteeId: this.menteeData['MenteeId']
      }],

    }


  }

  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
