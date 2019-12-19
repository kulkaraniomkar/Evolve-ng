import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-select',
  templateUrl: './admin-select.component.html',
  styleUrls: ['./admin-select.component.scss']
})
export class AdminSelectComponent implements OnInit {
  startDate = new Date(2019, 0, 1);
  constructor() { }

  ngOnInit() {
  }

}
