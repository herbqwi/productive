import { useEffect, useMemo } from 'react';
import classes from './calendar-section.module.sass';
import { useDateTimePickerStore } from '@/stores';
import { calculateMonthDays } from '@/util';
import clsx from 'clsx';

export default function CalendarSection() {
  const viewport = useDateTimePickerStore(state => state.viewport);
  const isDateSelected = useDateTimePickerStore(state => state.isDateSelected);
  const isOutOfThisMonth = useDateTimePickerStore(state => state.isOutOfThisMonth);
  const setDate = useDateTimePickerStore(state => state.setDate);

  const HEADER_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthDays = useMemo(() => (
    calculateMonthDays(viewport)
  ), [viewport])

  return (
    <div className={classes.wrapper}>
      {HEADER_DAYS.map(day => (
        <p className={classes['week-day']} key={day}>{day}</p>
      ))}
      {monthDays.map(day => (
        <p
          key={day.toISOString()}
          className={clsx(classes['month-day'], {
            [classes.outmonth]: isOutOfThisMonth(day),
            [classes.selected]: isDateSelected(day)
          })}
          onClick={() => setDate(day)}
        >
          {day.format('D')}
        </p>
      ))}
    </div>
  )
}