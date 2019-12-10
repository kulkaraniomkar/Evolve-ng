import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MSubscription } from '../../core/model/m-subscriptions';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentee-subscriptions',
  templateUrl: './mentee-subscriptions.component.html',
  styleUrls: ['./mentee-subscriptions.component.scss']
})
export class MenteeSubscriptionsComponent implements OnInit, OnChanges {
  private _mentees: MSubscription[] = [];
  @Input() get mentees(): MSubscription[] {
      return this._mentees;
  }
  set mentees(value: MSubscription[]) {
      this._mentees = value;
  }
  public displayedColumns = ['division', 'status', 'duration', 'startDate', 'finishDate', 'mentor', 'registeredDate', 'shareProfile', 
  //'details', 
  'update', 
  // 'delete'
];
  public dataSource = new MatTableDataSource<MSubscription>();
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator; 
  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    this.getAllSubs();
  }
  getAllSubs() {
    
    console.log(this.dataSource.data);
  }
  async ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = changes.mentees.currentValue as MSubscription[];
    console.log(changes);
    // async data now loaded
    if(!changes.mentees.firstChange){
       // if empty move to signup
       const arrLength = await changes.mentees.currentValue.length;
       console.log(" array ", arrLength);
       if( arrLength <= 0){
         console.log("empty array");
        this.router.navigate(['/mentee/signup', 0]);
       }
    }
    console.log(this.dataSource.data);
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetails = (id: string) => {
    
  }
 
  public redirectToUpdate = (id: string) => {
    
  }
 
  public redirectToDelete = (id: string) => {
    
  }

}
