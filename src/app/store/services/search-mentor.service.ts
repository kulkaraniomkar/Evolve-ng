import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { DataServiceError } from './data-error.service';
import { environment } from '../../../environments/environment';
import { SearchResults, SearchParams } from '../../core/model/mentor-search';

@Injectable()
export class SearchMentorDataService {

  apiUrlBase = environment.apiUrlBase;

  constructor(private http: HttpClient) {}

  searchMentors(searchParams: SearchParams): Observable<SearchResults[]> {
    return this.http.put<SearchResults[]>(`${this.apiUrlBase}/mentor/search`, searchParams)
    .pipe(
      map(res => res),
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