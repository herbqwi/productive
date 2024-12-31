'use client'

import classes from './side-nav.module.sass'
import clsx from 'clsx';
import { useSideNav } from '@/hooks/core';

import { Header, Content } from '.';

const SideNav = () => {
  const navMenu = useSideNav();

  return (
    <div className={clsx(classes.wrapper, { [classes.closed]: !navMenu.open.value })}>
      <Header {...navMenu} />
      <Content {...navMenu} />
      {/* <button onClick={() => { ModalUtils.open({ type: ModalType.NEW_TASK }) }}>
        Create a new task
      </button> */}
      {/* <Calendar {...navMenu} /> */}
    </div>
  )
}

export default SideNav;