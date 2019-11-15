import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mentee } from 'src/app/core/model/mentee';
import { Observable, Subscription } from 'rxjs';
import { Division } from '../../core/model/division';

import { Mentortime } from '../../core/model/mentor-time';import gender from '../../shared/gender.json';
import age from '../../shared/age.json';
import { Mentor } from 'src/app/core/model/mentor';
import {map, startWith, debounceTime, tap, switchMap, finalize} from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Result, DisplayData } from 'src/app/core/model/display-data';

@Component({
  selector: 'app-mentees-signup',
  templateUrl: './mentees-signup.component.html',
  styleUrls: ['./mentees-signup.component.scss']
})
export class MenteesSignupComponent implements OnInit {

  
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

 
}
