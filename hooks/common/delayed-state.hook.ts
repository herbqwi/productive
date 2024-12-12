import { useEffect, useState } from "react"

export default function useDelayedState<T>(state: T, delay: number, delayValues?: T[]) {
  const [immediateState, setImmediateState] = useState<T>(state);
  const [delayedState, setDelayedState] = useState<T>(state);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (delayValues?.includes(state)) {
      timeout = setTimeout(() => {
        setDelayedState(state);
      }, delay)
    } else {
      setDelayedState(state);
    }

    return () => clearTimeout(timeout);
  }, [state])

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    timeout = setTimeout(() => {
      setImmediateState(state);
    }, 1)

    return () => clearTimeout(timeout);
  }, [state])

  return {
    immediate: immediateState,
    delayed: delayedState
  }
}