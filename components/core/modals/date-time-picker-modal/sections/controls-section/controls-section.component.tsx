import clsx from 'clsx';
import classes from './controls-section.module.sass';
import { useDateTimePickerStore } from '@/stores';

import { CalendarDots, Timer } from '@phosphor-icons/react/dist/ssr';
import KeyboardShortcut from '@/components/shared/button/keyboard-shortcut/keyboard-shortcut.component';

export default function ControlsSection() {
  const isTimeEnabled = useDateTimePickerStore(state => state.time.enabled);
  const toggleTimeEnabled = useDateTimePickerStore(state => state.toggleTimeEnabled);
  const isEndDateEnabled = useDateTimePickerStore(state => state.date.end.enabled);
  const toggleEndDateEnabled = useDateTimePickerStore(state => state.toggleEndDateEnabled);

  return (
    <div className={classes.wrapper}>
    <button
      className={clsx(classes.time, { [classes.active]: isEndDateEnabled })}
      aria-label="Toggle end date"
      title="Toggle end date"
      onClick={toggleEndDateEnabled}
    >
      <CalendarDots size={20} />
      <KeyboardShortcut buttons={['D']} size='small' />
    </button>
      <button
        className={clsx(classes.time, { [classes.active]: isTimeEnabled })}
        aria-label="Toggle time selection"
        title="Toggle time selection"
        onClick={toggleTimeEnabled}
      >
        <Timer size={20} />
        <KeyboardShortcut buttons={['T']} size='small' />
      </button>
    </div>
  )
}