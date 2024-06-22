import { RefObject } from "react";

export interface IModalContext {
  addModal: (modal: Modal) => void
  modalsList: Modal[]
  isModalOpened: (modal: Modal) => boolean
  removeModalsAbove: (modal: Modal) => void;
  addRefs: (modal: Modal, ref: RefObject<HTMLElement>) => void
}

export enum Modal {
  NEW_TASK = 'New Task',
  DATE_PICKER = 'Date Picker'
}