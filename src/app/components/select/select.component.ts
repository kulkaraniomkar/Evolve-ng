import { Component, ViewChild, Input, ChangeDetectionStrategy, Optional, Self, OnInit, NgZone, forwardRef } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControlName, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator, Validators, FormGroup } from '@angular/forms';
// import { MatFormFieldControl, MatSelect, CanUpdateErrorState, ErrorStateMatcher } from '@angular/material';
// import { Subject, Subscription } from 'rxjs';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrls: [
        './select.component.scss'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectComponent),
            multi: true
          }
        //   {
        //     provide: NG_VALIDATORS,
        //     useExisting: forwardRef(() => CustomSelectComponent),
        //     multi: true,
        //   }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements ControlValueAccessor {

    @Input() items: string[];
    @Input() defaultText: string;

    public value: string;
    public isDisabled: boolean;

    private onChange;

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    writeValue(value: any): void {
        this.value = value;
    }

    selectItem(item): void {
        console.log("select value: ", item);
        this.onChange(item['name']);
        this.value = item['name'];
    }
}