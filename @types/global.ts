import { Dispatch, SetStateAction } from 'react'

export interface IState<T> {
  value: T
  set: Dispatch<SetStateAction<T>>
}

export interface IStateToggle<T> extends IState<T> {
  toggle: () => void
}