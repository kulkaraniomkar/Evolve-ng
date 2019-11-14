import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mentee } from '../../core/model/mentee';
import { MenteesService } from '../mentees.service';
import { MenteesMatchService } from '../mentees-match.service';
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
        private menteesService: MenteesService,
        private menteesmatchService: MenteesMatchService) {
        this.loading$ = this.menteesService.loading$;
    }
    ngOnInit() {
        this.getMentees();
    }
    getMentees() {
        this.mentees$ = this.menteesService.getAll();
       this.mentees$.subscribe(s => console.log('mentees: ', s));
    }
   
    automatch(val){
        console.log('Clicked automatch: ', val);
        // this.mentormatch$ = this.menteesmatchService.getAll()
        this.mentormatch$ = this.menteesmatchService.getWithQuery('menteeId=' + val);
        this.mentormatch$.subscribe(s => console.log('mentors: ', s));
      }
}
