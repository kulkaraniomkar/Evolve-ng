import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { SearchParams, SearchResults } from './model/mentor-search';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MentorSearchService {
  apiUrlBase = environment.apiUrlBase;
  constructor(private http: HttpClient) { }

  search(searchParams: SearchParams): Observable<SearchResults> {
    return this.http.put<SearchParams>(`${this.apiUrlBase}/mentor/search`, searchParams)
      .pipe(
        tap(s => console.log(s)),
        map(res => res['results'])
      );
  }
}