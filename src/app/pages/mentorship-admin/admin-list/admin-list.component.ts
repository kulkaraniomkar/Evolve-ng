import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { Store } from '@ngrx/store';
// import { IAppState } from 'src/app/store/state/app.state';
// import * as SubscriptionActions from 'src/app/store/actions/subscription.actions';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  constructor(
    private _router: Router,
    // private _store: Store<IAppState>,
  ) { }
  onSearch() {

    this._router.navigate(['admin/search']);
  }
  ngOnInit() {
  }

}
