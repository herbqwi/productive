import clsx from 'clsx';
import classes from '../header-section.module.sass'
import { useDateTimePickerStore } from '@/stores';

import DateInput from "@/components/core/input/date-input/date-input.component";
import TimeInput from '@/components/core/input/time-input/time-input.component';

export default function EndDateInputSection() {
  const endDateText = useDateTimePickerStore(state => state.date.end.text);
  const timeText = useDateTimePickerStore(state => state.time.text);
  const timeEnabled = useDateTimePickerStore(state => state.time.enabled);
  const setEndDateText = useDateTimePickerStore(state => state.setEndDateText);
  const setTimeText = useDateTimePickerStore(state => state.setTimeText);
  const isEndDateEnabled = useDateTimePickerStore(state => state.date.end.enabled);

  if (!isEndDateEnabled) {
    return null;
  }

  return (
    <div className={clsx(classes['date-input-wrapper'], { [classes['show-time']]: timeEnabled })}>
      <DateInput
        className={classes['date-input']}
        onChange={e => setEndDateText(e.target.value)}
        value={endDateText}
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