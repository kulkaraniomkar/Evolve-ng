import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenteeSubscription } from '../../core/model/mentee-subscription';

@Component({
  selector: 'app-mentors-subcriptions',
  templateUrl: './mentors-subcriptions.component.html',
  styleUrls: ['./mentors-subcriptions.component.scss']
})
export class MentorsSubcriptionsComponent implements OnInit {
  menteesubscription$: Observable<MenteeSubscription[]>;
  loading$: Observable<boolean>;
  constructor(
    
    ) {
     // this.loading$ = this.menteeSubscriptionService.loading$;
     }

  ngOnInit() {
    // this.getMenteeSub();
  }
  getMenteeSub() {
   // this.menteesubscription$ = this.menteeSubscriptionService.getAll();
    //console.log("T ", this.menteesubscription$.subscribe(v => console.log(v)));
  }
}
