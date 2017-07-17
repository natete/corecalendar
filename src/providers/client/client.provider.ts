import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Person } from '../professor/person';
import { environment } from '../../app/environments/environment';

@Injectable()
export class ClientProvider {

  private readonly ENDPOINT = `${environment.baseUrl}/clients`;

  constructor(public http: Http) {
    console.log('Hello ClientProvider Provider');
  }

  getClients(searchTerm: string): Observable<Person[]> {

    const params: { [key: string]: any } = {
      direction: 'ASC',
      page: 0,
      size: 3,
      q: searchTerm
    };

    const options: RequestOptionsArgs = {};

    options.params = params;

    return this.http.get(this.ENDPOINT, options)
               .map((res: any) => res.content.map(person => new Person(person)));
  }
}
