import classes from './header-section.module.sass';
import { useDateTimePickerStore } from '@/stores';
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';
import DateInput from '@/components/core/input/date-input/date-input.component';
import TimeInput from '@/components/core/input/time-input/time-input.component';
import clsx from 'clsx';

export default function HeaderSection() {
  const dateText = useDateTimePickerStore(state => state.date.text);
  const timeText = useDateTimePickerStore(state => state.time.text);
  const timeEnabled = useDateTimePickerStore(state => state.time.enabled);
  const viewport = useDateTimePickerStore(state => state.viewport);
  const nextViewport = useDateTimePickerStore(state => state.nextViewport);
  const previousViewport = useDateTimePickerStore(state => state.previousViewport);
  const setDateText = useDateTimePickerStore(state => state.setDateText);
  const setTimeText = useDateTimePickerStore(state => state.setTimeText);

  return (
    <div className={classes.wrapper}>
      <div className={clsx(classes['input-form'], { [classes['show-time']]: timeEnabled })}>
        <DateInput
          className={classes['date-input']}
          onChange={e => setDateText(e.target.value)}
          value={dateText}
        />
        <div className={classes.border} />
        {timeEnabled && (
          <TimeInput
            className={classes['time-input']}
            onChange={e => setTimeText(e.target.value)}
            value={timeText.toString()}
          />
        )}
      </div>
      <div className={classes['month-info']}>
        <p>{viewport.format('MMMM YYYY')}</p>
        <div className={classes.actions}>
          <button aria-label='Previous month' title='Previous month' onClick={previousViewport}><CaretLeft size={17} weight='bold' /></button>
          <button aria-label='Next month' title='Next month' onClick={nextViewport}><CaretRight size={17} weight='bold' /></button>
        </div>
      </div>
    </div>
  )
}