import {Http, HTTP_PROVIDERS, Headers, Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

const JSON_HEADERS = new Headers();
JSON_HEADERS.append('Accept', 'application/json');
JSON_HEADERS.append('Content-Type', 'application/json');

@Injectable()
export class SECDataService {
  // These are member type
  title: string;
  data: Array<any> = []; // default data

  // TypeScript public modifiers
  constructor(public http: Http) {
    this.title = 'Angular 2';
  }

  getFiling(ticker: string): Observable<Response> {
     return this.http
      .get('api/secdata/' + ticker + '/filing', {
        headers: JSON_HEADERS
      });
  }

  getSymbol(ticker: string): Observable<Symbol> {
     return this.http
      .get('api/secdata/' + ticker + '/symbol', {
        headers: JSON_HEADERS
      }).map(resp => resp.json());
  }

  searchSymbols(ticker: string): Observable<Array<Symbol>> {
     return this.http
      .get('api/secdata/symbols/search/' + ticker, {
        headers: JSON_HEADERS
      }).map(resp => resp.json());
  }

  errorMessage(err:any) {

  }
}