import { CalendarDateFormatter, DateFormatterParams } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import {
  addHours,
  isAfter,
  endOfDay,
  endOfMonth,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  addMinutes,
  subMinutes,
  endOfHour,
  differenceInHours,
  differenceInMinutes
  , isBefore,
} from 'date-fns';
@Injectable()
export class CustomDateFormatter extends CalendarDateFormatter {
  // you can override any of the methods defined in the parent class

  public dayViewHour({ date, locale }: DateFormatterParams): string {
    return new DatePipe(locale).transform(date, 'HH-', (-date.getTimezoneOffset()).toString(),locale)+
      new DatePipe(locale).transform(addHours(date,1 ), 'HH', (-date.getTimezoneOffset()).toString(),locale);
  }

  public weekViewHour({ date, locale }: DateFormatterParams): string {
    return this.dayViewHour({ date, locale });
  }
}
