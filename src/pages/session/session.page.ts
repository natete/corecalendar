import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavParams, PopoverController, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { HallProvider } from '../../providers/hall/hall.provider';
import { Hall } from '../../providers/hall/hall';
import { ProfessorProvider } from '../../providers/professor/professor.provider';
import { SearchPopoverComponent } from '../../components/search-popover/search-popover';
import { Session } from './session';
import { SessionProvider } from '../../providers/session/session.provider';
import { Professor } from '../../providers/professor/professor';

@IonicPage()
@Component({
  selector: 'page-session',
  templateUrl: 'session.page.html',
})
export class SessionPage {

  date: string;
  time: string;
  session: Session;
  halls: Hall[] = [];
  professors: Professor[];

  constructor(private navParams: NavParams,
              private viewCtrl: ViewController,
              private loadingCtrl: LoadingController,
              private popoverCtrl: PopoverController,
              private hallProvider: HallProvider,
              private professorProvider: ProfessorProvider,
              private sessionProvider: SessionProvider) {
  }

  ionViewDidLoad() {
    const loader = this.loadingCtrl.create();
    loader.present();

    this.initSession();

    this.hallProvider.getHalls()
        .subscribe(
            halls => {
              this.halls = halls;
              loader.dismissAll();
            }
        );

    this.professorProvider.getProfessors()
        .subscribe(professors => this.professors = professors);
  }

  searchUser(selectedClient: number) {
    const popover = this.popoverCtrl.create(SearchPopoverComponent, {}, { cssClass: 'popover-xl' });
    popover.present();
    popover.onDidDismiss(client => this.session.clients[selectedClient] = client);
  }

  saveSession() {

    this.session.date = moment(`${this.date} ${this.time}`, 'YYYY-MM-DD HH:mm').toDate();

    if (this.session.isGroup) {
      this.session.clients = [];
    }

    this.sessionProvider.saveSession(this.session)
        .subscribe(session => this.viewCtrl.dismiss(session));
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  compareEntities(e1: any, e2: any) {
    return e1 && e2 && e1.id === e2.id;
  }

  isValidSession() {
    return this.session.professor.id
        && this.session.date
        && this.session.hall
        && (this.session.isGroup || (this.session.clients[0] && !this.compareEntities(this.session.clients[0], this.session.clients[1])));
  }

  private initSession() {
    this.session = this.navParams.get('session') || new Session();
    const date = moment(this.navParams.get('date') || this.session.date);

    if (date.hour() < 8 || date.hour() > 21) {
      date.hour(8);
    }

    this.date = date.format('YYYY-MM-DD');
    this.time = date.format('HH:mm');
  }
}
