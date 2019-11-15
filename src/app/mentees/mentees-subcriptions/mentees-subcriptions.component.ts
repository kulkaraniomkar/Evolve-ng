import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { MenteeSubscriptionService } from '../mentee-subscription.service';
import { MenteeSubscription } from '../../core/model/mentee-subscription';

@Component({
  selector: 'app-mentees-subcriptions',
  templateUrl: './mentees-subcriptions.component.html',
  //styleUrls: ['./mentees-subcriptions.component.scss']
})
export class MenteesSubcriptionsComponent implements OnInit {
  menteesubscription$: Observable<MenteeSubscription[]>;
  loading$: Observable<boolean>;
  constructor(
   // private menteeSubscriptionService: MenteeSubscriptionService
    ) {
      // this.loading$ = this.menteeSubscriptionService.loading$;
     }

  ngOnInit() {
    this.getMenteeSub();
  }
  getMenteeSub() {
    //this.menteesubscription$ = this.menteeSubscriptionService.getAll();
    //console.log("T ", this.menteesubscription$.subscribe(v => console.log(v)));
  }
}
