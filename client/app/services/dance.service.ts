import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Dance } from '../shared/models/dance.model';

@Injectable()
export class DanceService {

  constructor(private http: HttpClient) { }

  getDances(): Observable<Dance[]> {
    return this.http.get<Dance[]>('/api/dances');
  }

  countDances(): Observable<number> {
    return this.http.get<number>('/api/dances/count');
  }

  addDance(dance: Dance): Observable<Dance> {
    return this.http.post<Dance>('/api/dance', dance);
  }

  getDance(danceid: string): Observable<Dance> {
    return this.http.get<Dance>(`/api/dance/${danceid}`);
  }

  editDance(dance: Dance): Observable<string> {
    return this.http.put(`/api/dance/${dance._id}`, dance, { responseType: 'text' });
  }

  deleteDance(dance: Dance): Observable<string> {
    return this.http.delete(`/api/dance/${dance._id}`, { responseType: 'text' });
  }

}
