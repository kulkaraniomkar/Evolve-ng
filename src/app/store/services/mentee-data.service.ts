import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { Mentee } from '../../core/model/mentee';
import { DataServiceError } from './data-error.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class MenteeDataService {

  apiUrlBase = environment.apiUrlBase;

  constructor(private http: HttpClient) {}

  getMentees(): Observable<Mentee[]> {
    return this.http.get<Mentee[]>(`${this.apiUrlBase}/mentee/getAll`)
    .pipe(
      catchError(this.handleError())
    );
  }

  getMentee(id: number): Observable<Mentee> {
    return this.http.get<Mentee>(`${this.apiUrlBase}/mentee/get/${id}`)
    .pipe(
      map(res => {
        console.log(res['results'][0]);
        return res['results'][0];
      }),
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
