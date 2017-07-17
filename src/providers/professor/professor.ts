import { Person } from './person';

export class Professor extends Person {
  color: string;

  constructor(rawPerson: any = {}) {
    super(rawPerson);

    this.color = rawPerson.color;
  }
}