import { Component, OnInit, forwardRef, ChangeDetectionStrategy, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, ControlValueAccessor, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface TermsConditionsValues {
    shareProfile: string;
    readTerms: string;
}
@Component({
    selector: 'app-terms-conditions',
    templateUrl: 'terms-conditions.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TermsConditionsComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => TermsConditionsComponent),
            multi: true,
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class TermsConditionsComponent implements ControlValueAccessor {

    
    form: FormGroup;
    subscriptions: Subscription[] = [];

    get value(): TermsConditionsValues {
        return this.form.value;
    }

    set value(value: TermsConditionsValues) {
        this.form.setValue(value);
        this.onChange(value);
        this.onTouched();
    }

    get shareProfileControl() {
        return this.form.controls.shareProfile;
    }

    get readTermsControl() {
        return this.form.controls.readTerms;
    }
    constructor(
        private formBuilder: FormBuilder
    ) {
        this.form = this.formBuilder.group({
            shareProfile: [false],
            readTerms: [false, Validators.requiredTrue],
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
        return this.form.valid ? null : { AchievementExperience: { valid: false, }, };
    }

}