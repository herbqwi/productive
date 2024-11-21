import classes from './input.module.sass'
import { forwardRef, InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { IFormProps, useForm } from '../form/form.context';
import { mergeRefs } from '@/util/global.utils';

type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>;

export type IInputProps = IFormProps & HTMLInputProps & {
  validationRules?: {
    regex?: RegExp[];
    handler?: ((text: string) => boolean)[];
    errorMessage?: string;
  }[];
  closestFormSubmit?: boolean
}

const Input = forwardRef<HTMLInputElement, IInputProps>(({ validationRules, closestFormSubmit, name, ...inputProps }, ref2) => {
  const props = { validationRules, closestFormSubmit, name };
  const [isValid, setIsValid] = useState(true);
  const ref = useRef<HTMLInputElement>(null)
  const form = useForm(ref);

  useEffect(() => {
    form.updateFormItem({ ref, name: props.name, validationHandler, setIsValid });
  }, [inputProps.value]);

  const validationHandler = () => {
    if (!props.validationRules) {
      return true;
    }

    const isInputValid = props.validationRules?.find(validationRule => {
      const isRegexRuleValid = validationRule.regex?.find(regexRule => {
        const isRegexRuleValid = regexRule.test(inputProps.value?.toString() || '');

        if (!isRegexRuleValid) {
          return true;
        }
      })
      const isHandlerRuleValid = validationRule.handler?.find(handlerRule => {
        const isHandlerRuleValid = handlerRule(inputProps.value?.toString() || '')

        if (!isHandlerRuleValid) {
          return true;
        }
      })

      if (!isHandlerRuleValid && !isRegexRuleValid) {
        return true;
      }
    })

    return !!isInputValid;
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      form.submitHandler()
    }
  };

  return (
    <input
      ref={mergeRefs(ref, ref2)}
      type="text"
      {...inputProps}
      className={clsx(classes.input, inputProps.className, { invalid: !isValid })} {...(props.closestFormSubmit && { onKeyDown: handleKeyPress })}
      value={form.getValue() || ''}
      onChange={(e) => form.setValue(e.target.value)}
    />
  )
})

Input.displayName = 'Input';
export default Input;