import Input, { IInputProps } from '../input.component';
import { format, isValid, toDate } from 'date-fns';

export default function DateInput(props: IInputProps) {
  const validationHandler = (text: string) => (
    isValid(toDate(text)) || !text
  );

  return (
    <Input
      {...props}
      type='text'
      placeholder={format(new Date(), 'MMM d, yyyy')}
      validationRules={[{
        handler: [validationHandler],
        errorMessage: 'Invalid date'
      }]}
      closestFormSubmit
    />
  )
}