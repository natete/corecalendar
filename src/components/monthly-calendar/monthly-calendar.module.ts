import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { MonthlyCalendarComponent } from './monthly-calendar';

@NgModule({
  declarations: [
    MonthlyCalendarComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    MonthlyCalendarComponent
  ]
})
export class MonthlyCalendarComponentModule {
}
