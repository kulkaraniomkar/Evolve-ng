import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { IMenteeHttp, IMenteeService, IMenteeSubscriptionService } from '../models/http-models/mentee-http.interface';
import { NzNotificationService } from 'ng-zorro-antd';
import { IMentee } from '../models/mentee.interface';
import { ISubscriptionsHttp } from '../models/http-models/subscription-http.interface';
import { IPage } from '../models/page.interface';

@Injectable()
export class MenteeService {
  apiUrlBase = environment.apiUrlBase;
  constructor(
    private _http: HttpClient,
    private _notification: NzNotificationService) { }
  /** add mentee */
  addMentee(mentee: IMentee): Observable<IMenteeService> {

    return this._http.post<IMenteeHttp>(`${this.apiUrlBase}/mentee/create`, mentee)
      .pipe(
        tap((data) => { this._notification.success('Mentee', 'Created successfully') }),
        map(data => ({
          mentee: data
        })),
        catchError(this.handleError(mentee))
      );
  }
  /** update */
  updateMentee(mentee: IMentee): Observable<IMenteeService> {
    return this._http.put<IMentee>(`${this.apiUrlBase}/mentee/update/${mentee.MenteeId}`, mentee)
      .pipe(
        tap((data) => { this._notification.success('Mentee', 'Updated successfully') }),
        map(data => ({
          mentee: data
        })),
        catchError(this.handleError(mentee))
      )
  }
  /** get mentee */
  getMenteeById(menteeId: number): Observable<IMenteeService> {
    return this._http.get<IMenteeHttp>(`${this.apiUrlBase}/mentee/get/${menteeId}`)
      .pipe(
        map(data => ({
          mentee: data
        })),
        catchError(this.handleError())
      )
  }
  getMenteeSubscription(paging: IPage): Observable<IMenteeSubscriptionService> {
    return this._http.get<ISubscriptionsHttp>(`${this.apiUrlBase}/mentee/getmenteesubscriptions/${paging.pageNumber}/${paging.pageSize}`)
      .pipe(
        tap(() => this._notification.success('Mentee registered', 'Retrieved successfully')),
        map(results => ({
          page: {
            pageNumber: results.pageNumber ? results.pageNumber : 1,
            pageSize: results.pageSize ?  results.pageSize : 5,
            totalItems: results.totalItems,
          },
          signupStatus: results.Registered,
          menteeSubscription: results.data
        })),
        catchError(this.handleError())
      )
  }

  private handleError<T>(requestData?: T) {
    console.log(requestData);
    return (res: HttpErrorResponse) => {
      this._notification.error('Mentee', `Error: ${res.error['Message']}`);
      return throwError(res.error['Message']);
    };
  }
}