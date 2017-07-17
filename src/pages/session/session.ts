import { Person } from '../../providers/professor/person';
import { Hall } from '../../providers/hall/hall';
import { Professor } from '../../providers/professor/professor';
import * as moment from 'moment';

export class Session {
  id?: number;
  date: Date;
  hall: Hall;
  professor: Professor;
  clients?: Person[];
  isGroup: boolean;

  constructor(rawSession: any = {}) {
    this.id = rawSession.id;
    this.date = moment(rawSession.date).toDate();
    this.hall = rawSession.hall;
    this.professor = new Professor(rawSession.professor);
    this.clients = rawSession.isGroup ? [] : rawSession.clients ? rawSession.clients.map(client => new Person(client)) : [];
    this.isGroup = rawSession.isGroup;
  }
}