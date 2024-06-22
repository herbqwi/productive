'use client'

import classes from './nav-menu.module.sass'
import clsx from 'clsx';
import useNavMenu from '@/hooks/core/nav-menu/nav-menu.hook';

import Calendar from './calendar/calendar.component';
import MenuHeader from './menu-header/menu-header.component';
import { addDays } from 'date-fns';
import { useModalContext } from '@/contexts/modal.context';
import { Modals } from '@/@types/modal';

const NavMenu = () => {
  const navMenu = useNavMenu();
  const { currentModal } = useModalContext();

  return (
    <div className={clsx(classes.wrapper, { [classes.closed]: !navMenu.open.value })}>
      <MenuHeader {...navMenu} />
      <button onClick={() => { currentModal.set(Modals.NEW_TASK) }}>
        Create a new task
      </button>
      {/* <Calendar {...navMenu} /> */}
    </div>
  )
}

export default NavMenu;