import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SearchPopoverComponent } from './search-popover';

@NgModule({
  declarations: [
    SearchPopoverComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    SearchPopoverComponent
  ]
})
export class SearchPopoverComponentModule {
}
