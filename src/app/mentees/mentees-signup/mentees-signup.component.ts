import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { startWith, map, debounceTime, switchMap, catchError } from 'rxjs/operators';
import * as MenteeAction from '../../store/actions';
import { Mentee } from '../../core/model/mentee';
import { MenteeSelectors, EntityState } from '../../store';
import { Store } from '@ngrx/store';
import { MentorSearchService } from '../../core/mentor-search.service';
import { Router } from '@angular/router';
import { SearchParams, SearchResults } from '../../core/model/mentor-search';

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
        inDivision: [Validators.required],
        mentorName: [],
        achievements: [],
        experience: [],
        comment: [],
        conditions: [],
        genderAge: []
    });
    title = 'New Mentee Signup';
    mentee: Mentee;
    loading$: Observable<boolean>;
    filteredMentors$: Observable<SearchResults[]>;
    sub: Subscription;
    constructor(
        private formBuilder: FormBuilder,
        private store: Store<EntityState>,
        private menteeSelectors: MenteeSelectors,
        private router: Router,
        private mentorSearchService: MentorSearchService
    ) {
        this.sub = this.menteeSelectors.mentee$.subscribe(menteeResult => {
            console.log(menteeResult);
            if (menteeResult) {
                this.mentee = menteeResult;
            }
        });
        this.loading$ = this.menteeSelectors.loading$;
    }

    ngOnInit() {
        this.getMentee();
        this.getFilteredMentors();
    }
    submit() {
        if (this.menteeForm.valid) {
            const menteeValue = { ...this.mentee, ...this.menteeForm.value };
            this.store.dispatch(new MenteeAction.UpdateMentee(menteeValue));
            this.router.navigate(['/mentees']);
        }

    }
    add(mentee: Mentee) {
        this.store.dispatch(new MenteeAction.AddMentee(mentee));
      }
    save() {
        console.log(this.menteeForm.value);
    }
    getMentee() {
        this.store.dispatch(new MenteeAction.GetMentee(0));
    }
    getFilteredMentors(){
        this.filteredMentors$ = this.menteeForm.get('mentorName').valueChanges.pipe(
            startWith(''),
            // delay emits
            debounceTime(500),
            // use switch map so as to cancel previous subscribed events, before creating new once
            switchMap(value => {
              if (value !== '') {
                // lookup from mentor
                return this.lookup(value);
              } else {
                // if no value is pressent, return null
                return of(null);
              }
            })
          ) 
    }
    lookup(value: string): Observable<SearchResults> {
        const searchParams: SearchParams = {
            PreferenceId: this.menteeForm.get('inDivision').value,
            SearchString: value.toLowerCase(),
            Limit: 5,
            Division: this.mentee['Division']
        }
        return this.mentorSearchService.search(searchParams).pipe(
          // map the item property of the mentor search results as our return object
          map(results => results),
          // catch errors
          catchError(_ => {
            return of(null);
          })
        );
      }
    ngOnDestroy() {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}