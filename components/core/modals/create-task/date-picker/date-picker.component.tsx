import clsx from 'clsx';
import { addDays, format } from 'date-fns';
import classes from './date-picker.module.sass'
import { convertDateToString, isDatesEqual } from '@/util/global.utils';
import useDatePicker from '@/hooks/core/nav-menu/date-picker.hook';

import { CaretLeft, CaretRight, Timer } from '@phosphor-icons/react/dist/ssr';
import DateInput from '@/components/core/input/date-input/date-input.component';
import TimeInput from '@/components/core/input/time-input/time-input.component';
import Form, { IFormProps } from '@/components/core/form/form.context';

export type IDatePickerProps = IFormProps;

export default function DatePicker(props: IDatePickerProps) {
  const datePicker = useDatePicker(props);

  return (
    <div ref={datePicker.formRef} className={classes.wrapper}>
      <button
        ref={datePicker.buttonRef}
        className={clsx(classes['date-output-btn'], { [classes['date-selected']]: !!datePicker.finalDateTime.value })}
        onClick={datePicker.openModal}
        type='button'
      >
        <p>{datePicker.finalDateTime.value ? convertDateToString(datePicker.finalDateTime.value, `MMM d, yyyy${datePicker.currentTime.value ? ' h:mm a' : ''}`) : 'Select a date'}</p>
      </button>
      {
        <div
          ref={datePicker.datePickerRef}
          className={clsx(classes['date-picker'], datePicker.isModalOpen ? classes.open : classes.closed)}
        >
          <div className={classes.suggestions}>
            <button
              className={clsx({ [classes.selected]: isDatesEqual(datePicker.currentDate.value, new Date()) })}
              onClick={() => { datePicker.selectedDateChangeHandler(new Date()) }}
              aria-label="Set today as the selected date"
              title='Set today as the selected date'
            >
              Today
            </button>
            <button
              className={clsx({ [classes.selected]: isDatesEqual(datePicker.currentDate.value, addDays(new Date(), 1)) })}
              onClick={() => { datePicker.selectedDateChangeHandler(addDays(new Date(), 1)) }}
              aria-label="Set tomorrow as the selected date"
              title="Set tomorrow as the selected date"
            >
              Tomorrow
            </button>
            <button
              className={clsx(classes.time, datePicker.isShowTime.value && classes.active)}
              aria-label="Toggle time selection"
              title="Toggle time selection"
              onClick={datePicker.isShowTime.toggle}
            >
              <Timer size={20} />
            </button>
          </div>
          <div className={classes.header}>
            {/*
            Bug (HIGH-PRIORITY):
            The following input forms doesn't submit automatically when having two inputs inside of it.
            This behavior isn't acceptable and a proper solution should be found.
            */}
            <Form className={clsx(classes['input-form'], { [classes['show-time']]: datePicker.isShowTime.value })} onSubmit={datePicker.inputFormHandler}>
              <DateInput
                name='date'
                ref={datePicker.autoFocusRef}
                className={classes['date-input']}
                value={datePicker.dateInputValue.value}
              />
              <div className={classes.border} />
              <TimeInput
                name='time'
                className={classes['time-input']}
                value={datePicker.timeInputValue.value}
              />
            </Form>
            {/* <p><span>{format(datePicker.currentDate.value, 'MMM')}</span> <span className={classes.year}>{format(datePicker.currentDate.value, 'yyyy')}</span></p> */}
            <div className={classes['month-info']}>
              <p>{convertDateToString(datePicker.viewportDate.value, 'MMM yyyy')}</p>
              <div className={classes.actions}>
                <button aria-label='Previous month' title='Previous month' onClick={datePicker.prevMonthHandler}><CaretLeft size={17} weight='bold' /></button>
                <button aria-label='Next month' title='Next month' onClick={datePicker.nextMonthHandler}><CaretRight size={17} weight='bold' /></button>
              </div>
            </div>
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
                  [classes.selected]: isDatesEqual(day, datePicker.currentDate.value)
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