import { useMemo } from 'react';
import classes from './calendar-section.module.sass';
import clsx from 'clsx';
import { useDateTimePickerStore } from '@/stores';
import { calculateMonthDays } from '@/util';

export default function CalendarSection() {
  useDateTimePickerStore(state => state.date.start.value);
  const viewport = useDateTimePickerStore(state => state.viewport);
  const isDateSelected = useDateTimePickerStore(state => state.isDateSelected);
  const isOutOfThisMonth = useDateTimePickerStore(state => state.isOutOfThisMonth);
  const setDate = useDateTimePickerStore(state => state.setStartingDate);

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
        <button
          key={day.toISOString()}
          className={clsx(classes['month-day'], {
            [classes.outmonth]: isOutOfThisMonth(day),
            [classes.selected]: isDateSelected(day)
          })}
          onClick={() => setDate(day)}
        >
          {day.format('D')}
        </button>
      ))}
    </div>
  )
}