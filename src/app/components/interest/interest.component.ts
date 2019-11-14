import { Component, forwardRef, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, ControlValueAccessor, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


export interface InterestValues {
  passion: string;
  division: string;
  mentoringPeriod: string
}
@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InterestComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InterestComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InterestComponent implements ControlValueAccessor {
  
  @ViewChild('autosize', { static: false })
  autosize: CdkTextareaAutosize;

  form: FormGroup;
  subscriptions: Subscription[] = [];

  get value(): InterestValues {
    return this.form.value;
  }

  set value(value: InterestValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get passionControl() {
    return this.form.controls.passion;
  }

  get confirmPasswordControl() {
    return this.form.controls.confirmPassword;
  }
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      passion: ['', Validators.required],
      division: ['', Validators.required],
      mentoringPeriod: ['', Validators.required],
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
    return this.form.valid ? null : { interest: { valid: false, }, };
  }

}
