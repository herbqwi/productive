import { isValid } from 'date-fns';
import { convertDateToString, parseTimeString, setTimeToDate } from '@/util/global.utils';
import useClock from '@/hooks/common/clock.hook';

import Input, { IInputProps } from '../input.component';

export interface ITime {
  hours: number;
  minutes: number;
}

export default function TimeInput(props: IInputProps) {
  const clock = useClock();

  const validationHandler = (text: string) => {
    const date = setTimeToDate({ date: new Date(), time: parseTimeString(text) });
    return isValid(date) || !text
  }

  return (
    <Input
      {...props}
      type='text'
      placeholder={convertDateToString(clock, 'hh:mm a')}
      validationRules={[{
        handler: [validationHandler],
        errorMessage: 'Invalid date'
      }]}
      closestFormSubmit
    />
  )
}