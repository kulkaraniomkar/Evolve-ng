import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { MenteeDisplayData } from '../../core/model/mentee-display-data';
import { DataServiceError } from './data-error.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class MenteeDisplayDataService {

  apiUrlBase = environment.apiUrlBase;

  constructor(private http: HttpClient) {}


  getMenteeDisplayData(id?: number | string): Observable<MenteeDisplayData> {
    return this.http.get<MenteeDisplayData>(`${this.apiUrlBase}/mentee/get/${id}`)
    .pipe(
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
