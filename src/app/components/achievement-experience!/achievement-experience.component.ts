import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, ControlValueAccessor, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface AchievementExperienceValues {
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
    selector: 'app-achievement-experience',
    templateUrl: 'achievement-experience.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AchievementExperienceComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => AchievementExperienceComponent),
            multi: true,
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AchievementExperienceComponent implements ControlValueAccessor {

    @Input() achievementData: [];
    @Input() experienceData: [];
    form: FormGroup;
    subscriptions: Subscription[] = [];

    get value(): AchievementExperienceValues {
        return this.form.value;
    }

    set value(value: AchievementExperienceValues) {
        this.form.setValue(value);
        this.onChange(value);
        this.onTouched();
    }

    get betterIntergrateBusinessControl() {
        return this.form.controls.betterIntergrateBusiness;
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
            businessTechnology: [],
            clientService: [],
            credit: [],
            finance: [],
            humanCapital: [],
            legalRiskCompliance: [],
            marketingCommunication: [],
            operationProcess: [],
            supportService: [],
            trading: [],
            transacting: [],
            nonSpecific: [],
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
        console.log('Checkbox :', value);
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
        return this.form.valid ? null : { AchievementExperience: { valid: false, }, };
    }
    addEvent(ev){
        //this.propagateChange(ev['source']['value']);
        this.onChange(ev['source']['value']);
        console.log(ev['source']);
        // console.log('Checked :', ev['checked']);
        // console.log(this.form.get('betterIntergrateBusiness'));
        // console.log(ev.target)
    }
   
}