import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {Injectable} from 'angular2/core';
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

  getTicker(ticker: string): Observable<Response> {
     return this.http
      .get('api/secdata/' + ticker, {
        headers: JSON_HEADERS
      });
  }
  
  serverData(data:any) {
     
  }
  
  errorMessage(err:any) {
     
  }
}