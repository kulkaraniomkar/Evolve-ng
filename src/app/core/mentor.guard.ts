import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, tap, first } from 'rxjs/operators';
import * as MentorAction from '../store/actions';
import { EntityState, getMentorsLoading } from '../store';
import { Mentor } from './model/mentor';

@Injectable()
export class MentorsGuard implements CanActivate {
  constructor(private store: Store<EntityState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
     select(getMentorsLoading),
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new MentorAction.GetMentor(0));
        }
      }),
      filter(loaded => loaded),
      first()
    );
  }
}