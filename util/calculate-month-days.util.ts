import { Dayjs } from "dayjs";

export default function calculateMonthDays(viewport: Dayjs): Dayjs[] {
  const days: Dayjs[] = [];

  const firstDayOfMonth = viewport.startOf("month");
  const firstDayIndex = firstDayOfMonth.day();

  const daysInCurrentMonth = viewport.daysInMonth();
  const previousMonth = viewport.subtract(1, "month");
  const daysInPreviousMonth = previousMonth.daysInMonth();

  for (let i = daysInPreviousMonth - firstDayIndex + 1; i <= daysInPreviousMonth; i++) {
    days.push(previousMonth.date(i));
  }

  for (let i = 1; i <= daysInCurrentMonth; i++) {
    days.push(viewport.date(i));
  }

  const remainingDays = 7 - (days.length % 7);
  for (let i = 1; i <= (remainingDays < 7 ? remainingDays : 0); i++) {
    const nextMonth = viewport.add(1, "month");
    days.push(nextMonth.date(i));
  }

  return days;
}
