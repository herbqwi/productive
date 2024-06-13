'use client'

import classes from './calendar.module.sass'
import clsx from 'clsx';
import { IStateToggle } from '@/@types/global';
import { format, isToday } from 'date-fns';
import useCalendar from '@/public/hooks/core/nav-menu/calendar.hook';

import CalendarHeader from './calendar-header/calendar-header.component';

interface IProps {
  open: IStateToggle<boolean>;
}

export default function Calendar(props: IProps) {
  const { currentDate, weekDays, monthDays, restMonthDays, nextMonth, prevMonth } = useCalendar();

  return (
    <div className={clsx(classes.calendar, { [classes.closed]: !props.open.value })}>
      <CalendarHeader currentDate={currentDate} prevMonth={prevMonth} nextMonth={nextMonth} />
      <div className={classes['days-wrapper']}>
        {weekDays.value.map(day => (
          <div className={classes['week-day']} key={day}>{day}</div>
        ))}
        {monthDays.value.map(day => {
          const formattedDay = format(day, 'd');
          return (
            <div className={clsx({ [classes.today]: isToday(day) })} key={formattedDay}>{formattedDay}</div>
          )
        })}
        {restMonthDays.value.map(day => (
          <div className={classes['rest-day']} key={`${day}-rest`}>{day}</div>
        ))}
      </div>
    </div>
  )
}