import { useState } from 'react';
import classes from './checkbox.module.sass';
import clsx from 'clsx';

import Button from "../button/button.component";
import { Check } from '@phosphor-icons/react/dist/ssr';

export default function Checkbox() {
  const [isChecked, setChecked] = useState(false);

  const toggleChecked = () => {
    setChecked(prev => !prev)
  }

  return (
    <Button
      className={clsx(classes.button, { [classes.checked]: isChecked })}
      onClick={e => { e.stopPropagation(); toggleChecked() }}
      variant='icon'
    >
      <>
        {isChecked && (
          <Check weight='bold' />
        )}
        <div />
      </>
    </Button>
  )
}