import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Moment } from 'moment';
import { DayDetailsPage } from '../day-details/day-details';
import { CalendarEvent } from 'calendar-utils/dist/calendar-utils';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  month: string;

  constructor(private navCtrl: NavController) { }

  goToDate({ date, events }: { date: Moment, events: CalendarEvent[] }) {
    this.navCtrl.push(DayDetailsPage, { date, events });
  }
}
