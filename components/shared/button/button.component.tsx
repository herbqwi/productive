import React from 'react';
import classes from './button.module.sass'
import clsx from 'clsx';
import KeyboardShortcut, { IKeyboardShortcutProps } from './keyboard-shortcut/keyboard-shortcut.component';

type IProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  variant?: 'none' | 'default' | 'main';
  shortcut?: IKeyboardShortcutProps
}

export default function Button({ text, prefix, suffix, variant, shortcut, ...buttonProps }: IProps) {
  return (
    <button
      {...buttonProps}
      className={clsx(
        buttonProps.className,
        classes.button,
        {
          [classes['button-default']]: variant === 'default',
          [classes['button-main']]: variant === 'main'
        })}
    >
      {prefix}
      <p>{text}</p>
      {suffix}
      {shortcut && (
        <KeyboardShortcut {...shortcut} />
      )}
    </button>
  )
}