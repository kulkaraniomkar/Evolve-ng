import { Component, OnDestroy, OnInit } from '@angular/core'
import { select, Store } from '@ngrx/store'
import { Subject } from 'rxjs';
import { IAppState } from 'src/app/store/state/app.state'
import * as UserActions from 'src/app/store/actions/user.actions'
import { takeUntil } from 'rxjs/operators';
import { selectLoadingUser, selectUserState } from 'src/app/store/selectors/user.selector';
// import * as Reducers from 'src/app/store/reducers'

@Component({
  selector: 'cui-topbar-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class TopbarUserMenuComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject<void>();
  badgeCount: number = 7
  name: string = 'Sithelo Ngwenya'
  role: string = ''
  email: string = ''
  phone: string = ''
  photo: string = ''
  identity$ = this._store.select(selectUserState);
  identityloading$ = this._store.select(selectLoadingUser);
  constructor(private _store: Store<IAppState>,) {

    this._store.pipe(select(selectUserState)).pipe(takeUntil(this.unsubscribe$)).subscribe(
      state => {
        console.log(state)
        this.name = state.displayName;
        this.role = state.roles.toString();
        this.email = state.email;
        this.photo = state.photoURL;
        console.log(this.photo)
      })
  }
  ngOnInit(): void {
    this._store.dispatch(new UserActions.GetUser());
  }

  badgeCountIncrease() {
    this.badgeCount = this.badgeCount + 1
  }

  logout() {
    // this.store.dispatch(new UserActions.Logout())
  }
  /**  unsubscribe to all  */
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.unsubscribe();
  }
}
