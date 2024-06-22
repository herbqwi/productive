import { IState } from "./global";

export interface IModalContext {
  currentModal: IState<Modals | undefined>
}

export enum Modals {
  NEW_TASK = 'New Task'
}