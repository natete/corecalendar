import { Component, OnInit } from '@angular/core';
import { ClientProvider } from '../../providers/client/client.provider';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import { Person } from '../../providers/professor/person';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'search-popover',
  templateUrl: 'search-popover.html'
})
export class SearchPopoverComponent implements OnInit {

  searchTerm: string;
  searchSubject = new Subject<string>();
  clients: Person[];

  constructor(private viewCtrl: ViewController,
              private clientProvider: ClientProvider) { }


  ngOnInit(): void {
    this.searchSubject.asObservable().debounceTime(500).subscribe(() => this.updateSearch());
  }

  onTextChange() {
    this.searchSubject.next(this.searchTerm);
  }

  selectClient(client: Person) {
    this.viewCtrl.dismiss(client);
  }

  private updateSearch() {
    this.clientProvider.getClients(this.searchTerm)
        .subscribe(clients => this.clients = clients);
  }
}
