import { getSeconds } from "date-fns";
import { useEffect, useState } from "react";


export default function useClock() {
  const [clock, setClock] = useState(new Date());

  const updateClock = () => {
    setClock(new Date())
  }

  useEffect(() => {
    const diffSeconds = 60 - getSeconds(new Date());
    setTimeout(() => {
      updateClock();
      setInterval(() => (
        updateClock()
      ), 60 * 1000)
    }, diffSeconds * 1000);
  }, [])

  return clock
}