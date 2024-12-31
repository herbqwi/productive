import { NSCalendar } from "@/@types/calendar.type";
import { useState } from "react"

export default function useCalendar() {
  const [view, setView] = useState<NSCalendar.View>(NSCalendar.View.CALENDAR);

  return {
    view,
    setView
  }
}