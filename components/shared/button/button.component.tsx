import React, { forwardRef } from 'react';
import classes from './button.module.sass'
import clsx from 'clsx';

import KeyboardShortcut, { IKeyboardShortcutProps } from './keyboard-shortcut/keyboard-shortcut.component';

type IProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactElement | React.ReactElement[] | string;
  prefixIcon?: React.ReactNode;
  suffix?: React.ReactNode;
  variant?: 'none' | 'default' | 'main' | 'outstanding' | 'transparent' | 'icon';
  shortcut?: IKeyboardShortcutProps;
  selected?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IProps>(({ children, prefixIcon, suffix, variant, shortcut, selected, ...buttonProps }, ref) => {
  return (
    <button
      ref={ref}
      {...buttonProps}
      className={clsx(
        buttonProps.className,
        classes.button,
        classes[`button-${variant}`],
        {
          [classes.selected]: selected
        })}
    >
      {prefixIcon
        ? (

          <div className={classes.info}>
            {prefixIcon}
            {
              typeof children === 'string'
                ? <p>{children}</p>
                : children
            }
          </div>
        ) : (
          typeof children === 'string'
            ? <p>{children}</p>
            : children
        )}
      {suffix}
      {shortcut && (
        <KeyboardShortcut {...shortcut} />
      )}
    </button>
  )
})

Button.displayName = 'Button';

export default Button;