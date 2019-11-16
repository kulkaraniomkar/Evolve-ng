import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, ControlValueAccessor, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


export interface AchievementValues {
  betterIntergrateBusiness: string;
  broadenKnowledge: string;
  careerGuidance: string;
  dealDiversity: string;
  enhanceImpact: string;
  enhanceTechnical: string;
  honeLeadership: string;
  learnToNavigate: string;
  managingCareer: string;
  relationshipBuilding: string;
}
@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AchievementComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AchievementComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AchievementComponent implements ControlValueAccessor {

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

  get achievementControl() {
    return this.form.controls.password;
  }

  get confirmPasswordControl() {
    return this.form.controls.confirmPassword;
  }
  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      betterIntergrateBusiness: [],
      broadenKnowledge: [],
      careerGuidance: [],
      dealDiversity: [],
      enhanceImpact: [],
      enhanceTechnical: [],
      honeLeadership: [],
      learnToNavigate: [],
      managingCareer: [],
      relationshipBuilding: [],
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
