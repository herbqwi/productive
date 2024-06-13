import clsx from 'clsx'
import classes from './menu-header.module.sass'
import { IStateToggle } from '@/@types/global'

import { CaretLeft } from '@phosphor-icons/react';

interface IProps {
  open: IStateToggle<boolean>;
}

export default function MenuHeader(props: IProps) {
  return (
    <section
      className={clsx(classes.header, 'highlightable', { [classes.closed]: !props.open.value })}
      onClick={props.open.toggle}
      aria-label='Toggle menu'
    >
      <div className={classes.logo}>
        <p>Be Productive<span>.</span></p>
        <p>Save more time!</p>
      </div>
      <div className={classes['toggle-btn']}>
        <CaretLeft size={20} />
        <CaretLeft size={20} />
      </div>
    </section>
  )
}