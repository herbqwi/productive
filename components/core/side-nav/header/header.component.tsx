import classes from './header.module.sass';
import clsx from 'clsx';
import { MainLogo } from '@/public/resources';
import { useSideNav } from '@/hooks/core';

import Image from 'next/image';
import { CaretLeft } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/shared';

interface IProps {
  open: ReturnType<typeof useSideNav>['open'];
}

export default function Header(props: IProps) {
  return (
    <Button
      className={clsx(classes.wrapper, { [classes.closed]: !props.open.value })}
      onClick={props.open.toggle}
      aria-label='Toggle menu'
      title='Toggle menu'
      variant='transparent'
    >
      <div className={classes.logo}>
        <Image width={45} src={MainLogo} alt='logo' />
        <p>Productive<span>.</span></p>
      </div>
      <div className={classes['toggle-btn']}>
        <CaretLeft size={20} />
        <CaretLeft size={20} />
      </div>
    </Button>
  )
}