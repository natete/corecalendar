import { Component, ViewChild } from '@angular/core';
import { IonicPage, LoadingController, ModalController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
import { Moment } from 'moment';
import { SessionPage } from '../session/session.page';
import { CalendarEvent } from 'calendar-utils/dist/calendar-utils';
import { SessionProvider } from '../../providers/session/session.provider';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Session } from '../session/session';

@IonicPage()
@Component({
  selector: 'page-day-details',
  templateUrl: 'day-details.html',
})
export class DayDetailsPage {

  selectedDate: Moment;
  private eventsSubject = new BehaviorSubject<CalendarEvent[]>(null);
  eventsObservable = this.eventsSubject.asObservable();
  eventWidth: number;
  @ViewChild('content') content: any;

  constructor(private viewCtrl: ViewController,
              private navParams: NavParams,
              private loadingCtrl: LoadingController,
              private modalCtrl: ModalController,
              private sessionProvider: SessionProvider) {
    this.selectedDate = this.navParams.get('date');
    this.searchEvents();
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText(this.selectedDate.format('MMMM').toLocaleUpperCase());
  }

  ionViewDidEnter() {
    this.eventWidth = (this.content.contentWidth - 70) / 5;

  }

  showAddEvent(date?: Date) {
    let addEventModal = this.modalCtrl.create(SessionPage, { date });
    addEventModal.onDidDismiss(session => session && this.eventsSubject.next(this.eventsSubject.getValue().concat(session)));
    addEventModal.present();
  }

  showEditEvent(session: Session) {
    let addEventModal = this.modalCtrl.create(SessionPage, { session });
    addEventModal.onDidDismiss(session => session && this.eventsSubject.next(this.eventsSubject.getValue().concat(session)));
    addEventModal.present();
  }

  private searchEvents() {
    const loader = this.loadingCtrl.create();
    loader.present();

    const startDate = moment(this.selectedDate).date(1).hour(0).minute(0);
    const endDate = moment(this.selectedDate).date(1).hour(0).minute(0).add(1, 'month').subtract(1, 'minute');

    this.sessionProvider.getSessions(startDate.toDate(), endDate.toDate())
        .subscribe(calendarEvents => {
          this.eventsSubject.next(calendarEvents);
          loader.dismissAll();
        });
  }
}
