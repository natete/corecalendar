import { CalendarEvent } from 'calendar-utils/dist/calendar-utils';
import { Session } from './session';

export interface SessionEvent extends CalendarEvent {
  session: Session;
}