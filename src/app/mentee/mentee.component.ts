import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { EntityState, MenteeSelectors } from '../store';
import * as MenteeAction from '../store/actions';
import { MSubscription } from '../core/model/m-subscriptions';

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: ['./mentee.component.scss']
})
export class MenteeComponent implements OnInit {

  mentees$: Observable<MSubscription[]>;
  loading$: Observable<boolean>;
  constructor(
    private store: Store<EntityState>,
    private menteeSelectors: MenteeSelectors) {
    this.mentees$ = this.menteeSelectors.mentees$;
    this.loading$ = this.menteeSelectors.loading$;
  }

  ngOnInit() {
    this.getMSubscriptions();
  }
  getMSubscriptions() {
    this.store.dispatch(new MenteeAction.GetMentees());
  }
}
