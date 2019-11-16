import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState, MenteeDisplayDataSelectors } from '../../store';
import { FormBuilder, Validators } from '@angular/forms';
import { MenteeDisplayData } from 'src/app/core/model/mentee-display-data';
import { Observable } from 'rxjs';
import * as MenteeDisplayDataAction from '../../store/actions';
import { Mentee } from '../../core/model/mentee';



@Component({
  selector: 'app-mentees-signup',
  templateUrl: './mentees-signup.component.html',
  styleUrls: ['./mentees-signup.component.scss']
})
export class MenteesSignupComponent implements OnInit {
  menteeForm = this.formBuilder.group({
    id: [],
    interest: [],
    experience: [],
    achievement: [],
    gender:[]
  });
  title = 'New Mentee Signup';
  menteeDisplayData$: Observable<MenteeDisplayData>;
  loading$: Observable<boolean>;
  constructor(
    private store: Store<EntityState>,
    private menteeDisplayDataSelectors: MenteeDisplayDataSelectors,
    private formBuilder: FormBuilder,
  ) {
    this.menteeDisplayData$ = this.menteeDisplayDataSelectors.menteeDisplayData$;
    this.loading$ = this.menteeDisplayDataSelectors.loading$;
  }
  ngOnInit(): void {
    this.getMenteeDisplayData();
  }

  getMenteeDisplayData() {
    this.store.dispatch(new MenteeDisplayDataAction.GetMenteeDisplayData(0));
  }
  // add(mentee: Mentee) {
  //   this.store.dispatch(new MenteeAction.AddMentee(mentee));
  // }
}
