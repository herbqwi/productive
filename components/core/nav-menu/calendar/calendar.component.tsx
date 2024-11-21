'use client'

import classes from './calendar.module.sass'
import clsx from 'clsx';
import { IStateToggle } from '@/@types/global';
import { format, isAfter, isBefore, isToday } from 'date-fns';
import { isDatesEqual } from '@/util/global.utils';
import useCalendar from '@/hooks/core/nav-menu/calendar.hook';

import CalendarHeader from './calendar-header/calendar-header.component';

export interface ICalendarProps {
  open: IStateToggle<boolean>;
}

export default function Calendar(props: ICalendarProps) {
  const { currentDate, headerDays, calendarCells, viewWindow, nextMonthHandler, prevMonthHandler, calendarCellHandler } = useCalendar(props);

  return (
    <div className={clsx(classes.calendar, { [classes.closed]: !props.open.value })}>
      <CalendarHeader currentDate={currentDate} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler} />
      <div className={classes['days-wrapper']}>
        {headerDays.value.map(day => (
          <div className={classes['week-day']} key={day.getDay()}>{format(day, 'eeeeee')}</div>
        ))}
        {calendarCells.value.map(day => {
          const formattedDay = format(day, 'd');
          const isNextMonth = day.getMonth() != currentDate.value.getMonth()
          const [leftWindowBorder, rightWindowBorder] = viewWindow.value;
          const isFirstSelected = isDatesEqual(day, leftWindowBorder);
          const isLastSelected = isDatesEqual(day, rightWindowBorder);
          const isSelected = isAfter(day, leftWindowBorder) && isBefore(day, rightWindowBorder);

          return (
            <div
              className={clsx({
                [classes.today]: isToday(day),
                [classes['next-month']]: isNextMonth,
                [classes.selected]: isSelected,
                [classes['first-selected']]: isFirstSelected,
                [classes['last-selected']]: isLastSelected,
              })}
              onClick={() => { calendarCellHandler(day) }}
              key={`${formattedDay}${isNextMonth ? '--next' : ''}`}>
              {formattedDay}
            </div>
          )
        })}
      </div>
    </div>
  )
}