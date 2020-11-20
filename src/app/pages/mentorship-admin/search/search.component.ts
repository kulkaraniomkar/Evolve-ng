import { Component, OnInit, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/store/state/app.state';
import { Router } from '@angular/router';
import * as SubscriptionActions from 'src/app/store/actions/subscription.actions';
import { IPage } from 'src/app/models/page.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  showSearch: boolean = true;
  private unsubscribe$ = new Subject<void>();
  searchParam: string;
  placeholder: string = "Type to search for matched mentees...";
  placeHolderMatched: string = "Type to search for matched mentees...";
  placeHolderUnallocated: string = "Type to search for unallocated mentors...";
  placeHolderAllocated: string = "Type to search for allocated mentors...";
  // loading: boolean;
  paging: IPage = { pageNumber: 1, pageSize: 5, totalItems: 0 };
  showMenteeTable: boolean = false;
  showUnallocatedTable: boolean = false;
  showAllocatedTable: boolean = false;
  searchValue: string = 'mentee';
  showExploratoryTable: boolean = false;
  // disabledTrue: boolean = true;
  //searchResults: ISearch[];
  constructor(
    private _store: Store<IAppState>,
    private _router: Router,
  ) { }

  ngOnInit() {
  }
  setHidden() {
    this.showSearch = false;
    this._router.navigate(['admin/list']);
  }
  onSearchvalueChange(evt) {
    console.log(evt);
    if (evt == 'mentee') {
      this.placeholder = this.placeHolderMatched;
    }
    if (evt == 'allocated') {
      this.placeholder = this.placeHolderAllocated;
    }
    if (evt == 'unallocated') {
      this.placeholder = this.placeHolderUnallocated;
    }
  }
  @HostListener('keydown', ['$event'])
  handleKeyDown(event: any) {
    if (this.showSearch) {
      const key = event.keyCode.toString();
      if (key === '13') {
        /** dispatch search action */
        if (this.searchValue === 'mentee') {
          this.showMenteeTable = true;
          this.showAllocatedTable = false;
          this.showUnallocatedTable = false;
          this.showExploratoryTable = false;
          this.searchParam = event.target.value;
          this._store.dispatch(new SubscriptionActions.GetMenteeSearch({ searchParam: event.target.value, paging: this.paging }));
        }
        if (this.searchValue === 'unallocated' && event.target.value) {
          this._store.dispatch(new SubscriptionActions.GetUnallocatedSubscriptionsSuccess({ unallocatedMentors: null, pageUnallocated: { pageNumber: 1, pageSize: 5, totalItems: 0 } }));
          this.showUnallocatedTable = true;
          this.showAllocatedTable = false;
          this.showMenteeTable = false;
          this.showExploratoryTable = false;
          this.searchParam = event.target.value;
          console.log("Unallocated mentors");
        }
        if (this.searchValue === 'allocated' && event.target.value) {
          this._store.dispatch(new SubscriptionActions.GetAllocatedMentorsSuccess({ allocatedMentors: null, pageAllocated: { pageNumber: 1, pageSize: 5, totalItems: 0 } }));
          this.showAllocatedTable = true;
          this.showUnallocatedTable = false;
          this.showMenteeTable = false;
          this.showExploratoryTable = false;
          this.searchParam = event.target.value;
          console.log("Unallocated mentors");
        }
        if (this.searchValue === 'exploratory' && event.target.value) {
          this._store.dispatch(new SubscriptionActions.GetUnallocatedSubscriptionsSuccess({ unallocatedMentors: null, pageUnallocated: { pageNumber: 1, pageSize: 5, totalItems: 0 } }));
          this.showUnallocatedTable = false;
          this.showMenteeTable = false;
          this.showExploratoryTable = true;
          this.searchParam = event.target.value;
          console.log("Exploratory mentors");
        }

        //this._store.dispatch(new SearchActions.GetSearch({ searchParam: event.target.value, paging: this.paging }));

      }
      if (key === '27') {
        this.setHidden();
      }
    }
  }
}
