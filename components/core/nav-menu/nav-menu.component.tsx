'use client'

import classes from './nav-menu.module.sass'
import clsx from 'clsx';

import Calendar from './calendar/calendar.component';
import MenuHeader from './menu-header/menu-header.component';
import useNavMenu from '@/public/hooks/core/nav-menu/nav-menu.hook';

const NavMenu = () => {
  const navMenu = useNavMenu();

  return (
    <div className={clsx(classes.wrapper, { [classes.closed]: !navMenu.open.value })}>
      <MenuHeader {...navMenu} />
      <Calendar {...navMenu} />
    </div>
  )
}

export default NavMenu;