import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityState, MenteeSelectors } from '../../store';
import { Store } from '@ngrx/store';
import { Mentee } from '../../core/model/mentee';
import * as MenteeAction from '../../store/actions';
import { MSubscription } from '../../core/model/m-subscriptions';

@Component({
    selector: 'app-mentees-subscriptions',
    templateUrl: 'mentees-subscriptions.component.html'
})

export class MenteesSubscriptionsComponent implements OnInit {
    title = 'Mentee Subscriptions';
    mentees$: Observable<MSubscription[]>;
    loading$: Observable<boolean>;
    displayedColumns = ['division', 'status', 'duration', 'startDate', 'finishDate', 'mentor', 'shareProfile', 'actions'];
    constructor(
        private store: Store<EntityState>,
        private menteeSelectors: MenteeSelectors) {
        this.mentees$ = this.menteeSelectors.mentees$;
        this.loading$ = this.menteeSelectors.loading$;
    }

    ngOnInit(){ 
        this.getMentees();
    }

    getMentees() {
        this.store.dispatch(new MenteeAction.GetMentees());
    }
}