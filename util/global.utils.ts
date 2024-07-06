import { ITime } from "@/components/core/input/time-input/time-input.component";
import { format, isSameDay, isSameMonth, isSameYear, setHours, setMinutes, setSeconds } from "date-fns"


export const isDatesEqual = (date1?: Date, date2?: Date) => {
  if (!date1 || !date2) {
    return false;
  }

  return (
    isSameDay(date1, date2)
    && isSameMonth(date1, date2)
    && isSameYear(date1, date2)
  )
}

export const convertDateToString = (date?: Date, formatStr?: string) => (
  date ? format(date || new Date(), formatStr || 'MMM d, yyyy') : ''
)

export const parseTimeString = (timeString: string): ITime => {
  let [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  modifier = modifier?.toUpperCase()

  modifier ||= 'AM';

  if (modifier === 'PM' && hours < 12) {
    hours += 12;
  }
  if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return { hours, minutes: minutes || 0 };
};

export const setTimeToDate = ({ date, timeString, time }: { date?: Date, timeString?: string, time?: ITime }) => {
  if (!timeString && !time) {
    return date || new Date();
  }

  const { hours, minutes } = time ?? parseTimeString(timeString!);
  let newDate = setHours(date || new Date(), hours);
  newDate = setMinutes(newDate, minutes);
  newDate = setSeconds(newDate, 0);
  return newDate;
};