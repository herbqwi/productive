import { useEffect, useState } from "react";

export default function useValueDelay(delay: number, delayOnFlag: boolean, valueDep: boolean) {
  const [value, setValue] = useState(valueDep);

  useEffect(() => {
    if (valueDep === delayOnFlag) {
      setTimeout(() => {
        setValue(valueDep);
      }, delay);
    } else {
      setValue(valueDep)
    }
  }, [valueDep]);

  return value;
}