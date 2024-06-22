import classes from './date-picker-header.module.sass'
import { IState } from '@/@types/global';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { format } from 'date-fns';

interface IProps {
  currentDate: IState<Date>;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
}

export default function DatePickerHeader(props: IProps) {
  return (
    <div className={classes.wrapper}>
      <button aria-label='Previous month' onClick={props.prevMonthHandler}><CaretLeft size={17} weight='bold' /></button>
      <p><span>{format(props.currentDate.value, 'MMM')}</span> <span className={classes.year}>{format(props.currentDate.value, 'yyyy')}</span></p>
      <button aria-label='Next month' onClick={props.nextMonthHandler}><CaretRight size={17} weight='bold' /></button>
    </div>
  )
}