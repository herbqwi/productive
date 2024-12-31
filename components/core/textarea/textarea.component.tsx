import React, { useEffect } from "react";
import classes from './textarea.module.sass';
import { useForm } from "@/contexts/form.context";
import clsx from 'clsx';

type TextAreaProps = React.InputHTMLAttributes<HTMLTextAreaElement> & {
  name?: string;
  validationHandler?: (value: string) => boolean;
  defaultStyles?: boolean;
};

export default function TextArea({ name, validationHandler, ...props }: TextAreaProps) {
  const form = useForm();

  useEffect(() => {
    if (name) {
      form.registerField({ name });
    }
  }, []);

  return (
    <textarea
      {...props}
      className={clsx(props.className, { [classes.textarea]: props.defaultStyles })}
      name={name}
      value={name ? form.getFieldValue(name) : props.value}
      onChange={e => name ? form.updateField(name, e.target.value) : props.onChange?.(e)}
    />
  )
}
