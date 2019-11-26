import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, ControlValueAccessor, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


export interface ExperienceValues {
  businessTechnology: string;
  clientService: string;
  credit: string;
  finance: string;
  humanCapital: string;
  legalRiskCompliance: string;
  marketingCommunication: string;
  operationProcess: string;
  supportService: string;
  trading: string;
  transacting: string;
  nonSpecific: string;
}
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ExperienceComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ExperienceComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperienceComponent implements ControlValueAccessor {

@Input() experienceData : [];
@Input() experienceTitle : string;
  form: FormGroup;
  subscriptions: Subscription[] = [];

  get value(): ExperienceValues {
    return this.form.value;
  }

  set value(value: ExperienceValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get businessTechnologyControl() {
    return this.form.controls.businessTechnology;
  }
  get clientServiceControl() {
    return this.form.controls.clientService;
  }
  get creditControl() {
    return this.form.controls.credit;
  }
  get financeControl() {
    return this.form.controls.finance;
  }
  get humanCapitalControl() {
    return this.form.controls.humanCapital;
  }
  get legalRiskComplianceControl() {
    return this.form.controls.legalRiskCompliance;
  }
  get marketingCommunicationControl() {
    return this.form.controls.marketingCommunication;
  }

  get operationProcessControl() {
    return this.form.controls.operationProcess;
  }
  get supportServiceControl() {
    return this.form.controls.supportService;
  }
  get tradingControl() {
    return this.form.controls.trading;
  }
  get transactingControl() {
    return this.form.controls.transacting;
  }
  get nonSpecificControl() {
    return this.form.controls.nonSpecific;
  }
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      // businessTechnology: [],
      // clientService: [],
      // credit: [],
      // finance: [],
      // humanCapital: [],
      // legalRiskCompliance: [],
      // marketingCommunication: [],
      // operationProcess: [],
      // supportService: [],
      // trading: [],
      // transacting: [],
      // nonSpecific: [],
      selectedExperienceId: ['',[Validators.required]]
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe(value => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
  onChange: any = () => { };
  onTouched: any = () => { };

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  
  validate(_: FormControl) {
    return this.form.valid ? null : { experience: { valid: false, }, };
  }

}