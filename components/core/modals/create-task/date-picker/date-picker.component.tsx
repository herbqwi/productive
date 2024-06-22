import clsx from 'clsx';
import classes from './date-picker.module.sass'
import { addDays, format } from 'date-fns';
import { isDatesEqual } from '@/util/global.utils';
import useDatePicker from '@/hooks/core/nav-menu/date-picker.hook';

import DatePickerHeader from './date-picker-header/date-picker-header.component';

export default function DatePicker() {
  const datePicker = useDatePicker();

  return (
    <div className={classes.wrapper}>
      <form onSubmit={datePicker.inputFormHandler}>
        <input
          ref={datePicker.inputRef}
          className={classes['date-input']}
          placeholder='Select a date'
          type="text"
          value={datePicker.input.value}
          onChange={(e) => { datePicker.input.set(e.target.value) }}
          onFocus={() => { datePicker.isOpen.set(true) }}
        />
      </form>
      <div
        ref={datePicker.datePickerRef}
        className={clsx(classes['date-picker'], { [classes.open]: datePicker.isOpen.value })}
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
          <button>Custom</button>
        </div>
        <DatePickerHeader {...datePicker} />
        <div className={classes.calendar}>
          {datePicker.headerDays.map(day => (
            <p className={classes['week-day']} key={day}>{day}</p>
          ))}
          {datePicker.monthDays.value.map(day => (
            <p
              key={day.getDay()}
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