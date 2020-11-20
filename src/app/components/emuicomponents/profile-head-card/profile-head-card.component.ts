import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core'
declare var require: any
const data: any = require('./data.json')
@Component({
  selector: 'emui-profile-head-card',
  templateUrl: './profile-head-card.component.html',
  styleUrls: ['./profile-head-card.component.scss'],
})
export class ProfileHeadCardComponent implements OnInit, OnChanges {
  userData = data.user
   @Input() employeeId: string;
   @Input() employeeName: string
  // @Input() employeeId: string
  // @Input() userPost: string
  constructor() {}
  ngOnInit() {
    
  }
  ngOnChanges(changes: SimpleChanges) {
  // console.log(changes);
   // console.log(this.employeeId)
  }
}
