import { Component, forwardRef, OnDestroy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, ControlValueAccessor, Validators, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';


export interface PeriodMentoringValues {
    daysWeeksMnthsYears: number;
    mnthOrYear: string;
}

@Component({
  selector: 'app-periodmentoring-form',
  templateUrl: './period-mentoring.component.html',
  styleUrls: ['./period-mentoring.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PeriodMentoringComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PeriodMentoringComponent),
      multi: true,
    }
  ]
})
export class PeriodMentoringComponent implements ControlValueAccessor, OnDestroy {
  @Input() mentoringTimeDropdown: [];
  form: FormGroup;
  subscriptions: Subscription[] = [];

  get value(): PeriodMentoringValues {
    return this.form.value;
  }

  set value(value: PeriodMentoringValues) {
    this.form.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get daysWeeksMnthsYearsControl() {
    return this.form.controls.daysWeeksMnthsYears;
  }

  get mnthOrYearControl() {
    return this.form.controls.mnthOrYear;
  }

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
        daysWeeksMnthsYears: ['', [Validators.required, Validators.min(1), Validators.max(12)]],
        mnthOrYear: ['', Validators.required]
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

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn) {
    this.onChange = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { passwords: { valid: false, }, };
  }
}