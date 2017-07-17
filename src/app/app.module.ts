import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CalendarProvider } from '../providers/calendar/calendar';
import { CalendarDateFormatter, CalendarModule } from 'angular-calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MonthlyCalendarComponent } from '../components/monthly-calendar/monthly-calendar';
import { DayDetailsPageModule } from '../pages/day-details/day-details.module';
import { CustomDateFormatter } from '../providers/date-formatter/custom-date-formatter';
import { EventPageModule } from '../pages/session/session.page.module';
import { AuthProvider } from '../providers/auth/auth.provider';
import { TokenProvider } from '../providers/token/token';
import { LoginPageModule } from '../pages/login/login.page.module';
import { HttpFactory } from '../providers/http/http.factory';
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HallProvider } from '../providers/hall/hall.provider';
import { ProfessorProvider } from '../providers/professor/professor.provider';
import { SearchPopoverComponent } from '../components/search-popover/search-popover';
import { ClientProvider } from '../providers/client/client.provider';
import { SessionProvider } from '../providers/session/session.provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MonthlyCalendarComponent,
    SearchPopoverComponent
  ],
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    CalendarModule.forRoot(),
    DayDetailsPageModule,
    EventPageModule,
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: CalendarDateFormatter, useClass: CustomDateFormatter },
    CalendarProvider,
    AuthProvider,
    TokenProvider,
    {
      provide: Http,
      useFactory: HttpFactory,
      deps: [XHRBackend, RequestOptions, TokenProvider]
    },
    HallProvider,
    ProfessorProvider,
    ClientProvider,
    SessionProvider
  ]
})
export class AppModule {
}
