'use client';

import classes from './modal-wrapper.module.sass';
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { IModalProps, ModalType } from '@/@types/modal.types';
import { useModalStore } from "@/stores";

import CreateTaskModal from '../create-task/create-task-modal.component';
import clsx from 'clsx';
import DateTimePickerModal from '../date-time-picker-modal/date-time-picker-modal.component';
import { AnimatePresence } from 'framer-motion'
import { Animation } from '@/components/shared';
import { IAnimationProps } from '@/@types/animation.types';

const ACTIVE_ANIMATION_PROPS: IAnimationProps = {
  animate: {
    opacity: 1,
    scale: .994
  },
  transition: {
    duration: .2
  }
}

const DEFAULT_ANIMATION_PROPS: IAnimationProps = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
  transition: { duration: 0.2, ease: 'easeInOut' }
}

const generateModalFunction = (modal: IModalProps) => {
  if (modal.type === ModalType.NEW_TASK) {
    return <CreateTaskModal />
  } else if (modal.type === ModalType.DATE_PICKER) {
    return <DateTimePickerModal />
  }
}

export default function ModalWrapper() {
  const modalsList = useModalStore(state => state.modalsList);
  const active = useModalStore(state => state.active);
  const setActive = useModalStore(state => state.setActive);
  const closeModal = useModalStore(state => state.close);

  useLayoutEffect(() => {
    const modalWrapper = document.querySelector(`.${classes['modals-wrapper']}`);
    const lastModal = modalWrapper?.lastElementChild;
    const firstInput = lastModal?.querySelector('input');
    if (firstInput) {
      (firstInput as HTMLInputElement).focus();
    }
  }, [modalsList]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      }

      if (event.key === 'Enter') {
        const lastModal = modalsList.at(modalsList.length - 1);
        const lastModalFormElement = document.querySelector(`.${classes['modals-wrapper']} > div:last-child form:not(:has(input:is(:focus))):not(:has(textarea:is(:focus)))`);
        if (lastModal?.submitOnEnter?.submit) {
          if (lastModal?.submitOnEnter?.animate) {
            setActive(true)
          }

          if (lastModalFormElement) {
            const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
            lastModalFormElement.dispatchEvent(submitEvent);
          }
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        setActive(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [modalsList, closeModal, setActive]);

  return (
    <div className={clsx(classes.wrapper, { [classes.open]: !!modalsList.length })}>
      <div className={classes['modals-wrapper']} onClick={e => e.stopPropagation()}>
        <AnimatePresence>
          {modalsList.map((item, i) => (
            <React.Fragment key={item.id}>
              <div className={classes['modal-bg']} onMouseDown={closeModal} />
              <Animation
                key={item.id}
                animationProps={(active && i === modalsList.length - 1) ? ACTIVE_ANIMATION_PROPS : DEFAULT_ANIMATION_PROPS}
              >
                {generateModalFunction(item)}
              </Animation>
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>
    </div >
  )
}