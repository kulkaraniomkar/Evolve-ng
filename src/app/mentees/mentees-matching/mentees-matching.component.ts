import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentee } from '../../core/model/mentee';

import { MenteeMatch } from 'src/app/core/model/menteematch';

@Component({
    selector: 'app-mentees-matching',
    templateUrl: './mentees-matching.component.html',
    styleUrls: ['./mentees-matching.component.scss']
})
export class MenteesMatchingComponent implements OnInit {
    mentees$: Observable<Mentee[]>;
    mentormatch$: Observable<MenteeMatch[]>;
    loading$: Observable<boolean>;
    constructor(
       ) {
       // this.loading$ = this.menteesService.loading$;
    }
    ngOnInit() {
        this.getMentees();
    }
    getMentees() {
       
    }
   
    automatch(val){
        console.log('Clicked automatch: ', val);
        // this.mentormatch$ = this.menteesmatchService.getAll()
      }
}
