'use client'

import classes from './nav-menu.module.sass'
import clsx from 'clsx';
import { Modal } from '@/@types/modal';
import useNavMenu from '@/hooks/core/nav-menu/nav-menu.hook';
import { useModalContext } from '@/contexts/modal/modal.context';

import MenuHeader from './menu-header/menu-header.component';

const NavMenu = () => {
  const navMenu = useNavMenu();
  const modalContext = useModalContext();

  return (
    <div className={clsx(classes.wrapper, { [classes.closed]: !navMenu.open.value })}>
      <MenuHeader {...navMenu} />
      <button onClick={() => { modalContext.addModal(Modal.NEW_TASK) }}>
        Create a new task
      </button>
      {/* <Calendar {...navMenu} /> */}
    </div>
  )
}

export default NavMenu;