import classes from './input.module.sass';
import React, { useEffect } from "react";
import clsx from 'clsx';
import { useForm } from "@/contexts/form.context";
import { IFormItem } from '@/@types/form.types';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & IFormItem & {
  defaultStyles?: boolean;
};

export default function Input({ name, defaultStyles, validationHandler, ...inputProps }: InputProps) {
  const form = useForm();
  const value = name ? form.getFieldValue(name) : inputProps.value
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => (
    name ? form.updateField(name, e.target.value) : inputProps.onChange?.(e)
  )

  useEffect(() => {
    if (name) {
      form.registerField({ name, validationHandler });
    }
  }, []);

  return (
    <input
      {...inputProps}
      className={clsx(inputProps.className, { [classes.input]: defaultStyles })}
      name={name}
      value={value || ''}
      onChange={onChange}
    />
  )
}
