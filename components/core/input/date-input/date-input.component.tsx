import Input, { IInputProps } from '../input.component';
import { isValid, toDate } from 'date-fns';

export default function DateInput(props: IInputProps) {
  const validationHandler = (text: string) => (
    isValid(toDate(text)) || !text
  );

  return (
    <Input
      {...props}
      type='text'
      // validationRules={[{
      //   handler: [validationHandler],
      //   errorMessage: 'Invalid date'
      // }]}
    />
  )
}