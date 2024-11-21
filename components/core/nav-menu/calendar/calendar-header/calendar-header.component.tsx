import classes from './calendar-header.module.sass'
import { format } from 'date-fns';
import { IState } from '@/@types/global';

import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr'

interface IProps {
  currentDate: IState<Date>;
  prevMonthHandler: () => void;
  nextMonthHandler: () => void;
}

export default function CalendarHeader(props: IProps) {
  return (
    <div className={classes.wrapper}>
      <p><span>{format(props.currentDate.value, 'MMMM')}</span> <span className={classes.year}>{format(props.currentDate.value, 'yy')}</span></p>
      <div className={classes.controls}>
        <CaretLeft size={23} onClick={props.prevMonthHandler} aria-label='Previous month' />
        <CaretRight size={23} onClick={props.nextMonthHandler} aria-label='Next month' />
      </div>
    </div>
  )
}