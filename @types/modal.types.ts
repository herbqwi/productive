import { IDateTimePickerInit } from "@/stores/date-time-picker.store";
import { RefObject } from "react";
import { IAnimationProps } from "./animation.types";

export interface IModalContext {
  modalsList: ModalType[]
  addModal: (modal: ModalType) => void
  isModalOpen: (modal: ModalType) => boolean
  removeModalsAbove: (modal: ModalType) => void;
  addRefs: (modal: ModalType, ref: RefObject<HTMLElement>, refType: IModalRefType) => void
}

export enum ModalType {
  NEW_TASK = 'New Task',
  DATE_PICKER = 'Date Picker'
}

type IDateTimePickerModalProps = {
  type: ModalType.DATE_PICKER;
  initialState?: IDateTimePickerInit;
  location: { top: number, left: number }
};

type INewTaskModalProps = {
  type: ModalType.NEW_TASK;
};

export type IModalProps = (IDateTimePickerModalProps | INewTaskModalProps) & {
  animationProps?: IAnimationProps;
  submitOnEnter?: {
    animate: boolean;
    submit: boolean;
  };
}

export type IModalPropsWithId = IModalProps & {
  id: string
}

export type IModalRefType = 'modal' | 'button' | 'input' | 'auto-focus';