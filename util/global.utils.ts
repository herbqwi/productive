import { format, isSameDay, isSameMonth, isSameYear } from "date-fns"


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
  date ? format(date, formatStr || 'dd MMM yyyy') : ''
)