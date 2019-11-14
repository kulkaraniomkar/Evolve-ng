import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MenteeSubscription } from '../../core/model/mentee-subscription';
import { MatPaginator } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MenteeEditComponent } from '../mentee-edit/mentee-edit.component';

@Component({
  selector: 'app-mentees-list',
  templateUrl: './mentees-list.component.html'
})
export class MenteesListComponent implements OnInit {
  private _mentees: MenteeSubscription[] = [];
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['finYear', 'division', 'duration', 'startDate', 'finishDate', 'mentor', 'shareProfile', 'actions'];
  @Input() get menteesubscription(): MenteeSubscription[] {
    return this._mentees;
  }
  set menteesubscription(value: MenteeSubscription[]) {
    if (value) {
      this._mentees = value;
    }
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {

  }
  pageChanged(ev) {
    console.log(ev);
  }
  // automatch(val){
  //   // console.log('Clicked automatch: ', val);
  //   this.automatched.emit(val);
  //  // this.mentormatch$ = this.menteesmatchService.getAll();
  //   // this.mentormatch$.subscribe(s => console.log('mentors: ', s));
  // }
  onOpenDialog(action, title, id){
    const data = { action, title, id};
    const dialogRef = this.dialog.open(MenteeEditComponent, {
      height: '600px',
      width: '900px',
      data
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }
 
}
