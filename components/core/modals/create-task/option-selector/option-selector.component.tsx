import classes from './option-selector.module.sass'
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useForm } from '@/contexts/form.context';
import { TaskPriority } from '@/@types/tasks';

interface IProps<T> {
  name: string;
  defaultValue?: T;
  options: {
    icon?: React.ReactNode;
    label: string;
    value: T;
  }[]
}

export default function OptionSelector<T>(props: IProps<T>) {
  const form = useForm();
  const value = form.getFieldValue(props.name);
  const onChange = (priority: T) => {
    form.updateField(props.name, priority)
  }

  useEffect(() => {
    form.registerField<T>({ name: props.name, defaultValue: props.defaultValue });
  }, []);

  return (
    <div className={classes['option-selector']}>
      {props.options.map(option => (
        <button
          key={option.label}
          type='button'
          onClick={() => onChange(option.value)}
          className={clsx({ [classes.selected]: value === option.value })}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  )
}