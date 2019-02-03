import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Bureau } from '../shared/models/bureau.model';

@Injectable()
export class BureauService {

  constructor(private http: HttpClient) { }

  getBureaux(): Observable<Bureau[]> {
    return this.http.get<Bureau[]>('/api/bureaux');
  }

  countBureaux(): Observable<number> {
    return this.http.get<number>('/api/bureaux/count');
  }

  addBureau(bureau: Bureau): Observable<Bureau> {
    return this.http.post<Bureau>('/api/bureau', bureau);
  }

  getBureau(bureau: Bureau): Observable<Bureau> {
    return this.http.get<Bureau>(`/api/bureau/${bureau._id}`);
  }

  editBureau(bureau: Bureau): Observable<string> {
    return this.http.put(`/api/bureau/${bureau._id}`, bureau, { responseType: 'text' });
  }

  deleteBureau(bureau: Bureau): Observable<string> {
    return this.http.delete(`/api/bureau/${bureau._id}`, { responseType: 'text' });
  }

}
