'use client'

import classes from './nav-menu.module.sass'
import clsx from 'clsx';
import { ModalType } from '@/@types/modal.types';
import { ModalUtils } from '@/util';
import useNavMenu from '@/hooks/core/nav-menu/nav-menu.hook';

import MenuHeader from './menu-header/menu-header.component';
import Calendar from './calendar/calendar.component';
import { CalendarSection } from '../modals/date-time-picker-modal/sections';

const NavMenu = () => {
  const navMenu = useNavMenu();

  return (
    <div className={clsx(classes.wrapper, { [classes.closed]: !navMenu.open.value })}>
      <MenuHeader {...navMenu} />
      <button onClick={() => { ModalUtils.open({ type: ModalType.NEW_TASK }) }}>
        Create a new task
      </button>
      {/* <Calendar {...navMenu} /> */}
    </div>
  )
}

export default NavMenu;