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
export class AchievementComponent implements ControlValueAccessor, OnInit {
  ngOnInit(): void {
    const fm =  [
      { OrderId: "11",Name: "learnToNavigate", Text: "Learn how to ‘navigate’ the system",  Value: "11"}, 
    {OrderId: "12", Name: "careerGuidance", Text: "Career guidance", Value: "12"},
     {OrderId: "13", Name: "betterIntergrateBusiness", Text: "Better integrate into a team/Business Unit", Value: "13"}, 
     {OrderId: "14", Name: "enhanceImpact", Text: "Enhance my impact and influence in my role/team", Value: "14"}, 
     {OrderId: "15", Name: "relationshipBuilding", Text: "Relationship building and networking", Value: "15"}, 
     
     {OrderId: "16", Name: "managingCareer", Text: "Manage a career transition", Value: "16"}, 
     {OrderId: "17", Name: "dealDiversity", Text: "Deal with diversity and inclusion challenges", Value: "17"}, 
     {OrderId: "18", Name: "enhanceTechnical", Text: "Enhance my technical skills", Value: "18"}, 
    {OrderId: "19", Name: "broadenKnowledge", Text: "Broaden my organizational knowledge", Value: "19"},
    {OrderId: "20", Name: "honeLeadership", Text: "Hone my leadership skills", Value: "20"}];
    const newFM = fm.map((obj) => Object.values(obj)[1]);
    console.log(newFM);
    const formData = this.achievementData.slice().sort((a,b) =>
    { console.log(a);
      return a['OrderId'] - b['OrderId']
    });
    console.log(formData);
  }
  
  //  objectFlip(obj) {
  //   return Object.keys(obj).reduce((ret, key) => {
  //     ret[obj[key]] = key;
  //     return ret;
  //   }, {});
  //}
  @Input() achievementData: [];
  @Input() achievementTitle: string;
  //form: FormGroup;
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
  form = this.formBuilder.group({
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
  constructor(
    private formBuilder: FormBuilder
  ) {
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
