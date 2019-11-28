import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Mentor } from '../../core/model/mentor';
import { DataServiceError } from './data-error.service';
import { environment } from '../../../environments/environment';
import { MSubscription } from '../../core/model/m-subscriptions';
import { ToastService } from '../../core/toast.service';

@Injectable()
export class MentorDataService {

  apiUrlBase = environment.apiUrlBase;

  constructor(
    private http: HttpClient,
    private toastService: ToastService) {}

  getMentors(): Observable<MSubscription[]> {
    return this.http.get<MSubscription[]>(`${this.apiUrlBase}/mentor/GetMentorSubscriptions`)
    .pipe(
      map(res =>res['results']),
      catchError(this.handleError())
    );
  }

  getMentor(MentorId: number): Observable<Mentor> {
    const msg = 'Mentor retrieved successfully!';
    return this.http.get<Mentor>(`${this.apiUrlBase}/mentor/get/${MentorId}`)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
      catchError(this.handleError())
    );
  }

  addMentor(mentor: Mentor): Observable<Mentor> {
    return this.http.post<Mentor>(`${this.apiUrlBase}/mentor/create`, mentor)
    .pipe(
      catchError(this.handleError(mentor))
    );
  }

  deleteMentor(mentor: Mentor): Observable<Mentor> {
    return this.http.delete(`${this.apiUrlBase}/mentors/${mentor.MentorId}`)
    .pipe(
      map(() => mentor),
      catchError(this.handleError(mentor))
    );
  }

  updateMentor(mentor: Mentor): Observable<Mentor> {
    return this.http.put<Mentor>(`${this.apiUrlBase}/mentors/${mentor.MentorId}`, mentor)
    .pipe(
      map(() => mentor),
      catchError(this.handleError(mentor))
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