import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as MentorActions from 'src/app/store/actions/mentor.action';
import { IAppState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { selectMentorState, selectLoadingMentor, selectSignupStatusMentor } from 'src/app/store/selectors/mentor.selector';
import { IMentor, IMentorEdit } from 'src/app/models/mentor.interface';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { requireCheckboxesToBeCheckedValidator } from './require-checkboxes-to-be-checked.validators';
declare var require: any
const data = require('./data.json');
@Component({
  selector: 'app-mentor-signup',
  templateUrl: './mentor-signup.component.html',
  styleUrls: ['./mentor-signup.component.scss']
})
export class MentorSignupComponent implements OnInit, OnDestroy {
  mentorData: IMentor = null;
  private unsubscribe$ = new Subject<void>();
  //signupForm: FormGroup;
  signupStatus: boolean;
  loading: boolean;
  /** mentor signup form */
  signupForm = this.fb.group({
    professionalBackground: [null, [Validators.required, Validators.maxLength(50)]],
    interest: [null, [Validators.required, Validators.maxLength(200)]],
    passion: [null, [Validators.required, Validators.maxLength(200)]],
    priorRoles: [null, [Validators.required, Validators.maxLength(50)]],
    menteeMaxCount: [null, [Validators.required, Validators.max(3), Validators.min(1)]],
    /** Experience checkboxes */
    experienceCheckboxGroup: this.fb.group({
      businessTechnology: [],
      clientService: [],
      credit: [],
      finance: [],
      humanCapital: [],
      legalRiskCompliance: [],
      marketingCommunication: [],
      operationProcess: [],
      supportService: [],
      transacting: [],
      trading: [],
      nonSpecific: [],
    }, requireCheckboxesToBeCheckedValidator()),
    domainAreaCheckboxGroup: this.fb.group({
      /** domain areas */
      broadenKnowledge: [],
      enhanceTechnical: [],
      dealDiversity: [],
      honeLeadership: [],
      managingCareer: [],
      relationshipBuilding: [],
      enhanceInfluence: [],
      betterIntergrateBusiness: [],
      offeringCareerGuidance: [],
      helpingNavigateSystem: [],
    }, requireCheckboxesToBeCheckedValidator()),

    /** comment and t&c */
    comment: [null, [Validators.required, Validators.maxLength(200)]],
    available: [],
    shareProfile: [],
    readTerms: [],

  });
  /** Select number of mentee */
  selectedMenteeMaxCount = 2;
  listOfMenteeMaxCountOption = [{ label: 'One mentee', value: 1, type: 'user' },
  { label: 'Two mentees', value: 2, type: 'user-add' }, { label: 'Three mentees', value: 3, type: 'usergroup-add' }];
  /** Experiences */
  businessTechnologyModel: boolean = false;
  clientServiceModel: boolean = false;
  creditModel: boolean = false;
  financeModel: boolean = false;
  humanCapitalModel: boolean = false;
  legalModel: boolean = false;
  marketingModel: boolean = false;
  operationsModel: boolean = false;
  supportServiceModel: boolean = false;
  transactingModel: boolean = false;
  tradingModel: boolean = false;
  nonSpecificModel: boolean = false;
  /** Areas */
  broadenKnowledgeModel: boolean = false;
  helpingNavigateSystemModel: boolean = false;
  enhanceTechnicalModel: boolean = false;
  dealDiversityModel: boolean = false;
  honeLeadershipModel: boolean = false;
  managingCareerModel: boolean = false;
  relationshipBuildingModel: boolean = false;
  enhanceInfluenceModel: boolean = false;
  betterIntergrateBusinessModel: boolean = false;
  marketingCommunicationModel: boolean = false;
  offeringCareerGuidanceModel: boolean = false;
  /** terms, available and share */
  availableModel: boolean = false;
  shareProfileModel: boolean = false;
  readTermsModel: boolean = false;
  /** for testing */
  // mmm: any;
  // mentorshipCount = [{ value: 1, label: 'One mentee'}, { value: 2, label: 'Two mentees'}, { value: 3, label: 'Three mentees'}];
  // mentorshipCountValue = { value: 2, label: 'Two mentees'};
  constructor(
    private _store: Store<IAppState>,
    private _modalService: NzModalService,
    private fb: FormBuilder,
  ) {
    this._store.pipe(select(selectSignupStatusMentor)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      registered => this.signupStatus = registered
    );
    this._store.pipe(select(selectMentorState)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      data => {
        if (data) {
          this.mentorData = data;
          console.log(this.mentorData['PriorRoles'])
          this.signupForm.get('professionalBackground').setValue(this.mentorData['ProfessionalBackground']);
          this.signupForm.get('interest').patchValue(this.mentorData['Interest']);
          this.signupForm.get('passion').patchValue(this.mentorData['Passion']);
          this.signupForm.get('menteeMaxCount').patchValue(this.mentorData['MenteeMaxCount']);
          this.signupForm.get('priorRoles').patchValue(this.mentorData['PriorRoles']);
          this.businessTechnologyModel = this.mentorData['Experiences'].find(bt => bt['Name'] == 'businessTechnology')['Selected'];

          this.clientServiceModel = this.mentorData['Experiences'].find(cs => cs['Name'] == 'clientService')['Selected'];
          //this.signupForm.get('clientService').patchValue(this.clientServiceModel);
          this.creditModel = this.mentorData['Experiences'].find(bt => bt['Name'] == 'credit')['Selected'];
          // this.signupForm.get('credit').patchValue(this.creditModel);
          this.financeModel = this.mentorData['Experiences'].find(cs => cs['Name'] == 'finance')['Selected'];
          // this.signupForm.get('finance').patchValue(this.financeModel);
          this.humanCapitalModel = this.mentorData['Experiences'].find(bt => bt['Name'] == 'humanCapital')['Selected'];
          // this.signupForm.get('humanCapital').patchValue(this.humanCapitalModel);
          this.legalModel = this.mentorData['Experiences'].find(cs => cs['Name'] == 'legalRiskCompliance')['Selected']
          // this.signupForm.get('legalRiskCompliance').patchValue(this.legalModel);
          this.marketingModel = this.mentorData['Experiences'].find(bt => bt['Name'] == 'marketingCommunication')['Selected'];
          //this.signupForm.get('marketingCommunication').patchValue(this.marketingModel);
          this.operationsModel = this.mentorData['Experiences'].find(cs => cs['Name'] == 'operationProcess')['Selected'];
          //this.signupForm.get('operationProcess').patchValue(this.operationsModel);
          this.supportServiceModel = this.mentorData['Experiences'].find(ss => ss['Name'] == 'supportService')['Selected'];
          //this.signupForm.get('supportService').patchValue(this.supportServiceModel);
          this.transactingModel = this.mentorData['Experiences'].find(t => t['Name'] == 'transacting')['Selected'];
          //this.signupForm.get('transacting').patchValue(this.transactingModel);
          this.tradingModel = this.mentorData['Experiences'].find(tr => tr['Name'] == 'trading')['Selected'];
          //this.signupForm.get('trading').patchValue(this.tradingModel);
          this.nonSpecificModel = this.mentorData['Experiences'].find(ns => ns['Name'] == 'nonSpecific')['Selected'];
          //this.signupForm.get('nonSpecific').patchValue(this.nonSpecificModel);
          this.signupForm.get('experienceCheckboxGroup').patchValue({
            'experienceCheckboxGroup': {
              businessTechnology: this.businessTechnologyModel,
              clientService: this.clientServiceModel,
              credit: this.creditModel,
              finance: this.financeModel,
              humanCapital: this.humanCapitalModel,
              legalRiskCompliance: this.legalModel,
              operationProcess: this.operationsModel,
              supportService: this.supportServiceModel,
              transacting: this.transactingModel,
              trading: this.tradingModel,
              nonSpecific: this.nonSpecificModel
            }
          });

          this.broadenKnowledgeModel = this.mentorData['DomainAreas'].find(bt => bt['Name'] == 'broadenKnowledge')['Selected'];
          //this.signupForm.get('broadenKnowledge').patchValue(this.broadenKnowledgeModel);
          this.enhanceTechnicalModel = this.mentorData['DomainAreas'].find(cs => cs['Name'] == 'enhanceTechnical')['Selected'];
          //this.signupForm.get('enhanceTechnical').patchValue(this.enhanceTechnicalModel);
          this.dealDiversityModel = this.mentorData['DomainAreas'].find(bt => bt['Name'] == 'dealDiversity')['Selected'];
          // this.signupForm.get('dealDiversity').patchValue(this.dealDiversityModel);
          this.honeLeadershipModel = this.mentorData['DomainAreas'].find(cs => cs['Name'] == 'honeLeadership')['Selected'];
          //this.signupForm.get('honeLeadership').patchValue(this.honeLeadershipModel);
          this.managingCareerModel = this.mentorData['DomainAreas'].find(bt => bt['Name'] == 'managingCareer')['Selected'];
          // this.signupForm.get('managingCareer').patchValue(this.managingCareerModel);
          this.relationshipBuildingModel = this.mentorData['DomainAreas'].find(cs => cs['Name'] == 'relationshipBuilding')['Selected'];
          //this.signupForm.get('relationshipBuilding').patchValue(this.relationshipBuildingModel);
          this.enhanceInfluenceModel = this.mentorData['DomainAreas'].find(bt => bt['Name'] == 'enhanceInfluence')['Selected'];
          //this.signupForm.get('enhanceInfluence').patchValue(this.enhanceInfluenceModel);
          this.betterIntergrateBusinessModel = this.mentorData['DomainAreas'].find(cs => cs['Name'] == 'betterIntergrateBusiness')['Selected'];
          //this.signupForm.get('betterIntergrateBusiness').patchValue(this.betterIntergrateBusinessModel);
          this.offeringCareerGuidanceModel = this.mentorData['DomainAreas'].find(ss => ss['Name'] == 'offeringCareerGuidance')['Selected'];
          //this.signupForm.get('offeringCareerGuidance').patchValue(this.offeringCareerGuidanceModel);
          this.helpingNavigateSystemModel = this.mentorData['DomainAreas'].find(t => t['Name'] == 'helpingNavigateSystem')['Selected'];
          // this.signupForm.get('helpingNavigateSystem').patchValue(this.helpingNavigateSystemModel);
          this.signupForm.get('domainAreaCheckboxGroup').patchValue({
            'domainAreaCheckboxGroup': {
              broadenKnowledge: this.broadenKnowledgeModel,
              enhanceTechnical: this.enhanceTechnicalModel,
              dealDiversity: this.dealDiversityModel,
              honeLeadership: this.honeLeadershipModel,
              managingCareer: this.managingCareerModel,
              relationshipBuilding: this.relationshipBuildingModel,
              enhanceInfluence: this.enhanceInfluenceModel,
              betterIntergrateBusiness: this.betterIntergrateBusinessModel,
              offeringCareerGuidance: this.transactingModel,
              helpingNavigateSystem: this.helpingNavigateSystemModel
            }
          });

          this.signupForm.get('comment').patchValue(this.mentorData['Comment']);
          this.availableModel = this.mentorData['Available'];
          this.shareProfileModel = this.mentorData['ShareProfile'];
          this.readTermsModel = this.mentorData['ReadTerms'];
          this.signupForm.get('available').patchValue(this.mentorData['Available']);
          this.signupForm.get('shareProfile').patchValue(this.mentorData['ShareProfile']);
          this.signupForm.get('readTerms').patchValue(this.mentorData['ReadTerms']);

        }

      }
    );
    this._store.pipe(select(selectLoadingMentor)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      loading => this.loading = loading
    );

  }

  ngOnInit() {
    this.notifyDelay()
    this._store.dispatch(new MentorActions.GetMentorById(0));
  }
  notifyDelay(): void {
    const modal = this._modalService.success({
      nzTitle: 'Dear Mentor',
      nzContent: 'Thank you for your interest in signing up as a mentor. The success of a mentoring relationship often depends on the fit between mentee and mentor. <br/><br/> We facilitate this through highly selective pairing of mentee and mentor, followed by an exploratory chat between mentee and mentor to ‘test’ connection. <br/>Once we receive your feedback, a call is made on whether to go ahead with the mentoring relationship or go back to the drawing board. <br/><br/>Face to face meet and greet sessions are unfortunately not possible in the current climate, so we are putting the mentoring offering on hold for the next <strong>few months</strong>, as we continue to reassess things. <br/><br/> Having said that, we are still keen on your signing up as it allows us to get a head start on the matching process. Your generous spirit and willingness to extend yourself is appreciated.  <br/>For any queries, please contact the <em><a href="mailto:mentoring&connection@rmb.co.za"><strong>Grow Lounge</strong>.</a></em>',
      nzOnOk: () => true,
      nzOkText: 'Continue ...',
      nzOkDisabled: false,
      nzWidth: 620
    });
  }
  submitForm(value: any) {
    console.log(value);
    const mentor: IMentorEdit = {
      MentorId: 0, EmployeeId: this.mentorData.EmployeeId, ProfessionalBackground: value.professionalBackground,
      Interest: value.interest, Division: this.mentorData.Division, Passion: value.passion, PriorRoles: value.priorRoles, Available: value.available, ReadTerms: value.readTerms, UnitOfTimeId: 1,
      MentoringCommitment: 12, Comment: value.comment, ShareProfile: value.shareProfile, MenteeMaxCount: value.menteeMaxCount,
      MentorDomianArea: this.mentorDomainAreaValues(value.domainAreaCheckboxGroup), MentorExperience: this.mentorExperienceValues(value.experienceCheckboxGroup)
    }
    //this.mmm = mentor;
    console.log(mentor);
    this._store.dispatch(new MentorActions.CreateMentor(mentor))
  }
  updateForm(value) {
    const mentor: IMentorEdit = {
      MentorId: this.mentorData.MentorId, EmployeeId: this.mentorData.EmployeeId, ProfessionalBackground: value.professionalBackground,
      Interest: value.interest, Division: this.mentorData.Division, Passion: value.passion, PriorRoles: value.priorRoles, Available: value.available, ReadTerms: value.readTerms, UnitOfTimeId: 1,
      MentoringCommitment: 12, Comment: value.comment, ShareProfile: value.shareProfile, MenteeMaxCount: value.menteeMaxCount,
      MentorDomianArea: this.mentorDomainAreaValues(value.domainAreaCheckboxGroup), MentorExperience: this.mentorExperienceValues(value.experienceCheckboxGroup)
    }
    console.log(mentor)
    this._store.dispatch(new MentorActions.UpdateMentor(mentor))
  }
  mentorDomainAreaValues(value: any) {
    const domainAreasValue = {
      broadenKnowledge: value.broadenKnowledge, enhanceTechnical: value.enhanceTechnical, dealDiversity: value.dealDiversity, honeLeadership: value.honeLeadership,
      managingCareer: value.managingCareer, relationshipBuilding: value.relationshipBuilding, enhanceInfluence: value.enhanceInfluence, betterIntergrateBusiness: value.betterIntergrateBusiness,
      offeringCareerGuidance: value.offeringCareerGuidance, helpingNavigateSystem: value.helpingNavigateSystem
    };
    let sortedDomainAreas = this.mentorData.DomainAreas.slice().sort((a, b) => parseInt(a.OrderId, 10) - parseInt(b.OrderId, 10));
    let domainAreasProperty = Object.keys(domainAreasValue);
    /* create an array of object in this format [{ DomainId: 23}] */
    return sortedDomainAreas.map((val, i) => {
      if (val.Name == domainAreasProperty[i] && domainAreasValue[domainAreasProperty[i]]) {
        return { DomainId: sortedDomainAreas[i].Value }
      }
    }).filter((p: any) => p !== undefined);
  };
  mentorExperienceValues(value: any) {
    const experienceValue = {
      businessTechnology: value.businessTechnology, clientService: value.clientService, credit: value.credit, finance: value.finance,
      humanCapital: value.humanCapital, legalRiskCompliance: value.legalRiskCompliance, marketingCommunication: value.marketingCommunication, operationProcess: value.operationProcess,
      supportService: value.supportService, transacting: value.transacting, trading: value.trading, nonSpecific: value.nonSpecific
    };
    let sortedExperiences = this.mentorData.Experiences.slice().sort((a, b) => parseInt(a.OrderId, 10) - parseInt(b.OrderId, 10));
    let experienceProperty = Object.keys(experienceValue);
    /* create an array of object in this format [{ ExperienceId: 23}] */
    return sortedExperiences.map((val, i) => {
      if (val.Name == experienceProperty[i] && experienceValue[experienceProperty[i]]) {
        return { ExperienceId: sortedExperiences[i].Value }
      }
    }).filter((p: any) => p !== undefined);
  }
  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }

}
