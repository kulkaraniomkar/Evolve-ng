import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Mentee } from '../../core/model/mentee';
import { startWith, debounceTime, tap, switchMap, map, catchError, count, filter } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SearchResults, SearchParams } from '../../core/model/mentor-search';
import { MentorSearchService } from '../mentor-search.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-mentee-signup-form',
  templateUrl: './mentee-signup-form.component.html',
  styleUrls: ['./mentee-signup-form.component.scss']
})
export class MenteeSignupFormComponent implements OnInit {

  private _mentee: Mentee;
  @Input() get mentee_meta(): Mentee {
    return this._mentee;
  }
  set mentee_meta(value: Mentee) {
    this._mentee = value;
  }
  title = 'Mentee Signup';
  isLoading = false;
  filteredMentors$: Observable<SearchResults[]>;
  menteeForm: FormGroup;


  @ViewChild('autosize', { static: false })
  autosize: CdkTextareaAutosize;

  constructor(
    private formBuilder: FormBuilder,
    private mentorSearchService: MentorSearchService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    const formControlsDomainArea = this._mentee['DomainAreas'].map(control => new FormControl({value: false, disabled: false}));
    const formControlsExperience = this._mentee['Experiences'].map(control => new FormControl(false));

    this.menteeForm = this.formBuilder.group({
      id: [],
      Interest: ['', Validators.required],
      UnitOfTimeId: ['', Validators.required],
      InDivision: ['', Validators.required],
      YearsOfExperience: ['', [Validators.required, Validators.min(1), Validators.max(18)]],
      PreferredMentorEmpId: [''],
      ExperienceId: [],
      Comments: [],
      ShareProfile: [],
      ReadTerms: [],
      Experiences: this.formBuilder.array(formControlsExperience),
      MentorDomianArea: this.formBuilder.array(formControlsDomainArea)
    });
    this.getAtuoCompleteMentors();
    this.onExperienceChange();
    this.onMentorDomianAreaChange();
  }
  onMentorDomianAreaChange() {
    this.menteeForm.get('ExperienceId')
    .valueChanges
    .subscribe(
      s => console.log(s)
    )
  }
  getAtuoCompleteMentors() {
    this.filteredMentors$ = this.menteeForm
      .get('PreferredMentorEmpId')
      .valueChanges
      .pipe(
        startWith(''),
        // delay emits
        debounceTime(500),
        tap(() => {
          console.log("tap");
          this.isLoading = true;
        }),
        // use switch map so as to cancel previous subscribed events, before creating new once
        switchMap(value => {
          if (value !== '') {
            this.isLoading = false;
            // lookup from mentor
            return this.lookup(value);
          } else {
            this.isLoading = false;
            // if no value is pressent, return null
            return of(null);
          }
        })
      )
  }
  lookup(value): Observable<SearchResults[]> {
    console.log(value);
    if (value && value['FullName']) {
      value = value['FullName'];
    }
    const searchParams: SearchParams = {
      SearchId: this.menteeForm.get('InDivision').value,
      SearchString: value ? value.toLowerCase() : '',
      Limit: 5,
      Division: this._mentee['Division']
    }
    return this.mentorSearchService.search(searchParams).pipe(
      // map the item property of the mentor search results as our return object
      map(results => {
        console.log("Mentor search observeable :", results);
        return results;
      }),
      // catch errors
      catchError(_ => {
        return of(null);
      })
    );

  }
  displayFn(empl: SearchResults) {
    if (empl) { return empl.FullName; }
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: "Do you confirm the cancellation?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Yes clicked', result);
        // DO SOMETHING
        this.menteeForm.reset();

      }
    });
  }
  onExperienceChange() {
  const exp = this.menteeForm.get('Experiences')
    .valueChanges
    .pipe(
      tap(s => console.log("before ", s[0])),
      //count(i => i[i] === true),
      //filter((val, index) => { console.log(index]);return val } ),
      tap(s => console.log(s))
    );
    exp.subscribe(
      res => {
        const updatedArrayCount  =res.filter( i => i === true).length;
        if(updatedArrayCount <= 3){
          this.menteeForm.get('Experiences').valid;
        }else{
          this.menteeForm.get('Experiences').touched;
          this.menteeForm.get('Experiences').setErrors({limit: true});
        }
      }
    );
  }

  submit() {
    console.log('Yes saved', this.menteeForm.value);
  }
}
