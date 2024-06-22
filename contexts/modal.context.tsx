'use client'
import { useContext, createContext, useEffect, RefObject } from "react";
import { IModalContext, Modal } from "@/@types/modal";
import { useMap, useQueue } from "@uidotdev/usehooks";

import CreateTaskModal from "@/components/core/modals/create-task/create-task-modal.component";

const ModalContext = createContext<IModalContext>(null as any);

export const useModalContext = () => {
  const modalContext = useContext(ModalContext);

  return modalContext;
}

interface IProps {
  children: React.ReactNode
}

export function ModalContextProvider({ children }: IProps) {
  const { add, remove, queue, first } = useQueue<Modal>([]);
  const refsMap = useMap<Modal>()

  const addRefs = (modal: Modal, ref: RefObject<HTMLElement>) => {
    const prevRefs: RefObject<HTMLElement>[] = refsMap.get(modal) || [];
    refsMap.set(modal, [...prevRefs, ref])
  }

  const isModalOpened = (modal: Modal) => (
    queue.includes(modal)
  )

  const removeModalsAbove = (modal: Modal) => {
    do {
      remove()
    } while (first != modal)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!first) {
        return
      }

      const currentModalRefs = refsMap.get(first);

      if (currentModalRefs.length
        && !(currentModalRefs.every((currentModalRef: RefObject<HTMLDivElement>) => ((
          currentModalRef.current != null && (currentModalRef.current.contains(event.target as Node))
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
  }, [refsMap, first, remove]);

  return (
    <ModalContext.Provider value={{
      addModal: add,
      modalsList: queue,
      isModalOpened,
      removeModalsAbove,
      addRefs
    }}>
      <CreateTaskModal />
      {children}
    </ModalContext.Provider>
  )
}