import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { NzModalRef } from 'ng-zorro-antd';
import { IAppState } from 'src/app/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { IMentee } from 'src/app/models/mentee.interface';
import { ExpUotDa } from 'src/app/models/exp-uot-da.interface';
import { selectMenteeState, selectLoadingMentee } from 'src/app/store/selectors/mentee.selector';
import { takeUntil } from 'rxjs/operators';
import * as MenteeActions from 'src/app/store/actions/mentee.action';

@Component({
  selector: 'mentee-modal',
  templateUrl: './mentee-modal.component.html',
  styleUrls: ['./mentee-modal.component.scss']
})
export class MenteeModalComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() subtitle: string;
  mentee$: Observable<IMentee>;
  loading$: Observable<boolean>;
  mentee: IMentee;
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
    this._store.pipe(select(selectMenteeState)).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(
      data => {
        if (data) {
          console.log(data);
          this.gender = data['Gender'].find(g => g.Value == data.PreferredMentorGenderId.toString());
          this.age = data['AgePreference'].find(g => g.Value == data.PreferredMentorAgeId.toString());
          this.preferredMentor = data['PreferredMentor'] ? data['PreferredMentor']['FullName'] : 'Not selected';
          this.experiences = data['Experiences'].filter(e => data['MenteeExperience'].some(me => +e.Value === me.ExperienceId));
          this.domainAreas = data['DomainAreas'].filter(e => data['MenteeDomianArea'].some(me => +e.Value === me.DomainId));

          this.mentee = data;
        }

      }
    );
    this.loading$ = this._store.pipe(select(selectLoadingMentee));
  }

  ngOnInit() {
  }
  destroyModal(): void {
    /** dispatch action for mentee details */
    this._store.dispatch(new MenteeActions.GetMenteeByIdSuccess({ mentee: null }));
    this._modal.destroy();
  }
  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
