import clsx from 'clsx';
import classes from '../header-section.module.sass'
import { useDateTimePickerStore } from '@/stores';

import DateInput from "@/components/core/input/date-input/date-input.component";
import TimeInput from '@/components/core/input/time-input/time-input.component';

export default function StartDateInputSection() {
  const startDateText = useDateTimePickerStore(state => state.date.start.text);
  const timeText = useDateTimePickerStore(state => state.time.text);
  const timeEnabled = useDateTimePickerStore(state => state.time.enabled);
  const setStartDateText = useDateTimePickerStore(state => state.setStartDateText);
  const setTimeText = useDateTimePickerStore(state => state.setTimeText);

  return (
    <div className={clsx(classes['date-input-wrapper'], { [classes['show-time']]: timeEnabled })}>
      <DateInput
        className={classes['date-input']}
        onChange={e => setStartDateText(e.target.value)}
        value={startDateText}
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
  )
}