import { parseTimeString, setTimeToDate } from '@/util/global.utils';
import Input, { IInputProps } from '../input.component';
import { isValid, toDate } from 'date-fns';

export interface ITime {
  hours: number;
  minutes: number;
}

export default function TimeInput(props: IInputProps) {
  const validationHandler = (text: string) => {
    const date = setTimeToDate({ date: new Date(), time: parseTimeString(text) });
    return isValid(date) || !text
  }

  return (
    <Input
      {...props}
      type='text'
      placeholder='00:00 AM'
      onSubmit={() => { console.log('test') }}
      validationRules={[{
        handler: [validationHandler],
        errorMessage: 'Invalid date'
      }]}
      closestFormSubmit
    />
  )
}