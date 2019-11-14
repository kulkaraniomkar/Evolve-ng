import { Component, ViewChild, forwardRef, Input, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ],
 // changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements ControlValueAccessor, Validator {
  validate(control: AbstractControl): ValidationErrors {
    return null;
  }
  registerOnValidatorChange?(fn: () => void): void {
    
  }

  // validate(control: AbstractControl) {
    
  //   console.log("hhh", control);
  //   // return (!this.parseError) ? null : {
  //   //   controlParseError: {
  //   //     valid: false,
  //   //   },
  //   // };
  // }
 
  constructor() { }
  public value: string;
  public parseError: boolean;
  onChange = (_: any) => {};
  onTouchedFn = () => {};

  @Input() 
  placeholder: string;
  @Input()
  disabled = false;

  @Input () 
  icon: string;

  @Input () 
  label: string;
  

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  addEvent(event): void {
    console.log("Value :", event);
    this.onChange(event.target.value);
    this.value = event.target.value;
  }

}
