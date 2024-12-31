import classes from './keyboard-shortcut.module.sass';
import React from 'react';
import clsx from 'clsx';

import { ArrowElbowDownLeft } from '@phosphor-icons/react/dist/ssr';

type Button = 'Enter' | 'T' | 'D';

export interface IKeyboardShortcutProps {
  buttons: Button[];
  size?: 'small' | 'medium';
}

export default function KeyboardShortcut(props: IKeyboardShortcutProps) {
  const buttonsMapper: Record<Button, React.ReactNode | string> = {
    'Enter': <ArrowElbowDownLeft size={12} />,
    'T': 'T',
    'D': 'D'
  }

  return (
    <div className={clsx(classes.wrapper, 'keyboard-shortcut', props.size && classes[props.size])}>
      {props.buttons.map(button => (
        <div key={button} className={classes.shortcut}>
          {buttonsMapper[button]}
        </div>
      ))}
    </div>
  )
}