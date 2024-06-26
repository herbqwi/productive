'use client'
import { useContext, createContext, useEffect, RefObject } from "react";
import { IModalContext, Modal } from "@/@types/modal";
import { useMap } from "@uidotdev/usehooks";

import CreateTaskModal from "@/components/core/modals/create-task/create-task-modal.component";
import useStack from "@/hooks/core/stack.hook";

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

  const addRefs = (modal: Modal, ref: RefObject<HTMLElement>) => {
    const prevRefs: RefObject<HTMLElement>[] = refsMap.get(modal) || [];
    refsMap.set(modal, [...prevRefs, ref])
  }

  const isModalOpened = (modal: Modal) => (
    modals.includes(modal)
  )

  const removeModalsAbove = (modal: Modal) => {
    do {
      remove()
    } while (top != modal)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!top) {
        return
      }

      const currentModalRefs: RefObject<HTMLDivElement>[] = refsMap.get(top);

      if (currentModalRefs.length
        && (currentModalRefs.every((currentModalRef: RefObject<HTMLDivElement>) => ((
          currentModalRef.current != null && !(currentModalRef.current.contains(event.target as Node))
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

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [refsMap, top, remove, modals]);

  return (
    <ModalContext.Provider value={{
      addModal: addItem,
      modalsList: modals,
      isModalOpened,
      removeModalsAbove,
      addRefs
    }}>
      <CreateTaskModal />
      {children}
    </ModalContext.Provider>
  )
}