import { Component, OnInit, Input } from '@angular/core';
import { MentorMatch, Matches, SavedMatch } from '../../core/model/mentor-match';
import { EntityState, MSubscriptionSelectors } from '../../store';
import * as SavedMatchAction from '../../store/actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin-auto-match',
  templateUrl: './admin-auto-match.component.html',
  styleUrls: ['./admin-auto-match.component.scss']
})
export class AdminAutoMatchComponent implements OnInit {
  private _matches: MentorMatch[] = [];
  private _isDelete: boolean = false;
  private  _menteeName: string = '';
  matchTitle: string = 'Mentoring matching results';
  savedMatchTitle: string = 'Saved mentoring matching results';
  
  @Input() get matches(): MentorMatch[] {
    return this._matches;
  }
  set matches(value: MentorMatch[]) {
    this._matches = value;
  }
  @Input() get isDelete(): boolean {
    return this._isDelete;
  }
  set isDelete(value: boolean) {
    this._isDelete = value;
  }
  @Input() get menteeName(): string {
    return this._menteeName;
  }
  set menteeName(value: string) {
    this._menteeName = value;
  }
  constructor(
    private store: Store<EntityState>,
    private savedmatchSelectors: MSubscriptionSelectors,
  ) { }

  ngOnInit() {
  }
  onSaveResults(){
   
    const matches: Matches[]= this._matches.map(
      m =>  { 
        return { MentorId: m.MentorId};
      }
    );
    const savedMatches: SavedMatch = { MenteeId:this._matches[0]['MenteeId'], Matches: matches };
    this.store.dispatch(new SavedMatchAction.AddSavedMatch(savedMatches));
  }
}
