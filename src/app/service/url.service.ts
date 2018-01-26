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
   * 传向服务一个 longURL
   * 获取返回的一个 URLPair 。
   *
   * 可以参考 https://github.com/fcbento/angular5-nodejs-restapi/blob/master/angular-nodejsapi/src/app/services/employee.service.ts
   * 的写法
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

  // 保存， 上面代码所用于探索
  // getReturnedURLPairByInputURL(inputURL: string) : Observable<UrlPair> {
  //   const URLPair = {
  //     longURL: inputURL,
  //   };

  //   return this.http.post<UrlPair>(
  //     // this.apiURL,
  //     "/api/shorten/?longURL=" + inputURL,
  //     {
  //       "longURL": inputURL,
  //     },
  //   ).pipe(
  //     tap(_ => console.log(`found longURL matching "${inputURL}"`)),
  //     catchError(this.handleError<UrlPair>('searchHeroes', undefined)),
  //   );
  // }

    // /**
  //  * 实验， 只是 get  请求。 真正应该是 post 请求。
  //  * @param inputURL
  //  */
  // getShortURLByInputURL(inputURL: string): Observable<UrlPair[]> {
  //   // 判断输入是否为空
  //   var longURL = inputURL;
  //   return this.http.get<UrlPair[]>(`api/urls/?longURL=${longURL}`).pipe(
  //     tap(_ => console.log(`found longURL matching "${longURL}"`)),
  //     catchError(this.handleError<UrlPair[]>('searchHeroes', [])),
  //   )
  // }

  // /**
  //  * 通过输入的 InputURL 获得 ShortURL
  //  * 先写同步的模拟， 后面掉孙 http 时再改成异步的
  //  */
  // getShortURLByInputURL(inputURL: string): string {
  //   var longURL = inputURL;
  //   // 使用 http 发送
  //   return "shortURLByreturn";

  // }

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
