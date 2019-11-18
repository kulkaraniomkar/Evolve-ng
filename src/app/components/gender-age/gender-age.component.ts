import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, ControlValueAccessor, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


export interface GenderAgeValues {
    gender: string;
    age: string;
}
@Component({
  selector: 'app-gender',
  templateUrl: './gender-age.component.html',
  styleUrls: ['./gender-age.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenderAgeComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => GenderAgeComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenderAgeComponent implements ControlValueAccessor {

  @Input() genderData: [];
  @Input() ageData: [];
  form: FormGroup;
  subscriptions: Subscription[] = [];

  get value(): GenderAgeValues {
    return this.form.value;
  }

  set value(value: GenderAgeValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
  get genderControl() {
    return this.form.controls.gender;
  }
  
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
        gender: [],
        age: []
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
    return this.form.valid ? null : { gender: { valid: false, }, };
  }

}
