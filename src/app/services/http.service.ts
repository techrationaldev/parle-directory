import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { GlobalVarService } from './global-var.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private globalVar: GlobalVarService,
  ) {}

  public GETWithoutToken(url: any): Observable<any> {
    return this.http.get(url, { responseType: 'blob'}).pipe(
        map((response) => {
           return response;
        }),
        catchError(async (error) => this.handleErrors(error))
      );
  }

  public POST(url: any, data: any): Observable<any> {
    const _headers = new HttpHeaders({
      'Authorization': this.globalVar.access_token,
    });

    return this.http.post<any>(environment.baseUrl + url, data, {
        headers: _headers,
      }).pipe(
        map((response) => {
           return response;
        }),
        catchError(async (error) => this.handleErrors(error))
      );
  }

  public POSTWithoutToken(url: any, data: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + url, data, {
        headers: new HttpHeaders({}),
      }).pipe(
        map((response) => {
          return response;
        }),
        catchError(async (error) => this.handleErrors(error))
      );
  }

  private handleErrors(error: HttpErrorResponse) {
    let errMsg: any;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error} ${err}`;
    } else {
      errMsg = error.error ? error.error : JSON.stringify(error);
    }
    if(errMsg) {
      this.globalVar.isTokenApiErr = true;
    }
    return throwError(errMsg);
  }
}