import { RefObject } from "react";

export interface IModalContext {
  addModal: (modal: Modal) => void
  modalsList: Modal[]
  isModalOpen: (modal: Modal) => boolean
  removeModalsAbove: (modal: Modal) => void;
  addRefs: (modal: Modal, ref: RefObject<HTMLElement>, refType: IModalRefType) => void
}

export enum Modal {
  NEW_TASK = 'New Task',
  DATE_PICKER = 'Date Picker'
}

export type IModalRefType = 'modal' | 'button' | 'input' | 'auto-focus';