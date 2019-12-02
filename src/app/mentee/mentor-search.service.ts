import { Injectable } from '@angular/core';
import { SearchParams, SearchResults } from '../core/model/mentor-search';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MentorSearchService {
  apiUrlBase = environment.apiUrlBase;
  constructor(private http: HttpClient) { }

  search(searchParams: SearchParams): Observable<SearchResults> {
    return this.http.put<SearchResults>(`${this.apiUrlBase}/mentor/search`, searchParams)
      .pipe(
        tap(s => console.log(s)),
        map(res => res)
      );
  }
}
