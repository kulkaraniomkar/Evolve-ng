import { Component, ViewChild, forwardRef, Input } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, Validator } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextareaComponent),
      multi: true
    },
  //   {
  //     provide: NG_VALIDATORS,
  //     useExisting: forwardRef(() => TextareaComponent),
  //     multi: true,
  //   }
  ]
})
export class TextareaComponent implements ControlValueAccessor {
  
  // validate(control: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
  //   return (!this.value) ? null : {
  //     jsonParseError: {
  //         valid: false,
  //     },
  // };
  // }
  // registerOnValidatorChange?(fn: () => void): void {
  //   throw new Error("Method not implemented.");
  // }

  constructor() { }
  @Input() placeholder: string;
  public value: string;
  private onChange;

  @ViewChild('autosize', { static: false })
  autosize: CdkTextareaAutosize;

  writeValue(value: any): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }
  onCommentChange(event): void {
    console.log("Value :", event.target.value);
    this.onChange(event.target.value);
    this.value = event.target.value;
  }

}
