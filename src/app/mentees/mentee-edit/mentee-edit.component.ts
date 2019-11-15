import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Mentee } from '../../core/model/mentee';
import { ActivatedRoute, Router } from '@angular/router';
import { MenteeDisplayDataSelectors, EntityState } from '../../store';
import * as MenteeDisplayDataAction from '../../store/actions';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { MenteeDisplayData } from 'src/app/core/model/mentee-display-data';

@Component({
  selector: 'app-mentee-edit',
  templateUrl: './mentee-edit.component.html',
  styleUrls: ['./mentee-edit.component.scss']
})
export class MenteeEditComponent implements OnInit {
  // @Input() displayData: any;
  // menteeForm: FormGroup;
  menteeForm = this.formBuilder.group({
    id: [],
    experience: ['', Validators.required],
    city: ['', Validators.required]
  });

  mentee: Mentee;
  menteeDisplayData: MenteeDisplayData;
  loading$: Observable<boolean>;
  sub: Subscription;

  constructor(
    private store: Store<EntityState>,
    private menteeDisplayDataSelectors: MenteeDisplayDataSelectors,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) {
    
      this.sub = this.menteeDisplayDataSelectors.menteeDisplayData$.subscribe(menteeDisplay => {
        if (menteeDisplay) {
          this.menteeDisplayData = menteeDisplay;
         // this.customerForm.patchValue(this.customer);
        }
      });
      this.loading$ = this.menteeDisplayDataSelectors.loading$;
  }



  ngOnInit() {
    this.store.dispatch(new MenteeDisplayDataAction.GetMenteeDisplayData(0));
  }

 

}
