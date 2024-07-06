import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import classes from './input.module.sass'
import clsx from 'clsx';
import { useForm } from '../form/form.component';

type HTMLInputProps = InputHTMLAttributes<HTMLInputElement>;

export type IInputProps = HTMLInputProps & {
  validationRules?: {
    regex?: RegExp[];
    handler?: ((text: string) => boolean)[];
    errorMessage?: string;
  }[];
  closestFormSubmit?: boolean
}

export default function Input(props: IInputProps) {
  const [isValid, setIsValid] = useState(true);
  const ref = useRef<HTMLInputElement>(null)
  const form = useForm();

  useEffect(() => {
    form.setValidationHandler(ref, handleValidation, setIsValid);
  }, [props.value]);

  const handleValidation = () => {
    if (!props.validationRules) {
      return true;
    }

    const isInputValid = props.validationRules?.find(validationRule => {
      const isRegexRuleValid = validationRule.regex?.find(regexRule => {
        const isRegexRuleValid = regexRule.test(props.value?.toString() || '');

        if (!isRegexRuleValid) {
          return true;
        }
      })
      const isHandlerRuleValid = validationRule.handler?.find(handlerRule => {
        const isHandlerRuleValid = handlerRule(props.value?.toString() || '')

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
      const form = e.currentTarget.closest('form');
      if (form) {
        form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    }
  };

  return (
    <input ref={ref} type="text" {...props} className={clsx(classes.input, props.className, { invalid: !isValid })} {...(props.closestFormSubmit && { onKeyDown: handleKeyPress })} />
  )
}