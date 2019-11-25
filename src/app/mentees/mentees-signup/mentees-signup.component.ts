import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { startWith, map, debounceTime, switchMap, catchError } from 'rxjs/operators';
import * as MenteeAction from '../../store/actions';
import { Mentee } from '../../core/model/mentee';
import { MenteeSelectors, EntityState } from '../../store';
import { Store } from '@ngrx/store';
import { MentorSearchService } from '../../core/mentor-search.service';

export interface MentorSearchName {
    id: number
    name: string;
  }
@Component({
    selector: 'app-mentees-signup',
    templateUrl: 'mentees-signup.component.html',
    styleUrls: ['./mentees-signup.component.scss']
})

export class MenteesSignupComponent implements OnInit, OnDestroy {
    menteeForm = this.formBuilder.group({
        interest: [],
        mentorPeriod: [],
        inDivision: [],
        mentorName: [],
        experience: [],        
    });
    title = 'New Mentee Signup';
    mentee: Mentee;
    loading$: Observable<boolean>;
    filteredMentors$: Observable<MentorSearchName[]>;
    sub: Subscription;
    constructor(
        private formBuilder: FormBuilder,
        private store: Store<EntityState>,
        private menteeSelectors: MenteeSelectors,
        private mentorSearchService: MentorSearchService
    ) {
        this.sub = this.menteeSelectors.mentee$.subscribe(menteeResult => {
            console.log(menteeResult);
            if(menteeResult){
                this.mentee = menteeResult
            }
        });
        this.loading$ = this.menteeSelectors.loading$;
    }

    ngOnInit() {
        this.getMentee();
       // this.getFilteredMentors();
    }
    getMentee() {
        this.store.dispatch(new MenteeAction.GetMentee(0));
    }
    // getFilteredMentors(){
    //     this.filteredMentors$ = this.menteeForm.get('mentorName').valueChanges.pipe(
    //         startWith(''),
    //         // delay emits
    //         debounceTime(500),
    //         // use switch map so as to cancel previous subscribed events, before creating new once
    //         switchMap(value => {
    //           if (value !== '') {
    //             // lookup from mentor
    //             return this.lookup(value);
    //           } else {
    //             // if no value is pressent, return null
    //             return of(null);
    //           }
    //         })
    //       ) 
    // }
    // lookup(value: string): Observable<MentorSearchName> {
    //     return this.mentorSearchService.search(value.toLowerCase(), this.menteeForm.get('inDivision').value, 5,  this.mentee['Division']).pipe(
    //       // map the item property of the mentor search results as our return object
    //       map(results => results.items),
    //       // catch errors
    //       catchError(_ => {
    //         return of(null);
    //       })
    //     );
    //   }
    ngOnDestroy() { 
        if (this.sub) {
            this.sub.unsubscribe();
          }
    }
}