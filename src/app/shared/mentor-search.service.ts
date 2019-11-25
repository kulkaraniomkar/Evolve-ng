import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { GithubResponse, Items } from './interface';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(private http: HttpClient) {}

  search(query: string, inDiv: number, limit: number, division: string): Observable<GithubResponse> {
    const url = 'https://api.github.com/search/repositories';
    const urlSearch = `http://rmb-vdv-aspn01/Evolve/ReflectWebAPI/api/mentor/search/${query}/${inDiv}/${limit}/${division}`;
    console.log(urlSearch);
    return this.http
      .get<GithubResponse>(url, {
        observe: 'response',
        params: {
          q: query,
          sort: 'stars',
          order: 'desc'
        }
      })
      .pipe(
        map(res => {
          return res.body;
        })
      );
  }
}