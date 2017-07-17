import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Moment } from 'moment';

/**
 * Generated class for the CalendarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent implements OnInit {

  @ViewChild('wrapper') content: ElementRef;
  @Input() activeDay: Moment;
  @Output() onDateChanged = new EventEmitter<Moment>();
  days: Moment[] = [];
  daysOfTheWeek = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

  constructor() { }

  ngOnInit(): void {
    const month = this.activeDay.month();
    let firstDay = moment().date(1);

    while (firstDay.month() === month) {
      const day = moment(firstDay);
      this.days.push(day);
      firstDay.add(1, 'days');
    }
    this.days = this.days.slice(0, this.days.length - 1);

  }

  ngAfterViewInit(): void {
    this.scrollToDate(this.content.nativeElement.children[this.activeDay.date() - 1]);
  }

  selectDate(date: Moment, target: Element) {
    this.activeDay = date;

    this.scrollToDate(target);
    this.onDateChanged.emit(date);
  }

  private scrollToDate(target) {
    if (target.className.indexOf('date-wrapper') === -1) {
      target = target.parentElement;
    }

    const pos = target.offsetLeft;
    const parentWidth = target.parentElement.offsetWidth;

    // 5 is the margin right and left of every .date-wrapper
    target.parentElement.scrollLeft = pos + 5 - (parentWidth / 2);
  }
}
