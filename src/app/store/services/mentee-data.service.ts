import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { Mentee } from '../../core/model/mentee';
import { DataServiceError } from './data-error.service';
import { environment } from '../../../environments/environment';
import { MSubscription } from '../../core/model/m-subscriptions';
import { ToastService } from '../../core/toast.service';

@Injectable()
export class MenteeDataService {

  apiUrlBase = environment.apiUrlBase;

  constructor(private http: HttpClient,
    private toastService: ToastService) {}

  getMentees(): Observable<MSubscription[]> {
    const msg = 'Mentee subscriptions retrieved successfully!';
   return this.http.get<MSubscription[]>(`${this.apiUrlBase}/mentee/GetMenteeSubscriptions`)
   // return this.http.get<MSubscription[]>(`${this.apiUrlBase}/msubscription`)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
      map(res =>res['results']),
      catchError(this.handleError())
    );
  }

  getMentee(MenteeId: number): Observable<Mentee> {
    const msg = 'Mentee retrieved successfully!';
    return this.http.get<Mentee>(`${this.apiUrlBase}/mentee/get/${MenteeId}`)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
      catchError(this.handleError())
    );
  }

  addMentee(mentee: Mentee): Observable<Mentee> {
    return this.http.post<Mentee>(`${this.apiUrlBase}/mentee/create`, mentee)
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
    const msg = 'Mentee updated successfully!';
    return this.http.put<Mentee>(`${this.apiUrlBase}/mentee/update?id=${mentee.MenteeId}`, mentee)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
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