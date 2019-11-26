import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Mentee } from '../../core/model/mentee';
import { DataServiceError } from './data-error.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class MenteeDataService {

  apiUrlBase = environment.apiUrlBase;

  constructor(private http: HttpClient) {}

  getMentees(): Observable<Mentee[]> {
    return this.http.get<Mentee[]>(`${this.apiUrlBase}/mentees`)
    .pipe(
      catchError(this.handleError())
    );
  }

  getMentee(MenteeId: number): Observable<Mentee> {
    return this.http.get<Mentee>(`${this.apiUrlBase}/mentee/get/${MenteeId}`)
    .pipe(
      catchError(this.handleError())
    );
  }

  addMentee(mentee: Mentee): Observable<Mentee> {
    return this.http.post<Mentee>(`${this.apiUrlBase}/mentees/`, mentee)
    .pipe(
      catchError(this.handleError(mentee))
    );
  }

  deleteMentee(mentee: Mentee): Observable<Mentee> {
    return this.http.delete(`${this.apiUrlBase}/mentees/${mentee.MenteeId}`)
    .pipe(
      map(() => mentee),
      catchError(this.handleError(mentee))
    );
  }

  updateMentee(mentee: Mentee): Observable<Mentee> {
    return this.http.put<Mentee>(`${this.apiUrlBase}/mentees/${mentee.MenteeId}`, mentee)
    .pipe(
      map(() => mentee),
      catchError(this.handleError(mentee))
    );
  }

  private handleError<T>(requestData?: T) {
    return (res: HttpErrorResponse) => {
      const error = new DataServiceError(res.error, requestData);
      console.error(error);
      // return new ErrorObservable(error);
      return throwError(error);
    };
  }
}