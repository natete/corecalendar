import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SessionPage } from './session.page';
import { SearchPopoverComponent } from '../../components/search-popover/search-popover';

@NgModule({
  declarations: [
    SessionPage,
  ],
  entryComponents: [
    SearchPopoverComponent
  ],
  imports: [
    IonicPageModule.forChild(SessionPage),
  ],
  exports: [
    SessionPage
  ]
})
export class EventPageModule {
}
