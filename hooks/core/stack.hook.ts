import { useMemo, useState } from "react"

export default function useStack<T>() {
  const [stack, setStack] = useState<T[]>([]);

  const addItem = (item: T) => (
    setStack(prev => ([...prev, item]))
  )

  const removeItem = (item: T) => (
    setStack(prev => prev.filter(prevItem => prevItem != item))
  )

  const remove = () => {
    setStack(prev => (
      prev.slice(0, -1)
    ));
  }

  const top = useMemo(
    () => (stack?.[stack.length - 1])
    , [stack])

  return {
    stack,
    addItem,
    removeItem,
    remove,
    top
  }
}