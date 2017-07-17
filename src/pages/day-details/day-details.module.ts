import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DayDetailsPage } from './day-details';
import { CalendarComponent } from '../../components/calendar/calendar';
import { CalendarDateFormatter, CalendarModule } from 'angular-calendar';
import { CustomDateFormatter } from '../../providers/date-formatter/custom-date-formatter';

@NgModule({
  declarations: [
    DayDetailsPage,
    CalendarComponent
  ],
  imports: [
    IonicPageModule.forChild(DayDetailsPage),
    CalendarModule.forRoot()
  ],
  exports: [
    DayDetailsPage
  ],
  providers: [
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter }
  ]
})
export class DayDetailsPageModule {
}
