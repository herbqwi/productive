import { forwardRef } from 'react';
import { isValid, toDate } from 'date-fns';
import { convertDateToString } from '@/util/global.utils';

import Input, { IInputProps } from '../input.component';

const DateInput = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const validationHandler = (text: string) => (
    isValid(toDate(text)) || !text
  );

  return (
    <Input
      ref={ref}
      {...props}
      type='text'
      placeholder={convertDateToString(new Date(), 'MMM d, yyyy')}
      validationRules={[{
        handler: [validationHandler],
        errorMessage: 'Invalid date'
      }]}
      closestFormSubmit
    />
  );
})
DateInput.displayName = 'DateInput';

export default DateInput;