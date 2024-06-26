import clsx from 'clsx';
import classes from './date-picker.module.sass'
import { addDays, format } from 'date-fns';
import { isDatesEqual } from '@/util/global.utils';
import useDatePicker from '@/hooks/core/nav-menu/date-picker.hook';

import { CaretLeft, CaretRight, Timer } from '@phosphor-icons/react/dist/ssr';

export default function DatePicker() {
  const datePicker = useDatePicker();

  return (
    <div className={classes.wrapper}>
      <input
        ref={datePicker.inputRef}
        className={classes['date-input']}
        placeholder='Select a date'
        type="text"
        value={datePicker.input.value}
        onChange={(e) => { datePicker.input.set(e.target.value) }}
        onFocus={datePicker.openModal}
      />
      <div
        ref={datePicker.datePickerRef}
        className={clsx(classes['date-picker'], { [classes.open]: datePicker.isModalOpen })}
      >
        <div className={classes.suggestions}>
          <button
            className={clsx({ [classes.selected]: isDatesEqual(datePicker.selectedDate.value, new Date()) })}
            onClick={() => { datePicker.updateSelectedDate(new Date()) }}
          >
            Today
          </button>
          <button
            className={clsx({ [classes.selected]: isDatesEqual(datePicker.selectedDate.value, addDays(new Date(), 1)) })}
            onClick={() => { datePicker.updateSelectedDate(addDays(new Date(), 1)) }}
          >
            Tomorrow
          </button>
          <button className={classes.time}><Timer size={20} /></button>
        </div>
        <div className={classes.header}>
          <button aria-label='Previous month' onClick={datePicker.prevMonthHandler}><CaretLeft size={17} weight='bold' /></button>
          <form onSubmit={datePicker.inputFormHandler}>
            <input
              type="text"
              value={datePicker.input.value}
              onChange={(e) => { datePicker.input.set(e.target.value) }}
            />
          </form>
          {/* <p><span>{format(datePicker.currentDate.value, 'MMM')}</span> <span className={classes.year}>{format(datePicker.currentDate.value, 'yyyy')}</span></p> */}
          <button aria-label='Next month' onClick={datePicker.nextMonthHandler}><CaretRight size={17} weight='bold' /></button>
        </div>
        <div className={classes.calendar}>
          {datePicker.headerDays.map(day => (
            <p className={classes['week-day']} key={day}>{day}</p>
          ))}
          {datePicker.monthDays.value.map(day => (
            <p
              key={day.toUTCString()}
              className={clsx(classes['month-day'], {
                [classes.outmonth]: day.getMonth() != datePicker.currentDate.value.getMonth(),
                [classes.selected]: isDatesEqual(day, datePicker.selectedDate.value)
              })}
              onClick={() => { datePicker.selectedDate.set(day) }}
            >
              {format(day, 'd')}
            </p>
          ))}
        </div>
        <div className={classes.actions}>
          <button onClick={datePicker.cancelHandler}>Cancel</button>
          <button onClick={datePicker.submitHandler} className={classes.submit}>Confirm</button>
        </div>
      </div>
    </div>
  )
}