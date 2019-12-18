import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { DataServiceError } from './data-error.service';
import { environment } from '../../../environments/environment';
import { MSubscription } from '../../core/model/m-subscriptions';
import { ToastService } from '../../core/toast.service';
import { MentorMatch } from '../../core/model/mentor-match';

@Injectable()
export class MSubscriptionDataService {

  apiUrlBase = environment.apiUrlBase;

  constructor(private http: HttpClient,
    private toastService: ToastService) {}

  getMSubscriptions(): Observable<MSubscription[]> {
    const msg = 'Mentee subscriptions retrieved successfully!';
   return this.http.get<MSubscription[]>(`${this.apiUrlBase}/admin/GetPendingSubscriptions`)
   // return this.http.get<MSubscription[]>(`${this.apiUrlBase}/msubscription`)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
      map(res =>res['results']),
      catchError(this.handleError())
    );
  }

  getAutomatch(menteeId: number): Observable<MentorMatch[]> {
    const msg = 'Auto match list retrieved successfully!';
   return this.http.get<MentorMatch[]>(`${this.apiUrlBase}/admin/runautomatching/${menteeId}`)
   // return this.http.get<MSubscription[]>(`${this.apiUrlBase}/msubscription`)
    .pipe(
      tap(() => this.toastService.openSnackBar(msg, 'GET')),
      map(res =>res['results']),
      catchError(this.handleError())
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