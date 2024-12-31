import { addDays, addMonths, endOfMonth, startOfMonth, startOfWeek, subMonths } from "date-fns";
import { ICalendarProps } from "@/components/core/side-nav/calendar/calendar.component";
import { getUserSettings } from "@/util/user.util";
import { useEffect, useState } from "react";


export default function useCalendar(props: ICalendarProps) {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [headerDays, setHeaderDays] = useState<Date[]>([]);
  const [calendarCells, setCalendarCells] = useState<Date[]>([]);
  const [viewWindow, setViewWindow] = useState<Date[]>([]);

  useEffect(() => {
    const getHeaderDays = () => {
      const days = [];
      let date = startOfWeek(new Date());

      for (let i = 0; i < 7; i++) {
        days.push(date);
        date = addDays(date, 1);
      }

      return days
    }

    setHeaderDays(getHeaderDays)
  }, []);

  useEffect(() => {
    const getCalendarCells = () => {
      const days = [];
      let monthStart = startOfMonth(currentDate);
      const monthEnd = endOfMonth(monthStart);

      while ((monthStart <= monthEnd) || !!(days.length % 7)) {
        days.push(monthStart);
        monthStart = addDays(monthStart, 1);
      }

      return days;
    }

    setCalendarCells(getCalendarCells());
  }, [currentDate])

  const nextMonthHandler = () => (
    setCurrentDate(addMonths(currentDate, 1))
  )

  const prevMonthHandler = () => (
    setCurrentDate(subMonths(currentDate, 1))
  )

  const calendarCellHandler = (date: Date) => {
    const { daysWindow } = getUserSettings();
    setViewWindow([date, addDays(date, daysWindow)]);
  }

  return {
    currentDate: {
      value: currentDate,
      set: setCurrentDate
    },
    headerDays: {
      value: headerDays,
      set: setHeaderDays
    },
    calendarCells: {
      value: calendarCells,
      set: setCalendarCells
    },
    viewWindow: {
      value: viewWindow,
      set: setViewWindow
    },
    nextMonthHandler,
    prevMonthHandler,
    calendarCellHandler
  }
}