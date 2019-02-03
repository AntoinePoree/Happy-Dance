import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Prof } from '../shared/models/prof.model';

@Injectable()
export class ProfService {

  constructor(private http: HttpClient) { }

  getProfs(): Observable<Prof[]> {
    return this.http.get<Prof[]>('/api/profs');
  }

  countProfs(): Observable<number> {
    return this.http.get<number>('/api/profs/count');
  }

  addProf(prof: Prof): Observable<Prof> {
    return this.http.post<Prof>('/api/prof', prof);
  }

  getProf(prof: Prof): Observable<Prof> {
    return this.http.get<Prof>(`/api/prof/${prof._id}`);
  }

  editProf(prof: Prof): Observable<string> {
    return this.http.put(`/api/prof/${prof._id}`, prof, { responseType: 'text' });
  }

  deleteProf(prof: Prof): Observable<string> {
    return this.http.delete(`/api/prof/${prof._id}`, { responseType: 'text' });
  }

}
