'use client'

import classes from './modal.module.sass';
import { useContext, createContext, useEffect, RefObject } from "react";
import { IModalContext, IModalRefType, Modal } from "@/@types/modal";
import { useMap } from "@uidotdev/usehooks";
import useStack from "@/hooks/common/stack.hook";

import CreateTaskModal from "@/components/core/modals/create-task/create-task-modal.component";
import clsx from 'clsx';

const ModalContext = createContext<IModalContext>(null as any);

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  return modalContext;
}

interface IProps {
  children: React.ReactNode
}

export function ModalContextProvider({ children }: IProps) {
  const { stack: modals, addItem, removeItem, remove, top } = useStack<Modal>();
  const refsMap = useMap<Modal>()

  const addRefs = (modal: Modal, ref: RefObject<HTMLElement>, refType: IModalRefType) => {
    const prevRefs: RefObject<HTMLElement>[] = refsMap.get(modal) || [];
    refsMap.set(modal, [...prevRefs, { ref, refType }])
  }

  const isModalOpen = (modal: Modal) => (
    modals.includes(modal)
  )

  const removeModalsAbove = (modal: Modal) => {
    do {
      remove()
    } while (top != modal)
  }

  useEffect(() => {
    /**
       * Bug (MID-PRIORITY):
       * When the user has multiple modals opened (For example DatePicker inside of CreateTaskModal), when clicking outside the
       * most-inner modal, the input in the modal that comes after it gets focused.
       * This shouldn't be the normal behavior, and the input should get focused only when opened for the first time.
     */
    const handleAutoFocus = () => {
      if (!top) {
        return
      }

      const currentModalRefs: { ref: RefObject<HTMLDivElement>, refType: IModalRefType }[] = refsMap.get(top);
      const autoFocusModalRefs = currentModalRefs.filter(currentModalRef => currentModalRef.refType === 'auto-focus')

      autoFocusModalRefs.forEach(autoFocusModalRef => {
        setTimeout(() => (
          autoFocusModalRef.ref.current?.focus()
        ), 10);
      })
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (!top) {
        return
      }

      const currentModalRefs: { ref: RefObject<HTMLDivElement>, refType: IModalRefType }[] = refsMap.get(top);

      if (currentModalRefs.length
        && (currentModalRefs.every((currentModalRef) => ((
          currentModalRef.ref.current != null && !(currentModalRef.ref.current.contains(event.target as Node))
        ))))
      ) {
        remove()
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        remove()
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    handleAutoFocus();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [refsMap, top, remove, modals]);

  return (
    <ModalContext.Provider value={{
      addModal: addItem,
      modalsList: modals,
      isModalOpen,
      removeModalsAbove,
      addRefs
    }}>
      {/* Top-level modals are put here */}
      <CreateTaskModal />
      <div className={clsx(classes.wrapper, { [classes.blurred]: modals.length })}>
        {children}
      </div>
    </ModalContext.Provider>
  )
}