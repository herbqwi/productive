import classes from './next-task-info.module.sass'
import { useSideNav } from '@/hooks/core';
import clsx from 'clsx';

import { CalendarIcon } from '@/public/resources'
import Image from 'next/image'

interface IProps {
  open: ReturnType<typeof useSideNav>['open'];
}

export default function NewTask(props: IProps) {
  return (
    <div
      className={clsx(classes.wrapper, { [classes.closed]: !props.open.value })}
      onClick={() => props.open.set(true)}
    >
      <div>
        <Image src={CalendarIcon} width={props.open.value ? 45 : 40} alt='' />
        <div>
          <p>John&apos;s Meeting</p>
          <p>2:45 - 3:00 PM</p>
        </div>
      </div>
      <div className={classes.info}>
        <div />
        <p>Up next (Live event)</p>
      </div>
    </div>
  )
}