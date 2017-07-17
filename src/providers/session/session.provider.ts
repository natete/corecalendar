import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import { Session } from '../../pages/session/session';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../app/environments/environment';
import * as moment from 'moment';
import { SessionEvent } from '../../pages/session/session-event';

@Injectable()
export class SessionProvider {

  private readonly ENDPOINT = `${environment.baseUrl}/session`;

  constructor(private http: Http) { }

  getSessions(startDate: Date, endDate: Date): Observable<any> {

    const params: { [key: string]: any } = { startDate, endDate };

    const options: RequestOptionsArgs = {};

    options.params = params;

    return this.http.get(this.ENDPOINT, options)
               .map((res: any) => res.content.map(session => this.mapSessionToCalendarEvent(new Session(session))));
  }

  saveSession(session: Session): Observable<any> {
    return this.http.post(this.ENDPOINT, session)
               .map(rawSession => this.mapSessionToCalendarEvent(new Session(session)));
  }

  private mapSessionToCalendarEvent(session: Session): SessionEvent {
    return {
      start: session.date,
      end: moment(session.date).add(1, 'hour').toDate(),
      title: session.isGroup ? 'Grupo' : session.clients.map(client => client.getFullName()).join('\n'),
      color: { primary: session.professor.color, secondary: session.professor.color },
      cssClass: 'core-session',
      session
    }
  }
}
