import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, ControlValueAccessor, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


export interface AchievementValues {
  doesntMatter: string;
  male: string;
  female: string;
}
@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PreferenceComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PreferenceComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreferenceComponent implements ControlValueAccessor {

  @Input() achievementData: [];
  form: FormGroup;
  subscriptions: Subscription[] = [];

  get value(): AchievementValues {
    return this.form.value;
  }

  set value(value: AchievementValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }
  get doesntControl() {
    return this.form.controls.doesntMatter;
  }
  get maleControl() {
    return this.form.controls.male;
  }

  get femaleControl() {
    return this.form.controls.female;
  }
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      doesntMatter: [],
      female: [],
      male: [],
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
