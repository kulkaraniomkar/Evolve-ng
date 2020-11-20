import { Component, OnInit, Input } from '@angular/core';
import * as MentorActions from 'src/app/store/actions/mentor.action';
import { Observable, Subject } from 'rxjs';
import { ExpUotDa } from 'src/app/models/exp-uot-da.interface';
import { IAppState } from 'src/app/store/state/app.state';
import { NzModalRef } from 'ng-zorro-antd';
import { Store, select } from '@ngrx/store';
import { selectLoadingMentor, selectMentorState, selectMentorExtraState } from 'src/app/store/selectors/mentor.selector';
import { takeUntil } from 'rxjs/operators';
import { IMentor, IMentorInfo, IMentorExtra } from 'src/app/models/mentor.interface';

@Component({
  selector: 'mentorship-my-mentor',
  templateUrl: './mentor-my-modal.component.html',
  styleUrls: ['./mentor-my-modal.component.scss']
})
export class MentorMyModalComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;
  loading$: Observable<boolean>;
  mentorData: IMentor;
  mentorExtra: IMentorExtra;
  gender: ExpUotDa = null;
  age: ExpUotDa = null;
  experiences: ExpUotDa[] = null;
  domainAreas: ExpUotDa[] = null;
  preferredMentor: string = null;

  private unsubscribe$ = new Subject<void>();
  background = "assets/images/photos/2.jpeg";
  constructor(
    private _modal: NzModalRef,
    private _store: Store<IAppState>,
  ) {
    this._store.pipe(select(selectMentorState)).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => {
        if (data) {
          this.mentorData = data;
          this.experiences = data.Experiences.filter(e => e.Selected);
          this.domainAreas = data.DomainAreas.filter(e => e.Selected);
        }
      }
    );
    // this._store.pipe(select(selectMentorExtraState)).pipe(
    //   takeUntil(this.unsubscribe$)
    // ).subscribe(
    //   data => {
    //     if (data) {
    //       this.mentorExtra = data;
    //     }

    //   }
    // );
    this.loading$ = this._store.pipe(select(selectLoadingMentor));
  }

  ngOnInit() {
  }
  destroyModal(): void {
    /** dispatch action for mentor details */
   // this._store.dispatch(new MentorActions.GetMentorDetailsByIdSuccess({ mentor: null, mentorExtra: null}));
    this._modal.destroy();
  }
  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
