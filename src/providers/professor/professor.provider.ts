import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../app/environments/environment';
import { Professor } from './professor';

@Injectable()
export class ProfessorProvider {

  private readonly ENDPOINT = `${environment.baseUrl}/professor`;

  constructor(private http: Http) { }

  getProfessors(): Observable<Professor[]> {
    return this.http.get(this.ENDPOINT)
               .map((res: any) => res.content.map(professor => new Professor(professor)));
  }
}
