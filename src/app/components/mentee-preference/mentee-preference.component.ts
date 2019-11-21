import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, ControlValueAccessor, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


export interface MenteePreferenceValues {
  gender: string;
  age: string;
  durationUnit: number;
  inDivision: boolean;
  unitOfTimes: string;
  mentorName: string;
}
@Component({
  selector: 'app-mentee-preference',
  templateUrl: './mentee-preference.component.html',
  styleUrls: ['./mentee-preference.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MenteePreferenceComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => MenteePreferenceComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenteePreferenceComponent implements ControlValueAccessor {

  @Input() genderData: [];
  @Input() ageData: [];
  @Input() mentoringTimeData: [];
  form: FormGroup;
  subscriptions: Subscription[] = [];

  get value(): MenteePreferenceValues {
    return this.form.value;
  }

  set value(value: MenteePreferenceValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
  get genderControl() {
    return this.form.controls.gender;
  }
  get ageControl() {
    return this.form.controls.age;
  }

  get femaleControl() {
    return this.form.controls.female;
  }
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      gender: [],
      age: [],
      inDivision: [],
      durationUnit: [],
      unitOfTimes: [],
      mentorName: []
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
    return this.form.valid ? null : { Achievement: { valid: false, }, };
  }

}
