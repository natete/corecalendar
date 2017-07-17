import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CalendarComponent } from './calendar';

@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarComponentModule {
}
