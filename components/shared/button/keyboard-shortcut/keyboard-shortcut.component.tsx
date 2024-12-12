import classes from './keyboard-shortcut.module.sass';
import React, { useEffect } from 'react';
import clsx from 'clsx';

import { ArrowElbowDownLeft } from '@phosphor-icons/react/dist/ssr';
import { useMap } from '@/hooks/common/map.hook';

type Button = 'Enter';

export interface IKeyboardShortcutProps {
  buttons: Button[];
}

export default function KeyboardShortcut(props: IKeyboardShortcutProps) {
  const buttonsMapper: Record<Button, React.ReactNode | string> = {
    'Enter': <ArrowElbowDownLeft size={12} />
  }

  return (
    <div className={clsx(classes.wrapper, 'keyboard-shortcut')}>
      {props.buttons.map(button => (
        <div className={classes.shortcut}>
          {buttonsMapper[button]}
        </div>
      ))}
    </div>
  )
}