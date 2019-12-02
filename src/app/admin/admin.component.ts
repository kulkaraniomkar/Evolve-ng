import { Component, OnInit } from '@angular/core';
import { MenteeSelectors, EntityState } from '../store';
import { Observable } from 'rxjs';
import { MSubscription } from '../core/model/m-subscriptions';
import { Store } from '@ngrx/store';
import * as MenteeAction from '../store/actions';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  mentees$: Observable<MSubscription[]>;
  loading$: Observable<boolean>;
  constructor(
    private store: Store<EntityState>,
    private menteeSelectors: MenteeSelectors) {
    this.mentees$ = this.menteeSelectors.mentees$;
    this.loading$ = this.menteeSelectors.loading$;
    }

  ngOnInit() {
    this.getMenteesSubscriptions()
  }
  getMenteesSubscriptions(){
    this.store.dispatch(new MenteeAction.GetMentees())
  }

}
