export class Person {
  id: number;
  name: string;
  firstSurname: string;

  constructor(rawPerson: any = {}) {
    this.id = rawPerson.id;
    this.name = rawPerson.name;
    this.firstSurname = rawPerson.firstSurname;
  }

  getFullName(): string {
    return `${this.name} ${this.firstSurname}`;
  }
}