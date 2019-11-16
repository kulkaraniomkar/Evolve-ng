import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'app-typeahead',
    templateUrl: 'typeahead.component.html',
    styleUrls: ['./typeahead.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TypeaheadComponent),
            multi: true
        }
    ]
})

export class TypeaheadComponent implements ControlValueAccessor {
  @Input() data;
  @Input() placeholder;
  @Input() label;
  @Input() icon;
  public selected;
  public value;
  constructor() { }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange( fn : any ) : void {
    this.onChange = fn;
  }

  registerOnTouched( fn : any ) : void {
    this.onTouched = fn;
  }

  writeValue(value) {
    this.value = value;
    this.selectDropdown(value);
  }

  selectDropdown(val) {
    //display current value in typeahead
    console.log('Value ', val);
    if (val != undefined && val != '') {
      if (this.value && this.data) {
        this.selected = this.data.filter(x => x.id == val)[0] ? this.data.filter((x) => {
          return x.id == val
        })[0].name : '';
      }
      else {
        this.selected = val;
      }
    }
    else {
      this.selected = null;
    }
  }

  onSelect(ev) {
    console.log('Event: ', ev);
    //let the formControl know the value's been changed
    this.onChange(ev.id);
    this.onTouched();
  }

  onBlur() {
    //let the formControl know it's been touched
    this.onTouched();
  }
    
}