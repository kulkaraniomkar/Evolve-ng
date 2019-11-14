import { Component, OnInit, Input, forwardRef, HostBinding } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ],
})
export class CheckboxComponent implements ControlValueAccessor {
  @HostBinding('attr.id')
  externalId = '';
  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }

  get id() {
    return this._ID;
  }

  private _ID = '';

  @Input('value') _value = true;
  onChanged: any = () => {};
  onTouched: any = () => {};

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChanged(val);
    this.onTouched();
  }

  @Input()
  labelPosition = 'after';

  @Input()
  labelText: string;

  public isDisabled: boolean;
  constructor() {}

  registerOnChange(fn) {
    this.onChanged = fn;
  }

  writeValue(value) {
    if (value) {
      this.value = value;
    }
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  selectItem(value): void {
    console.log("checkbox value: ", value);
    this.onChanged(value);
    this.value = !this.value;
    //this.onTouch();
  }


}
