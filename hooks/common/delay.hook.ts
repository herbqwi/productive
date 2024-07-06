import { useEffect, useState } from "react";

export default function useValueDelay(delay: number, delayOnFlag: boolean, valueDep: boolean) {
  const [value, setValue] = useState(valueDep);

  useEffect(() => {
    console.log({ valueDep, delayOnFlag });
    if (valueDep === delayOnFlag) {
      console.log('equalll');
      setTimeout(() => {
        setValue(valueDep);
      }, delay);
    } else {
      setValue(valueDep)
    }
  }, [valueDep]);

  useEffect(() => {
    console.log('value: ', value);
  }, [value])

  return value;
}