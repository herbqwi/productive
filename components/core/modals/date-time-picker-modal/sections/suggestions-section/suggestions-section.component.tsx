import clsx from 'clsx';
import classes from './suggestions-section.module.sass';
import { useDateTimePickerStore } from '@/stores';

import { Timer } from '@phosphor-icons/react/dist/ssr';

export default function SuggestionsSection() {
  const isTimeEnabled = useDateTimePickerStore(state => state.time.enabled);
  const isToday = useDateTimePickerStore(state => state.isToday);
  const isTomorrow = useDateTimePickerStore(state => state.isTomorrow);
  const setToday = useDateTimePickerStore(state => state.setToday);
  const setTomorrow = useDateTimePickerStore(state => state.setTomorrow);
  const toggleTimeEnabled = useDateTimePickerStore(state => state.toggleTimeEnabled);

  return (
    <div className={classes.wrapper}>
      <button
        className={clsx({ [classes.selected]: isToday })}
        onClick={setToday}
        aria-label="Set today as the selected date"
        title='Set today as the selected date'
      >
        Today
      </button>
      <button
        className={clsx({ [classes.selected]: isTomorrow })}
        onClick={setTomorrow}
        aria-label="Set tomorrow as the selected date"
        title="Set tomorrow as the selected date"
      >
        Tomorrow
      </button>
      <button
        className={clsx(classes.time, { [classes.active]: isTimeEnabled })}
        aria-label="Toggle time selection"
        title="Toggle time selection"
        onClick={toggleTimeEnabled}
      >
        <Timer size={20} />
      </button>
    </div>
  )
}