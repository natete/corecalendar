import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Moment } from 'moment';
import { DayDetailsPage } from '../day-details/day-details';
import { CalendarEvent } from 'calendar-utils/dist/calendar-utils';
import { SessionPage } from '../session/session.page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  month: string;

  constructor(private navCtrl: NavController,
              private modalCtrl: ModalController) { }

  goToDate({ date, events }: { date: Moment, events: CalendarEvent[] }) {
    this.navCtrl.push(DayDetailsPage, { date, events });
  }

  showAddEvent() {
    let addEventModal = this.modalCtrl.create(SessionPage);
    addEventModal.present();
  }
}
