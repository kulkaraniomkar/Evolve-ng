import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { startWith, map, debounceTime, switchMap, catchError, tap, finalize } from 'rxjs/operators';
import * as MenteeAction from '../../store/actions';
import * as SearchMentorAction from '../../store/actions';
import { Mentee } from '../../core/model/mentee';
import { MenteeSelectors, EntityState, SearchMentorSelectors } from '../../store';
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
        inDivision: ['', Validators.required],
        mentorName: [{ value: null, disabled: false }],
        achievements: [],
        experience: [],
        comment: [],
        conditions: [],
        genderAge: []
    });
    title = 'New Mentee Signup';
    EmployeeId: number;
    isLoading = false;
    mentee: Mentee;
    mentorResult: SearchResults[];
    loading$: Observable<boolean>;
    filteredMentors$: Observable<SearchResults[]>;
    sub: Subscription;
    constructor(
        private formBuilder: FormBuilder,
        private store: Store<EntityState>,
        private menteeSelectors: MenteeSelectors,
        private searchMentorSelectors: SearchMentorSelectors,
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
        // this.sub = this.searchMentorSelectors.searchResults$.subscribe(empl => {
        //     if (empl) {
        //         this.mentorResult = empl;
        //     }
        // });
        // this.loading$ = this.searchMentorSelectors.loading$;
    }

    ngOnInit() {
        this.getMentee();
        this.getFilteredMentors();
        //this.getAutocomplete();
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

        const saveMentee: Mentee = {
            MenteeId: 0,
            EmployeeId: this.mentee['EmployeeId'],
            InDivision: this.menteeForm.get('inDivision').value,
            Division: this.mentee['Division'],
            //TenantId: 0,
            Interest: this.menteeForm.get('interest').value['passion'],
            ServicePeriod: 0,
            Duration: 0,
            UnitOfTimeId: this.menteeForm.get('mentorPeriod').value['mnthOrYear'],
            YearsOfExperience: this.menteeForm.get('mentorPeriod').value['daysWeeksMnthsYears'],
            //PreferredMentorId: this.EmployeeId,
            PreferredMentorEmpId: this.EmployeeId,
            PreferredMentorGenderId: this.menteeForm.get('genderAge').value['gender'],
            PreferredMentorAgeId: this.menteeForm.get('genderAge').value['age'],
            ShareProfile: this.menteeForm.get('conditions').value['shareProfile'],
            ReadTerms: this.menteeForm.get('conditions').value['readTerms'],
            Comment: this.menteeForm.get('comment').value['passion'],
            CreatedDate: new Date,
            MenteeDomianArea: [{DomainId: this.menteeForm.get('achievements').value[0]}],
            MenteeExperience: [{ ExperienceId: this.menteeForm.get('experience').value['selectedExperienceId'] }],
            UnitOfTimes: [],
            Experiences: [],
            DomainAreas: [],
            AgePreference: [],
            SearchParams: [],
            Gender: []

        }
        if (this.menteeForm.valid) {
            //const menteerValue = { ...this.customer, ...this.customerForm.value };
            this.store.dispatch(new MenteeAction.AddMentee(saveMentee));
            this.menteeForm.reset;
            //this.router.navigate(['/customers']);
          }
      
        console.log(saveMentee);
    }
    getMentee() {
        this.store.dispatch(new MenteeAction.GetMentee(0));
    }


    getFilteredMentors() {
        this.filteredMentors$ = this.menteeForm.get('mentorName').valueChanges.pipe(
            startWith(''),
            // delay emits
            debounceTime(500),
            tap(() => {
                console.log("tap");
                this.isLoading = true;
            }),
            // use switch map so as to cancel previous subscribed events, before creating new once
            switchMap(value => {
                if (value !== '') {
                    this.isLoading = false;
                    // lookup from mentor
                    return this.lookup(value);
                } else {
                    this.isLoading = false;
                    // if no value is pressent, return null
                    return of(null);
                }
            })
        )
    }
    lookup(value: string): Observable<SearchResults[]> {
        const searchParams: SearchParams = {
            SearchId: this.menteeForm.get('inDivision').value,
            SearchString: value.toLowerCase(),
            Limit: 5,
            Division: this.mentee['Division']
        }
        return this.mentorSearchService.search(searchParams).pipe(
            // map the item property of the mentor search results as our return object
            map(results => {
                console.log("Mentor search observeable :", results);
                return results;
            }),
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
    selectedEmployee(employeeId) {
        this.EmployeeId = employeeId;
        console.log(employeeId);
    }
}