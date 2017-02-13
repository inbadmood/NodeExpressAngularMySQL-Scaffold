import { Component, Injectable }                 from '@angular/core';

import { Http, Response, ResponseContentType }   from '@angular/http';
import { Headers, RequestOptions}                from '@angular/http';
import { Request, RequestMethod }                from '@angular/http';
import { URLSearchParams}                        from '@angular/http';
import { Observable }                            from 'rxjs/Observable';
import                                                'rxjs/add/operator/map';

@Injectable()

export class SubmitService {

  constructor (private url: Http) {}

  post(value: Object): Observable<any> {
    return this.url.post('/post/', value);
  }

  getRecords() : Observable<any> {
    return this.url.get('/records');
  }

  deleteRecord(value: Object) : Observable<any> {
    return this.url.put('/deleterecord/', value);
  }
}
