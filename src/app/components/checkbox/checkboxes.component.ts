import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxesComponent),
      multi: true
    }
  ]
})
export class CheckboxesComponent implements ControlValueAccessor {
  @Input() data: any[];
  public _value;
  onChange: any = () => { };
  onTouched: any = () => { };


  //this is our "change" function
  //marks formControl as touched
  //marks formControl as valid/invalid
  registerOnChange( fn : any ) : void {
    this.onChange = fn;
  }

  //this is our "touch/blur" function
  //marks formControl as touched
  registerOnTouched( fn : any ) : void {
    this.onTouched = fn;
  }

  //this is how we write the value we want to the formControl
  writeValue(value:any) {
    console.log("Write the value: ", value);
    this._value = value;
    console.log("Write the _value: ", this._value);
  }

  selectCheckbox(checkboxId) {
   
    console.log("Checking value: ", checkboxId);
    console.log("Value for _value: ", this._value);
    this.onChange(checkboxId);
    this.writeValue(checkboxId);
    // const updatedArray = this._value;
    // updatedArray.push(checkboxId);
    // this.writeValue(updatedArray);
  }

  removeCheckbox(checkboxId) {
    var index = this._value.indexOf(checkboxId);
    if (index > -1) {
      this._value.splice(index, 1);
    }
  }

}
