import { Component, OnInit, Inject } from '@angular/core';
import { EntityState, MSubscriptionSelectors, MenteeSelectors } from '../../store';
import { Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Mentee } from '../../core/model/mentee';

@Component({
  selector: 'app-admin-mentee-info',
  templateUrl: './admin-mentee-info.component.html',
  styleUrls: ['./admin-mentee-info.component.scss']
})
export class AdminMenteeInfoComponent implements OnInit {
  
  menteeinfo$: Observable<Mentee>;
  loading$: Observable<boolean>;
  menteeid: number;
  menteeName: string;
  constructor(
    private dialogRef: MatDialogRef<AdminMenteeInfoComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private store: Store<EntityState>,
    private menteeSelectors: MenteeSelectors,
  ) {
    this.menteeid = data.menteeid;
    this.menteeName = data.menteeName;
    this.menteeinfo$ = this.menteeSelectors.mentee$;
    this.loading$ = this.menteeSelectors.loading$;
   }

  ngOnInit() {
  }

}
