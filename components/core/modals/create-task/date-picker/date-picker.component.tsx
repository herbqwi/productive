import clsx from 'clsx';
import classes from './date-picker.module.sass'
import { addDays, format } from 'date-fns';
import { convertDateToString, isDatesEqual } from '@/util/global.utils';
import useDatePicker from '@/hooks/core/nav-menu/date-picker.hook';

import { CaretLeft, CaretRight, Timer } from '@phosphor-icons/react/dist/ssr';
import Form from '@/components/core/form/form.component';
import DateInput from '@/components/core/input/date-input/date-input.component';
import TimeInput from '@/components/core/input/time-input/time-input.component';

export default function DatePicker() {
  const datePicker = useDatePicker();

  return (
    <div className={classes.wrapper}>
      <input
        ref={datePicker.inputRef}
        className={classes['date-input']}
        placeholder='Select a date'
        type="text"
        value={convertDateToString(datePicker.dateValue.value)}
        onChange={(e) => { }}
        onFocus={datePicker.openModal}
      />
      {
        <div
          ref={datePicker.datePickerRef}
          className={clsx(classes['date-picker'], datePicker.isModalOpen ? classes.open : classes.closed)}
        >
          <div className={classes.suggestions}>
            <button
              className={clsx({ [classes.selected]: isDatesEqual(datePicker.dateValue.value, new Date()) })}
              onClick={() => { datePicker.selectedDateChangeHandler(new Date()) }}
              aria-label="Set today as the selected date"
              title='Set today as the selected date'
            >
              Today
            </button>
            <button
              className={clsx({ [classes.selected]: isDatesEqual(datePicker.dateValue.value, addDays(new Date(), 1)) })}
              onClick={() => { datePicker.selectedDateChangeHandler(addDays(new Date(), 1)) }}
              aria-label="Set tomorrow as the selected date"
              title="Set tomorrow as the selected date"
            >
              Tomorrow
            </button>
            <button
              className={classes.time}
              aria-label="Toggle duration"
              title="Toggle duration"
            ><Timer size={20}
              />
            </button>
          </div>
          <div className={classes.header}>
            <button aria-label='Previous month' title='Previous month' onClick={datePicker.prevMonthHandler}><CaretLeft size={17} weight='bold' /></button>
            {/*
            Bug (HIGH-PRIORITY):
            The following input forms doesn't submit automatically when having two inputs inside of it.
            This behavior isn't acceptable and a proper solution should be found.
            */}
            <Form className={clsx(classes['input-form'], { [classes['show-time']]: true })} onSubmit={datePicker.inputFormHandler}>
              <DateInput
                className={classes['date-input']}
                value={datePicker.dateInputValue.value}
                onChange={(e) => { datePicker.dateInputValue.set(e.target.value) }}
              />
              <TimeInput
                className={classes['time-input']}
                value={datePicker.timeInputValue.value}
                onChange={(e) => { datePicker.timeInputValue.set(e.target.value) }}
              />
            </Form>
            {/* <p><span>{format(datePicker.currentDate.value, 'MMM')}</span> <span className={classes.year}>{format(datePicker.currentDate.value, 'yyyy')}</span></p> */}
            <button aria-label='Next month' title='Next month' onClick={datePicker.nextMonthHandler}><CaretRight size={17} weight='bold' /></button>
          </div>
          <div className={classes.calendar}>
            {datePicker.headerDays.map(day => (
              <p className={classes['week-day']} key={day}>{day}</p>
            ))}
            {datePicker.monthDays.value.map(day => (
              <p
                key={day.toUTCString()}
                className={clsx(classes['month-day'], {
                  [classes.outmonth]: day.getMonth() != datePicker.viewportDate.value.getMonth(),
                  [classes.selected]: isDatesEqual(day, datePicker.dateValue.value)
                })}
                onClick={() => { datePicker.selectedDateChangeHandler(day) }}
              >
                {format(day, 'd')}
              </p>
            ))}
          </div>
          {/* <div className={classes.actions}>
            <button onClick={datePicker.cancelHandler}>Cancel</button>
            <button className={classes.submit}>Confirm</button>
          </div> */}
        </div>
      }
    </div>
  )
}