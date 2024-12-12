import { IModalPropsWithId, ModalType } from "@/@types/modal.types";
import { create } from "zustand";

export interface IModalStore {
  modalsList: IModalPropsWithId[];
  active: boolean;
  open: (modalProps: IModalPropsWithId) => void;
  close: () => void;
  isModalOpen: (modalType: ModalType) => boolean;
  isLastModal: (modalType: ModalType) => boolean;
  setActive: (active: boolean) => void;
}

const useModalStore = create<IModalStore>((set, get) => ({
  modalsList: [],
  active: false,
  open: (modalProps) => {
    set(prev => ({
      ...prev,
      modalsList: [...prev.modalsList, modalProps]
    }));
  },
  close: () => {
    set(prev => ({
      ...prev,
      modalsList: prev.modalsList.slice(0, -1),
    }));
  },
  isModalOpen: (modalType) => (
    !!get().modalsList.map(modal => modal.type).includes(modalType)
  ),
  isLastModal: (modalType) => (
    !!(get().modalsList?.at(-1)?.type === modalType)
  ),
  setActive: (active) => {
    set(prev => ({
      ...prev,
      active
    }))
  }
}))

export default useModalStore;