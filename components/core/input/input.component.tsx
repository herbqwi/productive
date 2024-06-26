import { InputHTMLAttributes } from 'react';
import classes from './input.module.sass'

type IProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: IProps) {
  return (
    <input className={classes.input} type="text" {...props} />
  )
}