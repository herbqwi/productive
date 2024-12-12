'use client';

import { v4 as uuid } from 'uuid';
import { IModalProps, ModalType } from "@/@types/modal.types";
import { IModalStore } from "@/stores/modal.store";
import { useModalStore } from "@/stores";
import useDateTimePickerStore, { IDateTimePickerStore } from '@/stores/date-time-picker.store';

let modalStore: IModalStore;
let initDateTimePickerStore: IDateTimePickerStore['init'];
let resetDateTimePickerStore: IDateTimePickerStore['resetFields'];

export function ModalUtilsConfigurator() {
  modalStore = useModalStore();
  initDateTimePickerStore = useDateTimePickerStore(state => state.init);
  resetDateTimePickerStore = useDateTimePickerStore(state => state.resetFields);

  return null;
}

const ModalUtils = {
  open(props: IModalProps) {
    switch (props.type) {
      case (ModalType.NEW_TASK):
        modalStore.open({ ...props, id: uuid(), submitOnEnter: { submit: true, animate: true } });
        break;
      case (ModalType.DATE_PICKER):
        modalStore.open({ ...props, id: uuid(), submitOnEnter: { submit: true, animate: false } });

        if (props.initialState) {
          initDateTimePickerStore(props.initialState)
        } else {
          resetDateTimePickerStore()
        }
        break;
    }
  },
  close() {
    modalStore.close();
  }
}

export default ModalUtils;