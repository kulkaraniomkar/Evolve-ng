import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState, MenteeSelectors } from '../../store';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as MenteeAction from '../../store/actions';
import { MSubscription } from '../../core/model/m-subscriptions';
import { Observable } from 'rxjs';
import { Mentee } from '../../core/model/mentee';


@Component({
  selector: 'app-mentee-signup',
  templateUrl: './mentee-signup.component.html',
  styleUrls: ['./mentee-signup.component.scss']
})
export class MenteeSignupComponent implements OnInit {
  mentee_meta$: Observable<Mentee>;
  loading$: Observable<boolean>;

  constructor(
    private store: Store<EntityState>,
    private menteeSelectors: MenteeSelectors
  ) {
    this.mentee_meta$ = this.menteeSelectors.mentee$;
    this.loading$ = this.menteeSelectors.loading$;
   }

  ngOnInit() {
    this.getMenteeMetadata()
  }
  getMenteeMetadata() {
    this.store.dispatch(new MenteeAction.GetMentee(0))
  }

}
