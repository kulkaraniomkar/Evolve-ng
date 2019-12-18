import { Component, OnInit, Input } from '@angular/core';
import { MentorMatch } from '../../core/model/mentor-match';

@Component({
  selector: 'app-admin-auto-match',
  templateUrl: './admin-auto-match.component.html',
  styleUrls: ['./admin-auto-match.component.scss']
})
export class AdminAutoMatchComponent implements OnInit {
  private _matches: MentorMatch[] = [];
  @Input() get matches(): MentorMatch[] {
      return this._matches;
  }
  set matches(value: MentorMatch[]) {
          this._matches = value;
  }
  constructor() { }

  ngOnInit() {
  }

}
