import { Component, OnInit, Input, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioComponent),
        multi: true
      }
    //   {
    //     provide: NG_VALIDATORS,
    //     useExisting: forwardRef(() => CustomSelectComponent),
    //     multi: true,
    //   }
],
changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent implements ControlValueAccessor {


  constructor() { }

  @Input()
  items: [];

  @Input()
  label: string;

 
  public disabled: boolean;
  onChanged: any = () => {}
  onTouched: any = () => {}
  public _value: string;

  writeValue(value: any): void {
    this._value = value;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  selectItem(val: any): void {
    console.log("radio value: ", val);
    this.onChanged(val);
    this._value = val;
    //this.onTouch();
}

}
