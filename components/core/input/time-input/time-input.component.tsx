import Input, { IInputProps } from '../input.component';
import { isValid, toDate } from 'date-fns';

export default function TimeInput(props: IInputProps) {
  const validationHandler = (text: string) => (
    isValid(toDate(text)) || !text
  );

  return (
    <Input
      {...props}
      type='text'
      placeholder='00:00 AM'
      // validationRules={[{
      //   handler: [validationHandler],
      //   errorMessage: 'Invalid date'
      // }]}
    />
  )
}