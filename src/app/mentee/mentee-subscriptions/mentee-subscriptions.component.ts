import { Component, OnInit, Input } from '@angular/core';
import { MSubscription } from '../../core/model/m-subscriptions';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-mentee-subscriptions',
  templateUrl: './mentee-subscriptions.component.html',
  styleUrls: ['./mentee-subscriptions.component.scss']
})
export class MenteeSubscriptionsComponent implements OnInit {
  private _mentees: MSubscription[] = [];
  @Input() get mentees(): MSubscription[] {
      return this._mentees;
  }
  set mentees(value: MSubscription[]) {
      this._mentees = value;
  }
  displayedColumns = ['division', 'status', 'duration', 'startDate', 'finishDate', 'mentor', 'registeredDate', 'shareProfile', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<MSubscription>(); 
  constructor() { }

  ngOnInit() {
    this.getAllSubs();
  }
  getAllSubs() {
    this.dataSource.data = this.mentees as MSubscription[];
    console.log(this.dataSource.data);
  }
  public redirectToDetails = (id: string) => {
    
  }
 
  public redirectToUpdate = (id: string) => {
    
  }
 
  public redirectToDelete = (id: string) => {
    
  }

}
