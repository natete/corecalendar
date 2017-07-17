import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DAYS_OF_WEEK } from 'calendar-utils/dist/calendar-utils';
import * as moment from 'moment';
import { Moment } from 'moment';

@Component({
  selector: 'monthly-calendar',
  templateUrl: 'monthly-calendar.html'
})
export class MonthlyCalendarComponent implements OnInit {
  date: Moment = moment();
  locale: string = 'es';
  weekStartsOn = DAYS_OF_WEEK.MONDAY;
  labels = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA'];
  excludeDays = [0];

  @Output() onClick = new EventEmitter<any>();
  @Output() onChangeMonth = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.onChangeMonth.emit(this.date.format('MMMM'));
  }

  onSwipe(direction: number) {
    console.log(direction);
    if (direction === 2) {
      this.date.add(1, 'month');
    } else if (direction === 4) {
      this.date.subtract(1, 'month');
    }

    if (direction === 2 || direction === 4) {
      this.onChangeMonth.emit(this.date.format('MMMM'));
    }
  }

  onDateSelected(date: Date) {
    this.onClick.emit({ date: moment(date) });
  }


}
