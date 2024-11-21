import classes from './option-selector.module.sass'
import React from 'react';
import clsx from 'clsx';

interface IProps<T> {
  options: {
    icon?: React.ReactNode;
    label: string;
    value: T;
  }[]
  selectHandler: (optionValue: T) => void;
  selectedValue?: T
}

export default function OptionSelector<T>(props: IProps<T>) {
  return (
    <div className={classes['option-selector']}>
      {props.options.map(option => (
        <button
          key={option.label}
          type='button'
          onClick={() => { props.selectHandler(option.value) }}
          className={clsx({ [classes.selected]: props.selectedValue === option.value })}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  )
}