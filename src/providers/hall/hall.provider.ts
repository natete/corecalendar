import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../app/environments/environment';
import { Hall } from './hall';

@Injectable()
export class HallProvider {

  private readonly ENDPOINT = `${environment.baseUrl}/admin/hall`;

  constructor(private http: Http) { }

  getHalls(): Observable<Hall[]> {
    return this.http.get(this.ENDPOINT)
               .map((res: any) => res.content as Hall[]);
  }
}
