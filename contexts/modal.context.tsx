'use client'
import { useState, useContext, createContext } from "react";
import { IModalContext, Modals } from "@/@types/modal";

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
  const [currentModal, setCurrentModal] = useState<Modals>();

  return (
    <ModalContext.Provider value={{
      currentModal: {
        value: currentModal,
        set: setCurrentModal
      }
    }}>
      <CreateTaskModal />
      {children}
    </ModalContext.Provider>
  )
}