import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { UrlPair } from '../template/urlPair';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
// import { Http, Headers } from '@angular/http';


@Injectable()
export class UrlService {

  private apiURL :string = 'api/shorten';

  constructor(
    private http: HttpClient,
  ) { }

  /**
   *
   * 发送 Post 请求
   * 获取返回的一个 URLPair 。
   *
   * @param inputURL
   */
  getReturnedURLPairByInputURL(inputURL: string) : Observable<UrlPair> {
    const URLPair = {
      longURL: inputURL,
    };

    return this.http.post<UrlPair>(
      this.apiURL,
      {
        longURL: inputURL,
      },
    ).pipe(
      tap(_ => console.log(`found longURL matching "${inputURL}"`)),
      catchError(this.handleError<UrlPair>('searchHeroes', undefined)),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
